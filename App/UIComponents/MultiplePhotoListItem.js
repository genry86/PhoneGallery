import React from "react";
import {
    Image,
    TouchableHighlight
} from 'react-native';

import { Styles  } from '../Style/Styles.js';

export class MultiplePhotoListItem extends React.Component {

    onImagePress = (photoId) => {
        this.props.navigation.navigate('SinglePhotoScreen', { photoId: photoId })
    }

    render()  {
        const photo = this.props.photo
        const imageSrc = photo.imageSrc
        const imageUrl = photo.imageUrl
        const resultUri = imageSrc ? 'file://' + imageSrc : imageUrl

        return (
            <TouchableHighlight onPress={() => this.onImagePress(photo.id)} style={Styles.photosListItemTouchableView}>
                <Image style={Styles.photosListItemImage} source={{uri:  resultUri}}/>
            </TouchableHighlight>
        )
    }
}