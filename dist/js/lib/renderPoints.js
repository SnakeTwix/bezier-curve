export function renderPoints(points) {
    points.forEach((div, index) => {
        div.innerText = `${index + 1}`;
        document.body.append(div);
    });
}
