/**
 * Get div points and attaches them ot body and assign a number to them
 * @param points Array of div points
 */
export function renderPoints(points: HTMLDivElement[]) {
  points.forEach((div, index) => {
    div.innerText = `${index + 1}`;
    document.body.append(div);
  });
}
