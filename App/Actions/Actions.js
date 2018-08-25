import React from "react";

import * as ActionsConstants from "./ActionsConstants.js"

const downloadNextPage = () => ({
    type: ActionsConstants.DOWNLOAD_NEXT_PAGE
});

const downloadPhotos = () => ({
    type: ActionsConstants.DOWNLOAD_PHOTOS
});

const refreshCurrentPage = () => ({
    type: ActionsConstants.REFRESH_CURRENT_PAGE
});

const photosDownloaded = (photos) => ({
    type: ActionsConstants.PHOTOS_RECEIVED,
    photos: photos
});

const sharePhoto = (photoId) => ({
    type: ActionsConstants.SHARE_PHOTO,
    photoId: photoId
});

export {
    downloadPhotos,
    refreshCurrentPage,
    downloadNextPage,
    photosDownloaded,
    sharePhoto
}