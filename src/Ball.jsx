import React from 'react';

export default class Ball extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      x: props.canvas.width/2,
      y: props.canvas.height-30,
      dx: 2,
      dy: -2,
      paddleX: ((props.canvas.width-75)/2)
    };

    this.radius = 10;
    this.state = this.initialState;
  }

  reset() {
    this.setState(this.initialState);
  }

  getRadius() {
    return this.radius;
  }

  getPos() {
    return {
      x: this.state.x,
      y: this.state.y,
      dx: this.state.dx,
      dy: this.state.dy
    };
  }
  
  reverseX() {
    this.setState({ dx: -this.state.dx });
  }

  reverseY() {
    this.setState({ dy: -this.state.dy });
  }

  draw() {
    const { canvas, ctx, colour } = this.props;

    let { x, y, dx, dy, paddleX } = this.state;

    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.closePath();

    this.setState({
      x: (x + dx),
      y: (y + dy)
    });
  }

  render() {

    return null;
  }
}
