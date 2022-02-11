export function mouseOverCircle(
  { x, y, r }: { x: number; y: number; r: number },
  mouseX: number,
  mouseY: number
) {
  if (Math.abs(x - mouseX) <= r && Math.abs(y - mouseY) <= r) return true;

  return false;
}
