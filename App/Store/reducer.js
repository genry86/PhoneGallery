import * as ActionsConstants from "../Actions/ActionsConstants.js"
import * as Constants from "../Constants"

const initialState = {
    page: 1,
    photos: [],
    isDownloading: false,
    isRefreshing: false
};

export default rootReducer = (state  = initialState, action) => {
    switch(action.type) {
        case ActionsConstants.DOWNLOAD_PHOTOS:
            return {
                ...state,
                isDownloading: true
            };
        case ActionsConstants.REFRESH_CURRENT_PAGE:
            return {
                ...state,
                isRefreshing: true
            };
        case ActionsConstants.DOWNLOAD_NEXT_PAGE:
        {
            const downloadedPhotos = state.photos.length
            const shouldBeDownloaded = Constants.PAGE_SIZE * state.page

            return {
                ...state,
                page: (downloadedPhotos == shouldBeDownloaded) ? state.page + 1 : state.page
            };
        }
        case ActionsConstants.PHOTOS_RECEIVED:
            return {
                ...state,
                photos: [...state.photos, ...action.photos],
                isDownloading: false,
                isRefreshing: false,
            };
        default:
            return state;
    }
}