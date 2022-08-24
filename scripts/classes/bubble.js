class Bubble {
  constructor(x, y, r = 10) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }

  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.r + other.r;
  }

  changeColor(bright) {
    this.brightness = bright;
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    this.x = mouseX;
    this.y = mouseY;
  }

  show() {
    this.update();

    fill(0, 255, 0);
    noStroke();

    if (DEBUG){
      noStroke();
      textSize(25);
      text("mouseX: " + int(this.x),this.x + 25, this.y);
      text("mouseY: " + int(this.y), this.x + 25, this.y + 25);
    }
    ellipse(this.x, this.y, this.r * 2);
  }
}
