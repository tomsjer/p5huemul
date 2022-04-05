/**
 * Clase generica para representar una locación:
 * - Cordenadas y medidas
 * - Titulo y descripcion
 * - Limites para mostrar/ocultar panel de información
 *
 * Se encarga de calcular si intersecta con el cursor o la cámara
 * Por fuera en el draw se usa esa lógica al momento del mousePressed,
 * disparando el metodo onClick si fue clickeada el área que ocupa la location
 */
class Location {
  constructor(config) {
    this.image = config.image;
    this.x = config.x;
    this.y = config.y;
    this.w = config.w;
    this.h = config.h;
    this.r = this.w / 2;
    this.xCenter = this.x - width / 2
    this.yCenter = this.y - height / 2
    this.label = config.label;
    this.text = config.text;
    this.isActive = false;

    // TODO: add fade animation
    this.opacity = 255;
    this.fade = 0;
    this.fadeAmount = 1;

    this.minZoom = 350
    this.range = 100

    window.addEventListener("resize", this.onResize.bind(this));
  }
  onResize() {
    // TODO: reposition
    // this.x = VIEWPORT_WIDTH * (this._x / 1600);
    // this.y = VIEWPORT_HEIGHT * (this._y / 900);
  }
  update() {
    this.draw();
    this.drawLabel();
    this.isActive = false;
    if (this.intersects()) {
      this.isActive = true;
      this.drawHUD();
    }
  }
  draw() {
    if (this.image) {
      push();
      // tint(255, fade);
      translate(-this.w / 2, -this.h / 2);
      image(this.image, this.x, this.y, this.w, this.h);
      if (DEBUG) {
        strokeWeight(2);
        stroke(255, this.opacity);
        fill(255, 0, 0, 0);
        rect(this.x, this.y, this.w, this.h);
      }
      pop();
      if (DEBUG) {
        strokeWeight(1);
        stroke(255, 0, 0);
        line(this.x - 10, this.y, this.x + 10, this.y)
        line(this.x, this.y - 10, this.x, this.y  + 10)
        fill(255, 0, 0);
        textSize(12);
        text(this.x, this.x + 10, this.y + 10, 100, 100);
        text(this.y, this.x + 10, this.y + 20, 100, 100);
      }
    }
  }
  drawLabel() {
    push();
    translate(this.w / 2, -this.h / 2 - 20);
    image(imgCruz, this.x, this.y, 18, 18);
    fill(255);
    textSize(15);
    text(this.label, this.x + 20, this.y + 14);
    pop();
  }
  drawHUD() {
    push();
    easycam.beginHUD();
    translate(50, windowHeight - 450);
    noLights();
    // Render the background box for the HUD
    noStroke();
    fill(0, 200);
    rect(0, 0, 400, 400);

    fill(255);
    textSize(15);
    text(this.text, 25, 300, 350, 350); // TODO: relative coordinates
    easycam.endHUD();
    pop();
  }
  intersects() {
    return (
      (bubble !== undefined ? this.intersectsBubble() : true) ||
      (easycam.state.distance <= this.minZoom &&
        easycam.state.center[0] <= this.xCenter + this.r &&
        easycam.state.center[0] >= this.xCenter - this.r &&
        easycam.state.center[1] <= this.yCenter + this.r &&
        easycam.state.center[1] >= this.yCenter - this.r
    ));
  }
  intersectsBubble() {
    return bubble.intersects(this);
  }
  intersectsCursor() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    return d < this.r + 30;
  }
  onClick() {
    console.log("onClick", this);
  }
}
