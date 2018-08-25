import {StyleSheet} from "react-native";

export const Styles = StyleSheet.create(
    {
    main: {
        flex: 1,
        backgroundColor: 'black',

    },
    topActivityWheel: {
        position: 'absolute',
        alignSelf: 'center'
    },
    bottomActivityWheel: {
        alignSelf: 'center',
        height:20,
        margin:5
    },
    flatlist: {
        flex: 1,
    },
    photoScrollView: {
        flex:1,
        margin:0
    },
    photoFlatlistItem: {
        flex: 1,
    },
    photoScrollViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photosListItemTouchableView: {
        width: 150,
        height: 150,
        flex: 1,
        margin: 3
    },
    photosListItemImage: {
        flex:1
    },

    scene: {
        flex: 1,
        backgroundColor: 'black'

    },
    cell: {
        flex: 1,
        padding: 3,
        backgroundColor: 'black',
    },
    image: {
        flex: 1,
    },
    scaledImage: {
        alignSelf: 'center'
    },
    photoName: {
        fontSize: 17,
        paddingVertical: 20,
        color: '#fff'
    },
    photoFooterContainerView: {
        bottom: 10,
        left: 10,
        right: 10,
        zIndex: 5,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    photoInfoContainerView: {
        flexDirection: 'column',
        flex:3,
    },
    photoInfoLabel: {
        marginBottom: 3,
        marginLeft:10,
        color:'white'
    },
    photoInfoLabelTitle: {
        marginBottom: 3,
        marginLeft:10,
        color:'white',
        fontWeight: 'bold'
    },
    photoInfoShareTouchableView:{
        flex:1,
        alignItems: 'flex-end'
    },
        photoInfoShareTouchableImage: {
        width: 50,
        height: 50,
        marginRight:10
    }
});