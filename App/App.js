/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader',
    'Warning: Module RNFetchBlob requires',
    'Module RNFetchBlob', 'Warning: Can\'t call setState (or forceUpdate)',
    'Task orphaned for request',
    'Class RCTCxxModule was not exported.']);

import store from './Store/store.js';

import SinglePhotoScreen from "./Screens/SinglePhotoScreen";
import PhotosScreen from "./Screens/PhotosScreen.js"

const NavigationStack = StackNavigator({
        PhotosScreen: { screen: PhotosScreen },
        SinglePhotoScreen: { screen: SinglePhotoScreen }
    }, {
        initialRouteName: 'PhotosScreen'
    }
);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                 <NavigationStack />
            </Provider>
        );
    }
}

