import React from "react";

import {
    View,
    FlatList,
    ActivityIndicator
} from 'react-native';

import * as Constants from '../Constants.js';
import { Styles  } from '../Style/Styles.js';
import * as Helpers from "../Utility/Helpers.js"

import { MultiplePhotoListItem} from "./MultiplePhotoListItem";

export default class MultiplePhotosList extends React.Component {

    static navigationOptions = {
        title: 'Gallery App',
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#2F95D6',
        },
        headerTitleStyle: {
            fontSize: 18,
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            numColumns: 2
        };
    }

    loadPhotos = () =>  {
        this.props.downloadPhotos()
    };

    handleRefresh = () => {
        this.props.refreshCurrentPage()
    };

    handleLoadMore = () => {
        this.props.downloadNextPage()
    };

    componentDidMount() {
        this.loadPhotos();
    };

    onLayout = (event) => {
        const numColumns = Math.floor(Helpers.screenWidth() / Constants.LIST_IMAGE_SIZE)
        this.setState({ numColumns: numColumns })
    };

    render() {
        const { photos, isRefreshing, isDownloading}  = this.props;

        const { numColumns } = this.state;
        const topActivityOffset = Helpers.screenHeight() / 2 - Constants.TOP_TOOLBAR_HEIGHT
        const photosFetched = photos && photos.length > 0

        return (
            <View style={Styles.main} onLayout={this.onLayout}>
                <ActivityIndicator style={[Styles.topActivityWheel, {marginTop: topActivityOffset}]} animating={!photosFetched} size="large" color="#0000ff" />
                {photosFetched &&
                <FlatList
                    data={photos}
                    style={Styles.flatlist}
                    numColumns={numColumns}
                    renderItem={({item}) =>
                        <MultiplePhotoListItem photo={item} navigation={this.props.navigation} />
                    }
                    keyExtractor={(item, index) => index}
                    key={numColumns}
                    refreshing={isRefreshing}
                    onRefresh={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
                    onEndThreshold={0}
                />
                }
                {photosFetched && isDownloading && !isRefreshing &&
                <ActivityIndicator style={Styles.bottomActivityWheel} animating={isDownloading} size="small" color="#0000ff" />
                }
            </View>
        )
    }
}