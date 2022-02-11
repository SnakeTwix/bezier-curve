export function setCtxColor(
  ctx: CanvasRenderingContext2D,
  r: number,
  g: number,
  b: number
) {
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
}
