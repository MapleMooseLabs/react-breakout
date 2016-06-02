import React from 'react';

export default class Brick extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };
  }

  reset() {
    this.setVisibility(true);
  }

  setVisibility(visible) {
    this.setState({ visible: visible });
  }

  draw() {
    const { ctx, x, y, width, height, colour } = this.props;

    if (this.state.visible) {
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.fillStyle = colour;
      ctx.fill();
      ctx.closePath();
    }
  }

  render() {
    return null;
  }
}
