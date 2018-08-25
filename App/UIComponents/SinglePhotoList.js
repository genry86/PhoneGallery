import React from "react";
import {
    View,
    FlatList
} from 'react-native';

import { Styles  } from '../Style/Styles.js';
import * as Helpers from "../Utility/Helpers.js"

import { SinglePhotoListItem } from "./SinglePhotoListItem";

export default class SinglePhotoList extends React.Component {

    static navigationOptions = {
        title: 'Photo',
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#2F95D6',
        },
        headerTitleStyle: {
            fontSize: 18,
        },
    };

    constructor(props) {
        super(props)

         this.state = {
             scrollEnabled: true,
             selectedPhotoIndex: 0,
             opacity: 0
         };
    }

    onLayout = (event) => {
        this.refresh()
    };

    refresh = () => {
        this.setState({opacity:0})

        let wait = new Promise((resolve) => setTimeout(resolve, 100));
        wait.then( () => {
            this.myRef.scrollToIndex({animated: false, index: this.state.selectedPhotoIndex});
            this.setState({opacity:1});
        });
    }

    handleScroll = (event) => {
        this.setState({scrollEnabled: (event.nativeEvent.zoomScale == 1)});
    };

    onScrollEnd = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let selectedPhotoIndex = Math.floor(contentOffset.x / viewSize.width);

        this.setState({selectedPhotoIndex: selectedPhotoIndex});
    }

    getItemLayout = (data, index) => {
        return  { length: Helpers.screenWidth(), offset: Helpers.screenWidth() * index, index }
    }

    componentDidMount  ()  {

        const photos = this.props.photos
        const photoId = this.props.navigation.state.params.photoId

        const selectedPhoto = photos.find((photo) => photo.id == photoId)
        const selectedPhotoIndex = photos.indexOf(selectedPhoto)

        this.setState({selectedPhotoIndex: selectedPhotoIndex}, () => { this.refresh() });
    }

    render() {
        let photos = this.props.photos
        const photosExists = photos && photos.length > 0

        return (
            <View style={Styles.main} onLayout={this.onLayout}>
                {photosExists &&
                <FlatList
                    data={photos}
                    ref={(ref) => { this.myRef = ref; }}
                    style={[Styles.flatlist, {opacity: this.state.opacity, width: Helpers.screenWidth()}]}
                    onMomentumScrollEnd={this.onScrollEnd}
                    getItemLayout={this.getItemLayout}
                    pagingEnabled = {true}
                    horizontal = {true}
                    numColumns={1}
                    scrollEnabled={this.state.scrollEnabled}
                    renderItem={({item}) =>
                        <SinglePhotoListItem photo={item} sharePhoto={this.props.sharePhoto} handleScroll={this.handleScroll} />
                    }
                    keyExtractor={(item, index) => item.index.toString()}
                    key={Helpers.isPortrait()}
                />
                }
            </View>
        )
    }
}