import React from 'react';


export default class Paddle extends React.Component {
  // const that = this;
  // const state = this.state;
  // const canvas = this.refs.canvas;
  // const ctx = this.ctx;
  // const paddleHeight = 10;
  // const paddleWidth = this.paddleWidth;
  //
  // if (!state.paddleX) {
  //   this.setState({ paddleX: ((canvas.width-paddleWidth)/2) });
  // }

  constructor(props) {
    super(props);
    this.width = 75;
    this.height = 10;

    this.state = {
      leftPressed: false,
      rightPressed: false,
      x: ((props.canvas.width-this.width)/2)
    };
  }

  componentDidMount() {

    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    document.addEventListener("keyup", this.keyUpHandler.bind(this), false);

    // this.draw();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.leftPressed !== this.state.leftPressed ||
      nextState.rightPressed !== this.state.rightPressed
    );
  }

  componentDidUpdate() {
    this.draw();
  }

  keyDownHandler(e) {
    this.setState({ leftPressed: e.keyCode == 37, rightPressed: e.keyCode == 39 });
  }

  keyUpHandler(e) {
    this.setState({ leftPressed: false, rightPressed: false });
  }

  reset() {
    this.setState({
      leftPressed: false,
      rightPressed: false,
      x: ((this.props.canvas.width-this.width)/2)
    });
  }

  getPos() {
    return this.state.x;
  }

  getWidth() {
    return this.width;
  }

  draw() {
    const { canvas, ctx, colour } = this.props;
    const { leftPressed, rightPressed, x } = this.state;
    const { height, width } = this;
    if (leftPressed) {
      this.setState({ x: (x - 7) });
    } else if (rightPressed) {
      this.setState({ x: (x + 7) });
    }
    ctx.beginPath();
    ctx.rect(x, canvas.height-height, width, height);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.closePath();
  }

  render() {
    // this.draw();
    return null;
  }
}
