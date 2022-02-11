export function mouseOverCircle({ x, y, r }, mouseX, mouseY) {
    if (Math.abs(x - mouseX) <= r && Math.abs(y - mouseY) <= r)
        return true;
    return false;
}
