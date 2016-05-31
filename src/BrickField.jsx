
export default function BrickField () {
  const that = this;
  const ctx = this.ctx;
  let { bricks } = this.state;
  let brickRowCount = this.brickRowCount;
  let brickColumnCount = this.brickColumnCount;
  let brickWidth = this.brickWidth;
  let brickHeight = this.brickHeight;
  let brickPadding = this.brickPadding;
  let brickOffsetTop = this.brickOffsetTop;
  let brickOffsetLeft = this.brickOffsetLeft;

  // let bricks = [];
  for(let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  this.setState({ bricks: bricks });

  return {
    draw() {
      for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
          }
        }
      }
      that.setState({ bricks: bricks });
    } // draw()
  }
}
