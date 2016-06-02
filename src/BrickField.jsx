import React from 'react';

import Brick from './Brick';


export default class BrickField extends React.Component {

  constructor(props) {
    super(props);

    this.rowCount = 3;
    this.columnCount = 5;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
  }

  componentDidUpdate() {
    this.draw();
  }

  reset() {
    for (let brick of this.getBricks()) {
      brick.reset();
    }
  }

  getBricks() {
    let bricks = [];
    if (this.refs) {
      for (let key in this.refs) {
        let ref = this.refs[key];
        if (Object.getPrototypeOf(ref).constructor.name === 'Brick') {
          bricks.push(ref);
        }
      }
    }

    return bricks;
  }

  hideBricks() {
    let bricks = this.getBricks();

    for (let brick of bricks) {
      brick.setVisibility(false);
    }
  }

  draw() {
    let bricks = this.getBricks();

    for (let brick of bricks) {
      brick.draw();
    }
  }

  renderBricks() {
    let bricks = [];

    for (let colIndex = 0; colIndex < this.columnCount; colIndex++) {
      // bricks[colIndex] = [];
      for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
        let brickX = (colIndex*(this.brickWidth+this.brickPadding))+this.brickOffsetLeft;
        let brickY = (rowIndex*(this.brickHeight+this.brickPadding))+this.brickOffsetTop;
        bricks.push((
          <Brick ref={ 'brick-' + colIndex + '-' + rowIndex }
            key={ colIndex + '-' + rowIndex }
            x={ brickX }
            y={ brickY }
            width={ this.brickWidth }
            height={ this.brickHeight }
            { ...this.props } />
        ));
      } // for (rowIndex)
    } // for (colIndex)
    return bricks;
  }

  render() {
    return (
      <div ref="container">
        { this.renderBricks() }
      </div>
    );
  }
}
