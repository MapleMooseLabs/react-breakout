import React from 'react';


export default class Breakout extends React.Component {

  componentDidMount() {
    this.initGame();
  }

  initGame() {
    
  }


  render() {
    return (
      <canvas ref="canvas" className="breakout" width="480" height="320" />
    );
  }
}
