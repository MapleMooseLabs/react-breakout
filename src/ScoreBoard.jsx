import React from 'react';

export default class ScoreBoard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      lives: 3
    };
  }

  reset() {
    this.setState({
      score: 0,
      lives: 3
    });
  }

  getScore() {
    return this.state.score;
  }

  getLives() {
    return this.state.lives;
  }

  increaseScore() {
    this.setState({ score: this.state.score+1 });
  }

  decreaseLives() {
    this.setState({ lives: this.state.lives-1 });
  }

  draw() {
    const { score, lives } = this.state;
    const { canvas, ctx, colour } = this.props;

    ctx.font = "16px Arial";
    ctx.fillStyle = colour;
    ctx.fillText("Score: " + score, 8, 20);
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
  }

  render() {
    return null;
  }
}
