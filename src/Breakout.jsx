import React from 'react';

import Ball from './Ball';
import Paddle from './Paddle';
import BrickField from './BrickField';

export default class Breakout extends React.Component {

  constructor(props) {
    super(props);
    console.log('constructor()');
    this.state = {
      rightPressed: false,
      leftPressed: false,
      paddleX: null,
      bricks: []
    }

    this.ctx = null;
    this.x = null;
    this.y = null;
    this.dx = 2;
    this.dy = -2;
    this.ballRadius = 10;
    this.paddleWidth = 75;
    this.gameTimer = null;
    this.brickRowCount = 3;
    this.brickColumnCount = 5;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
  }

  componentDidMount() {
    this.initGame();
  }

  initGame() {
    this.setState({
      rightPressed: false,
      leftPressed: false,
      paddleX: null
    });

    this.stopGame();

    let canvas = this.refs.canvas;
    this.ctx = canvas.getContext('2d');
    this.x = canvas.width/2;
    this.y = canvas.height-30;

    document.addEventListener("keydown", this._paddle().keyDownHandler, false);
    document.addEventListener("keyup", this._paddle().keyUpHandler, false);
    this.gameTimer = setInterval(this.draw.bind(this), 10);
  }

  stopGame() {
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
      this.gameTimer = null;
    }
  }

  collisionDetection() {
    const { bricks } = this.state;
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        let brick = bricks[c][r];
        if (this.x > brick.x && this.x < brick.x+this.brickWidth && this.y > brick.y && this.y < brick.y+this.brickHeight) {
          this.dy = -this.dy;
          bricks[c][r].status = 0;
        }
      }
    }
    this.setState({ bricks: bricks });
  }

  draw() {
    let canvas = this.refs.canvas;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this._ball().draw();
    this._paddle().draw();
    this._brickField().draw();
    this.collisionDetection();

    if(this.x + this.dx > canvas.width-this.ballRadius || this.x + this.dx < this.ballRadius) {
        this.dx = -this.dx;
    }

    if(this.y + this.dy < this.ballRadius) {
        this.dy = -this.dy;
    } else if (this.y + this.dy > canvas.height-this.ballRadius) {
      if(this.x > this.state.paddleX && this.x < this.state.paddleX + this.paddleWidth) {
        this.dy = -this.dy;
      }
      else {
        alert("GAME OVER");
        this.initGame();
      }
    }

    this.x += this.dx;
    this.y += this.dy;
  }


  render() {3
    return (
      <canvas ref="canvas" className="breakout" width="480" height="320" />
    );
  }
}

Breakout.prototype._ball = Ball;
Breakout.prototype._paddle = Paddle;
Breakout.prototype._brickField = BrickField;
