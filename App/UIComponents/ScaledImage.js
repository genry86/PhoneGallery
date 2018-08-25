import {Image} from "react-native";
import React from "react";

import * as Helpers from "../Utility/Helpers.js"

export class ScaledImage extends React.Component<Props, State> {
    constructor(props) {
        super(props)

        const photo = this.props.photo
        const imageSrc = photo.imageSrc
        const imageUrl = photo.imageUrl
        const resultUri = imageSrc ? 'file://' + imageSrc : imageUrl

        this.state = {
            source: {uri: resultUri},
            width: 0,
            height: 0,
        }
    }

    componentWillMount() {
        Image.getSize(this.state.source.uri, (width, height) => {
            if (Helpers.isPortrait()) {
                this.setState({width: Helpers.screenWidth(), height: height * (Helpers.screenWidth() / width)})
            } else if (!Helpers.isPortrait()) {
                this.setState({width: width * (Helpers.screenHeight() / height), height: Helpers.screenHeight()})
            }
        }, (error) => {
            console.log("ScaledImage:componentWillMount:Image.getSize failed with error: ", error)
        })
    }

    render() { return (
        <Image source={this.state.source} style={[this.props.style, {height: this.state.height, width: this.state.width}]} />
    )}
}