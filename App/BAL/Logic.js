import React from "react";
import { createLogic } from 'redux-logic';
import {NativeModules, Platform, Share} from "react-native";

import * as ActionsConstants from "../Actions/ActionsConstants.js"
import * as Actions from "../Actions/Actions.js"


const isImageUtilityAvailable = NativeModules.hasOwnProperty("ImageUtility")
import * as Constants from "../Constants";
import * as Helpers from "../Utility/Helpers.js"

const photosFetch = createLogic({
    type: ActionsConstants.DOWNLOAD_PHOTOS,
    latest: true,
    warnTimeout: 0,

    process({getState, action }, dispatch, done) {

        const  { photos, page } = getState();

        fetch(Constants.API_URL + page)
            .then(res => res.json())
            .then(json => json.results)
            .then(fetchedPhotos =>
            {
                photos.containsPhoto = function(photoId) {
                    this.some((existingPhoto) => photoId == existingPhoto.id)
                }

                let newFetchedPhotos = fetchedPhotos.filter((fetchedPhoto) => !photos.containsPhoto(fetchedPhoto.id.value))
                let initialIndex = photos.length;

                let newFilteredPhotos = newFetchedPhotos.map( (photo, index) =>  {
                    return {
                        id: photo.id.value,
                        index: index + initialIndex,
                        title: photo.title,
                        name: photo.name.first + " " + photo.name.last,
                        email: photo.email,
                        gender: photo.gender,
                        imageUrl: photo.picture.large,
                        imageSrc: ""
                    }});

                return newFilteredPhotos
            })
            .then( async newFilteredPhotos => {
                for(var index in newFilteredPhotos) {
                    var photo = newFilteredPhotos[index]

                    if (isImageUtilityAvailable) {
                        const imageSrc = await Helpers.downloadAndSaveImage(photo.imageUrl, photo.id + '.jpg')
                        const successful = await NativeModules.ImageUtility.changeBluePixelsToGreen(imageSrc)
                        if (successful) {
                            photo.imageSrc = imageSrc;
                        }
                    }
                }

                dispatch(Actions.photosDownloaded(newFilteredPhotos))
                done()
            })
            .catch(err => {
                console.error(err);
            })
            .then(() => done());
    }
});

const refreshCurrentPage = createLogic({
    type: ActionsConstants.REFRESH_CURRENT_PAGE,
    latest: true,

    process({ action }, dispatch, done) {

        done()
    }
});

const downloadNextPage = createLogic({
    type: ActionsConstants.DOWNLOAD_NEXT_PAGE,
    latest: true,

    process({ action }, dispatch, done) {
        dispatch(Actions.downloadPhotos())
        done()
    }
});

const sharePhoto = createLogic({
    type: ActionsConstants.SHARE_PHOTO,
    latest: true,

    process({ getState, action }, dispatch, done) {

        const photo = getState().photos.find((photo) => photo.id == action.photoId)

        let imageString = `---------- \n ${photo.imageUrl} \n ---------- \n\n`
        let titleString = `[PhotoGallery Sharring image - '${photo.title}' '${photo.name}' ]\n`
        let nameString = `[Title - ${photo.name} ]\n`
        let genderString = `[Author - ${photo.gender} ]\n`
        let emailString = `[Camera - ${photo.email}]`

        var message = ""

        if (Platform.OS === 'android') {
            message += imageString
        }

        message += nameString
        message += genderString
        message += emailString

        Share.share({
            message: message,
            url: photo.imageUrl,
            title: titleString
        }, {
            dialogTitle: photo.name,
        })

        done()
    }
});

export default [photosFetch, refreshCurrentPage, downloadNextPage, sharePhoto]
