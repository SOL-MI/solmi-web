import { randomColor } from "@/utils/randomColor";

const RADIUS = 40;

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
  ctx.arc(x, y, RADIUS, (1 / 2) * Math.PI, (3 / 2) * Math.PI);
  ctx.fillStyle = randomColor();
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y + RADIUS * 2, RADIUS, (3 / 2) * Math.PI, (1 / 2) * Math.PI);
  ctx.fillStyle = randomColor();
  ctx.fill();

  ctx.beginPath();
  ctx.rect(x, y - RADIUS, RADIUS, RADIUS);
  ctx.fillStyle = randomColor();
  ctx.fill();

  ctx.beginPath();
  ctx.rect(x - RADIUS, y + RADIUS * 2, RADIUS, RADIUS);
  ctx.fillStyle = randomColor();
  ctx.fill();
};

export default drawS;
