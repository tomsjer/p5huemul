class Location {
  constructor(config) {
    this.image = config.image;
    this._x = config.x;
    this._y = config.y;
    this.x = config.x;
    this.y = config.y;
    this.w = config.w;
    this.h = config.h;
    this.r = this.w / 2;
    this.label = config.label;
    this.text = config.text;
    this.bounds = config.bounds;

    // window.addEventListener("resize", () => {
    //   setTimeout(() => {
    //     this.x = VIEWPORT_WIDTH * (this._x / 1600);
    //     this.y = VIEWPORT_HEIGHT * (this._y / 900);
    //   }, 1000);
    // });
  }
  update() {
    this.draw();
    this.drawLabel();
    if (this.intersects()) {
      this.drawHUD();
    }
  }
  draw() {
    push();
    // tint(255, fade);
    translate(-this.w / 2, -this.h / 2);
    image(this.image, this.x, this.y, this.w, this.h);
    strokeWeight(2);
    stroke(255, opacidad);
    fill(255, 0, 0, 0);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
  drawLabel() {
    push();
    translate(this.w / 2, -this.h / 2 - 20);
    image(cruz, this.x, this.y, 18, 18);
    fill(255);
    textSize(15);
    text(this.label, this.x + 20, this.y + 14);
    pop();
  }
  drawHUD() {
    easycam.beginHUD();
    push();
    translate(50, windowHeight - 450);
    noLights();
    // Render the background box for the HUD
    noStroke();
    fill(0, 200);
    rect(0, 0, 400, 400);

    fill(255);
    textSize(15);
    text(this.text, 25, 300, 350, 350); // TODO: relative coordinates
    pop();
    easycam.endHUD();
  }
  intersects() {
    if (!this.bounds || this.bounds.length < 5) {
      return false;
    }
    return (
      (bubble !== undefined ? this.intersectsBubble() : true) ||
      (easycam.state.distance <= this.bounds[0] &&
        easycam.state.center[0] <= this.bounds[1] &&
        easycam.state.center[0] >= this.bounds[2] &&
        easycam.state.center[1] >= this.bounds[3] &&
        easycam.state.center[1] <= this.bounds[4])
    );
  }
  intersectsBubble() {
    return bubble.intersects(this);
  }
  onClick() {
    console.log("onClick", this);
  }
}
