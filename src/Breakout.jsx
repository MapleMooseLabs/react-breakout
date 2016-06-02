import React from 'react';

import ScoreBoard from './ScoreBoard';
import BrickField from './BrickField';
import Ball from './Ball';
import Paddle from './Paddle';

export default class Breakout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rightPressed: false,
      leftPressed: false,
      paddleX: null,
      bricks: null,
      gameTimer: null
    }

    this.ctx = null;
    this.x = null;
    this.y = null;
    this.dx = 2;
    this.dy = -2;
    this.ballRadius = 10;
    this.paddleWidth = 75;
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
    this.stopGame();
    let { canvas, scoreBoard, ball, paddle, brickField } = this.refs;
    this.ctx = canvas.getContext('2d');
    this.x = canvas.width/2;
    this.y = canvas.height-30;

    let gameTimer = this.state.gameTimer;

    if (scoreBoard) {
      scoreBoard.reset();
    }

    if (ball) {
      ball.reset();
    }

    if (paddle) {
      paddle.reset();
    }

    if (brickField) {
      brickField.reset();
    }

    gameTimer = setInterval(this.runGame.bind(this), 10);
    this.setState({ gameTimer: gameTimer });
  }

  stopGame() {
    let gameTimer = this.state.gameTimer;
    if (gameTimer) {
      clearInterval(gameTimer);
      gameTimer = null;
    }
    this.setState({
      rightPressed: false,
      leftPressed: false,
      paddleX: null,
      gameTimer: null
    });

  }

  gameOver() {
    this.newGame("Game over!");
  }

  newGame(message) {
    if (message) {
      alert(message.toUpperCase());
    }

    this.initGame();
  }

  // reset ball and paddle
  resetBallAndPaddle() {
    const { ball, paddle } = this.refs;

    if (ball) {
      ball.reset();
    }

    if (paddle) {
      paddle.reset();
    }
  }


  drawComponents() {
    let { scoreBoard, brickField, paddle, ball  } = this.refs;

    if (scoreBoard) {
      scoreBoard.draw();
    }

    if (paddle) {
      paddle.draw();
    }

    if (ball) {
      ball.setState({ paddleX: paddle.state.x });
      ball.draw();
    }

    if (brickField) {
      brickField.draw();
    }
  }

  runGame() {
    let ctx = this.ctx;
    const { canvas, scoreBoard } = this.refs;

    if (!scoreBoard.getLives()) {
      this.gameOver();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.drawComponents();
      this.detectBrickCollision();
      this.detectWallCollision();
    }
  }

  detectWallCollision() {
    const { canvas, scoreBoard, brickField, paddle, ball  } = this.refs;
    const ballPos = ball.getPos();
    const paddleX = paddle.getPos();
    const paddleWidth = paddle.getWidth();

    // Check if ball hit left or right walls
    if(ballPos.x+ballPos.dx > canvas.width-ball.getRadius() || ballPos.x+ballPos.dx < ball.getRadius()) {
      ball.reverseX();
    }

    // Check if ball hit top or bottom walls, or paddle
    // Check if ball hit bottom wall
    if(ballPos.y + ballPos.dy < ball.getRadius()) {
      ball.reverseY();
    } else if (ballPos.y + ballPos.dy > canvas.height-ball.getRadius()) {

      if (ballPos.x > paddleX && ballPos.x < paddleX+paddleWidth) {
        ball.reverseY();
      } else {
        scoreBoard.decreaseLives();
        this.resetBallAndPaddle();
      }
    }
  }

  detectBrickCollision() {
    const { canvas, scoreBoard, brickField, paddle, ball  } = this.refs;
    const ballX = ball.getPos().x;
    const ballY = ball.getPos().y;
    let bricks = brickField.getBricks();

    if (scoreBoard.getScore() === bricks.length) {
      brickField.hideBricks();
      this.newGame("Congratulations! You win!");
    }

    for (let brick of bricks) {
      if (brick.state.visible) {
        let brickX = brick.props.x;
        let brickY = brick.props.y;
        let brickWidth = brick.props.width;
        let brickHeight = brick.props.height;
        if (ballX > brickX && ballX < brickX+brickWidth && ballY > brickY && ballY < brickY+brickHeight) {
          ball.reverseY();
          brick.setVisibility(false);
          scoreBoard.increaseScore();
        }
      } // if (brick.state.visible)

    } // for (brick of bricks)
  }

  loseLife() {
    const { scoreBoard } = this.refs;

  }

  getComponentProps() {
    let props = {
      canvas: this.refs.canvas,
      ctx: this.ctx,
      colour: "#0095DD",
      initGame: this.initGame.bind(this),
      reset: this.initGame.bind(this)
    }

    return props;
  }

  renderComponents() {
    let props = this.getComponentProps();

    if (props.canvas) {
      let scoreBoard = <ScoreBoard ref="scoreBoard" { ...props } />;
      let paddle = <Paddle ref="paddle" { ...props } />;
      let ball = <Ball ref="ball" paddle={ paddle } { ...props } />;
      let brickField = <BrickField ref="brickField" { ...props } />;

      return (
        <div ref="components">
          { scoreBoard }
          { brickField }
          { ball }
          { paddle }
        </div>
      );
    }

    return null;
  }


  render() {

    return (
      <div ref="container">
        <canvas ref="canvas" className="breakout" width="480" height="320" />
        { this.renderComponents() }
      </div>
    );

  }
}

// Breakout.prototype._paddle = Paddle;
// Breakout.prototype._brickField = BrickField;
