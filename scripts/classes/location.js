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
    this.isActive = false;

    // TODO: add fade animation
    this.opacity = 255;
    this.fade = 0;
    this.fadeAmount = 1;

    // FIXME:
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
    this.isActive = false;
    if (this.intersects()) {
      this.isActive = true;
      this.drawHUD();
    }
  }
  draw() {
    push();
    // tint(255, fade);
    translate(-this.w / 2, -this.h / 2);
    image(this.image, this.x, this.y, this.w, this.h);
    strokeWeight(2);
    stroke(255, this.opacity);
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
  intersectsCursor() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    return d < this.r + 30;
  }
  onClick() {
    console.log("onClick", this);
  }
}
