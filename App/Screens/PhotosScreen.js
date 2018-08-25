import React from "react";
import { connect } from "react-redux";
import MultiplePhotosList from "../UIComponents/MultiplePhotosList.js"

import * as Actions from "../Actions/Actions.js"

const mapStateToProps = state => ({
    photos: state.photos,
    page: state.page,
    isRefreshing: state.isRefreshing,
    isDownloading: state.isDownloading
})

const mapDispatchToProps = (dispatch) => ({
    downloadPhotos: () => { dispatch(Actions.downloadPhotos()) },
    refreshCurrentPage: () => { dispatch(Actions.refreshCurrentPage()) },
    downloadNextPage: () => { dispatch(Actions.downloadNextPage()) },
    photosDownloaded: (photos) => { dispatch(Actions.photosDownloaded(photos)) }
})

export default PhotosScreen = connect(mapStateToProps, mapDispatchToProps)(MultiplePhotosList);
