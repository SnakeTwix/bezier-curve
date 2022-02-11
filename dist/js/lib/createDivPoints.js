export function createDivPoints(points) {
    return points.map((point, index) => {
        const div = document.createElement('div');
        div.innerText = `${index + 1}`;
        div.classList.add('point');
        div.style.height = `${point.r * 2}px`;
        div.style.width = `${point.r * 2}px`;
        div.style.top = `${point.y - point.r}px`;
        div.style.left = `${point.x - point.r}px`;
        div.onpointerdown = (e) => {
            div.setPointerCapture(e.pointerId);
            div.onpointermove = (e) => {
                const x = e.clientX - point.r;
                const y = e.clientY - point.r;
                div.style.left = `${x}px`;
                div.style.top = `${y}px`;
                point.x = x + point.r;
                point.y = y + point.r;
            };
            div.onpointerup = (e) => {
                div.onpointerup = null;
                div.onpointermove = null;
            };
        };
        return div;
    });
}
