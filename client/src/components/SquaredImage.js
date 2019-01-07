import React, { Component } from "react";
// import axios from "axios";

export default class SquaredImage extends Component {
  constructor(props) {
    super(props);
    this.cropAndCenter = this.cropAndCenter.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.open(this.props.href, "_blank");
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
    let output = {};
    const { width, height, style } = img;
    const cropperSizePx = parseInt(getComputedStyle(squareCropper).width);
    // TODO: check if cropper is actually a square...;

    // For horizontal images:
    if (width > height) {
      const scaleRatio = cropperSizePx / height;
      const scaledWidth = width * scaleRatio;
      const centerDiff = cropperSizePx - scaledWidth;
      // Save style values:
      output = {
        width,
        height: cropperSizePx,
        marginLeft: centerDiff / 2,
        marginTop: 0
      };
      // For vertical images:
    } else {
      const scaleRatio = cropperSizePx / width;
      const scaledHeight = height * scaleRatio;
      const centerDiff = cropperSizePx - scaledHeight;
      // Save style values:
      output = {
        width: cropperSizePx,
        height,
        marginLeft: 0,
        marginTop: centerDiff / 2
      };
    }
    // For all images - enlarge a little and center again do crop ugly borders:
    function removeUglyBorder(
      borderPx,
      { width, height, marginLeft, marginTop }
    ) {
      marginLeft = marginLeft - borderPx;
      marginTop = marginTop - borderPx;
      height = height + 2 * borderPx;
      width = width + 2 * borderPx;
      return { width, height, marginLeft, marginTop };
    }
    const final = removeUglyBorder(2, output);

    // Apply styles:
    style.width = `${final.width}px`;
    style.height = `${final.height}px`;
    style.marginLeft = `${final.marginLeft}px`;
    style.marginTop = `${final.marginTop}px`;
    // Make images visible:
    style.display = "block";
  }

  render() {
    const { src, alt, children } = this.props;
    return (
      <div className="image-container">
        <div ref="cropper" className="image-cropper">
          <img
            style={{ display: "none" }}
            ref="image"
            src={src}
            alt={alt}
            onClick={this.handleClick}
          />
          {children}
        </div>
      </div>
    );
  }
}
