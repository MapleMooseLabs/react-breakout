
export default function Ball () {
  const pi = Math.PI;
  const canvas = this.refs.canvas;
  const ctx = this.ctx;
  const x = this.x;
  const y = this.y;
  const dx = this.dx;
  const dy = this.dy;
  const radius = this.ballRadius;
  const that = this;

  return {
    draw() {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, pi*2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }
}
