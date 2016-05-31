
export default function Paddle () {
  const that = this;
  const state = this.state;
  const canvas = this.refs.canvas;
  const ctx = this.ctx;
  const paddleHeight = 10;
  const paddleWidth = this.paddleWidth;

  if (!state.paddleX) {
    this.setState({ paddleX: ((canvas.width-paddleWidth)/2) });
  }

  return {
    keyDownHandler(e) {
      if(e.keyCode == 39) {
        state.rightPressed = true;
      } else if(e.keyCode == 37) {
        state.leftPressed = true;
      }
      that.setState({ rightPressed: state.rightPressed, leftPressed: state.leftPressed });
    },

    keyUpHandler(e) {
      if(e.keyCode == 39) {
        state.rightPressed = false;
      } else if(e.keyCode == 37) {
        state.leftPressed = false;
      }

      that.setState({ rightPressed: state.rightPressed, leftPressed: state.leftPressed });
    },

    draw() {
      if (state.rightPressed) {
        that.setState({ paddleX: (state.paddleX + 7) });
      } else if (state.leftPressed) {
        that.setState({ paddleX: (state.paddleX - 7) });
      }
      ctx.beginPath();
      ctx.rect(state.paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }
}
