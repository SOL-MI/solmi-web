const drawS = ({
  x,
  y,
  ctx,
}: {
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
}) => {
  ctx.beginPath();
  ctx.arc(x, y, 40, 0, Math.PI * 2);
  ctx.fill();
};

export default drawS;
