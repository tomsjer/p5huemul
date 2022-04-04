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
    // if (d < this.r + other.r) {
    //   return true;
    // } else {
    //   return false;
    // }
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
  /*
    move() {
      this.x = this.x + random(-2, 2);
      this.y = this.y + random(-2, 2);
    }
  */
  update() {
    // FIXME: algun calculo para mapear mouseX/Y ?
    // let zoomMult = easycam.getZoomMult();
    this.x = mouseX; // * zoomMult;
    this.y = mouseY - HEIGHT_OFFSET; // * zoomMult;
  }

  show() {
    this.update();
    //stroke(255);
    //strokeWeight(4);
    noStroke();
    //fill(this.brightness, 125);
    fill(0, 0, 255);
    ellipse(this.x, this.y, this.r * 2);
  }
}
