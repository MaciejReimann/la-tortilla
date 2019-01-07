import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    const { className, children } = this.props;
    return <footer className={className}>{children}</footer>;
  }
}
