import { Circle } from './class/Circle.js';
import { createDivPoints } from './lib/createDivPoints.js';
import { renderPoints } from './lib/renderPoints.js';
import { setCtxColor } from './lib/setCtxColor.js';

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight - 4;
const POINT_RADIUS = 10;

const canvas = document.createElement('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext('2d')!;

document.body.append(canvas);

const points = [
  new Circle(100, 100, POINT_RADIUS),
  new Circle(700, 250, POINT_RADIUS),
  new Circle(100, 250, POINT_RADIUS),
  new Circle(300, 350, POINT_RADIUS),
];

const divPoints = createDivPoints(points);
renderPoints(divPoints);

function main() {
  render();

  window.requestAnimationFrame(main);
}

function render() {
  // Clears canvas
  setCtxColor(ctx, 200, 200, 200);
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (points.length === 0) return;

  setCtxColor(ctx, 255, 0, 0);

  // Sets the starting position to be on the first point
  ctx.beginPath();
  setCtxColor(ctx, 60, 30, 120);
  ctx.moveTo(points[0]?.x, points[0]?.y);

  // Draws the bezier curve
  for (let t = 0; t <= 1.01; t += 0.01) {
    const { x, y } = go(points, t);
    ctx.lineTo(x, y);
  }

  ctx.stroke();
  ctx.closePath();
}

/**
 * Gets a point of a bezier curve using the de Casteljau algorithm
 * @param points Array of points
 * @param t Arbitrary value used to calculate the point
 * @returns A point on the bezier curve
 */
function go(points: Circle[], t: number): Circle {
  if (points.length === 0) throw new Error('No points were provided');
  if (points.length === 1) return points[0];

  const newPoints = [];
  for (let i = 0; i < points.length - 1; i++) {
    const x = (1 - t) * points[i].x + t * points[i + 1].x;
    const y = (1 - t) * points[i].y + t * points[i + 1].y;
    newPoints.push(new Circle(x, y, POINT_RADIUS));
  }

  return go(newPoints, t);
}

window.requestAnimationFrame(main);

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    const point = new Circle(
      Math.random() * CANVAS_WIDTH - POINT_RADIUS,
      Math.random() * CANVAS_HEIGHT - POINT_RADIUS,
      POINT_RADIUS
    );

    points.push(point);
    divPoints.push(...createDivPoints([point]));
  } else if (e.code === 'Backspace') {
    points.pop();
    divPoints.pop()?.remove();
  } else return;
  renderPoints(divPoints);
});
