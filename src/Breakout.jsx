import React from 'react';

import ScoreBoard from './ScoreBoard';
import BrickField from './BrickField';
import Ball from './Ball';
import Paddle from './Paddle';
import MessageCenter from './MessageCenter';

export default class Breakout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gameTimer: null,
      running: false,
      showStartMessage: false
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
    this.setState({ showStartMessage: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.showStartMessage && this.state.showStartMessage) {
      this.showStartMessage();
    }
  }

  initGame() {
    console.log('initGame()');
    this.resetGame();
    this.startGame();
  }

  showStartMessage() {
    this.refs.messageCenter.show('Welcome to Breakout!', 'Start', this.initGame.bind(this));
  }

  startGame() {
    let gameTimer = this.state.gameTimer;
    if (gameTimer) {
      clearInterval(gameTimer);
      gameTimer = null;
    }
    gameTimer = setInterval(this.runGame.bind(this), 10);
    this.setState({ gameTimer: gameTimer, running: true });
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

  resetGame() {
    console.log('resetGame()');
    let { canvas, scoreBoard, ball, paddle, brickField } = this.refs;
    this.ctx = canvas.getContext('2d');
    this.x = canvas.width/2;
    this.y = canvas.height-30;

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
    const running = this.state.running;
    const { canvas, scoreBoard, messageCenter } = this.refs;

    if (running) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.drawComponents();

      if (!scoreBoard.getLives()) {
        this.gameOver();
      } else {
        this.detectBrickCollision();
        this.detectWallCollision();
      }
    } else {
      this.setState({ running: true });
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
      colour: "#0095DD"
    }

    return props;
  }

  renderComponents() {
    let props = this.getComponentProps();
    console.log(props);
    if (props.canvas) {
      let scoreBoard = <ScoreBoard ref="scoreBoard" { ...props } />;
      let paddle = <Paddle ref="paddle" { ...props } />;
      let ball = <Ball ref="ball" paddle={ paddle } { ...props } />;
      let brickField = <BrickField ref="brickField" { ...props } />;
      let messageCenter = <MessageCenter ref="messageCenter" { ...props } />;

      return (
        <div ref="components">
          { scoreBoard }
          { brickField }
          { ball }
          { paddle }
          { messageCenter }
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
