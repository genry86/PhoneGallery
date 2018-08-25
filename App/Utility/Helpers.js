import RNFetchBlob from "react-native-fetch-blob";
import {Dimensions} from "react-native";

const dirs = RNFetchBlob.fs.dirs

screenHeight = () => {
    return Dimensions.get('window').height
}

screenWidth = () => {
    return Dimensions.get('window').width
}

isPortrait = () => {
    return (screenWidth() < screenHeight())
}

downloadAndSaveImage = async (imageUri, imageName) => {
    const config = RNFetchBlob.config({
        fileCache : true,
        path : dirs.DocumentDir + '/' + imageName
    })

    var response = await config.fetch('GET', imageUri, {})
    return response.path()
}

export {
    screenHeight,
    screenWidth,
    isPortrait,
    downloadAndSaveImage
}