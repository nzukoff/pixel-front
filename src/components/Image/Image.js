import React, { Component } from 'react';
import { connect } from 'react-redux'

import './Image.css' 

class Image extends Component {
    constructor(props) {
        super(props)
        this.createImage = this.createImage.bind(this);
    }
    
    componentDidUpdate() {
        this.createImage(this.props.pixels, this.props.imageSize)
    }

    createImage(pixels, imageSize) {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        
        const imgData=ctx.createImageData(imageSize ? imageSize[0] : 1, imageSize ? imageSize[1] : 1);
        var data = imgData.data;
        if (pixels.length != 0) {
            for (let i=0;i<imgData.data.length;i++)
            {
              data[i]=pixels[i];
            }
        }
        ctx.putImageData(imgData, 0, 0);
    }

    render() {
        return (
            <div className="Image">
                <canvas className="image" ref="canvas" width={this.props.imageSize ? this.props.imageSize[0] : 1} height={this.props.imageSize ? this.props.imageSize[1] : 1}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pixels: state.pixels,
    imageSize: state.image_size
})


export default connect(
    mapStateToProps,
    null
)(Image)

// export default Image;