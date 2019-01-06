import React, { Component } from "react";
// import axios from "axios";

export default class SquaredImage extends Component {
  constructor(props) {
    super(props);
    this.cropAndCenter = this.cropAndCenter.bind(this);
    this.loadImage = this.loadImage.bind(this);
  }

  componentDidMount() {
    this.loadImage(this.refs.image).then(res =>
      this.cropAndCenter(res, this.refs.cropper)
    );
  }

  loadImage(img) {
    return new Promise((resolve, reject) => {
      img.onload = () => {
        resolve(img);
      };
    });
  }

  cropAndCenter(img, squareCropper) {
    const { width, height, style } = img;
    const cropperSizePx = parseInt(getComputedStyle(squareCropper).width);
    // TODO: check if cropper is actually a square...;

    // For horizontal images:
    if (width > height) {
      const scaleRatio = cropperSizePx / height;
      const scaledWidth = width * scaleRatio;
      const centerDiff = cropperSizePx - scaledWidth;
      // apply styles:
      style.height = `${cropperSizePx}px`;
      style.marginLeft = `${centerDiff / 2}px`;
      console.log(centerDiff);
    }
  }

  render() {
    const { src, alt } = this.props;
    return (
      <div className="image-container">
        <div ref="cropper" className="image-cropper">
          <img
            //   style={{ display: "none" }}
            ref="image"
            src={src}
            alt={alt}
          />
        </div>
      </div>
    );
  }
}
