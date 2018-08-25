import React from "react";
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import { Styles  } from '../Style/Styles.js';
import * as Helpers from "../Utility/Helpers.js"

import  { ScaledImage } from "./ScaledImage.js";

export class SinglePhotoListItem extends React.Component {

    share = ()=> {
        this.props.sharePhoto(this.props.photo.id)
    };

    render () {
        const photo = this.props.photo

        return (
            <View style={Styles.photoFlatlistItem}>
                <ScrollView
                    onScroll={this.props.handleScroll}
                    maximumZoomScale={5}
                    minimumZoomScale={1}
                    pinchGestureEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={[Styles.photoScrollView, {width: Helpers.screenWidth()}]}
                    contentContainerStyle={Styles.photoScrollViewContainer}
                >
                    <ScaledImage style={Styles.scaledImage} photo={photo} />

                </ScrollView>
                <View style={Styles.photoFooterContainerView}>
                    <View style={Styles.photoInfoContainerView}>
                        <Text style={Styles.photoInfoLabelTitle}>{photo.title}</Text>
                        <Text style={Styles.photoInfoLabel}>{photo.name}</Text>
                        <Text style={Styles.photoInfoLabel}>{photo.email}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => this.share()} style={Styles.photoInfoShareTouchableView} >
                        <Image source={require('../images/share.png')} style={Styles.photoInfoShareTouchableImage} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}