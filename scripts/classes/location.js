class Location {
  constructor(config) {
    this.image = config.image;
    this.x = config.x;
    this.y = config.y;
    this.w = config.w;
    this.h = config.h;
    this.label = config.label;
    this.text = config.text;
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
    tint(255, fade);
    image(this.image, this.x, this.y, this.w, this.h);
    pop();

    strokeWeight(2);
    stroke(255, opacidad);
    fill(255, 0, 0, 0);
    rect(this.x, this.y, 64, 55);
  }
  drawLabel() {
    image(cruz, this.x, this.y, 18, 18);
    fill(255);
    textSize(15);
    text(this.label, this.x + 20, this.y + 20);
  }
  drawHUD() {
    easycam.beginHUD();
    noLights();
    // Render the background box for the HUD
    noStroke();
    fill(0, 200);
    rect(100, 400, 400, 400); // TODO: relative coordinates

    fill(255);
    textSize(15);
    text(this.text, 120, 700, 350, 350); // TODO: relative coordinates

    easycam.endHUD();
  }
  intersects() {
    // TODO: parameters
    return (
      easycam.state.distance <= 250 &&
      easycam.state.center[0] <= -60 &&
      easycam.state.center[0] >= -160 &&
      easycam.state.center[1] >= -130 &&
      easycam.state.center[1] <= -80
    );
  }
}
