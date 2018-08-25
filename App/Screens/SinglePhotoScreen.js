import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from 'redux'

import SinglePhotoList from "../UIComponents/SinglePhotoList.js"
import * as Actions from "../Actions/Actions.js"

const mapStateToProps = state => ({
    photos: state.photos
})

const mapDispatchToProps = (dispatch) => ({
    sharePhoto: (photoId) => { dispatch(Actions.sharePhoto(photoId)) }
})

export default SinglePhotoScreen = connect(mapStateToProps, mapDispatchToProps)(SinglePhotoList);