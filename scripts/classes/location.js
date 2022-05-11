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
    this.imagePopup = config.imagePopup;
    this.x = config.x;
    this.y = config.y;
    this.w = config.w;
    this.h = config.h;
    this.r = this.w / 2;
    this.xCenter = this.x - width / 2;
    this.yCenter = this.y - height / 2; // + HEIGHT_OFFSET
    this.title = config.title;
    this.text = config.text;
    this.isActivable = this.title !== '' && this.text !== ''
    this.isActive = false;
    this.sp = createVector(0,0,0)
    this.tv = createVector(-width/2, -height/2, 0)
    this.noCross = config.noCross || false
    this.crossPosition = config.crossPosition || 'top'

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
    this.sp = screenPosition(this.x, this.y, 0).sub(this.tv)
    this.draw();
    if (this.isActivable) {
      this.isActive = false;
      if (this.intersects()) {
        this.isActive = true;
        this.drawHUD();
      }
    }
  }
  draw() {
    if (this.image) {
      push();
      translate(-this.w / 2, -this.h / 2);
      if (DEBUG) {
        strokeWeight(this.isActive ? 2 : 1);
        stroke(255, this.isActive ? 255 : 100);
        fill(0, this.isActive ? 100 : 0);
        rect(this.x, this.y, this.w, this.h);
      }
      image(this.image, this.x, this.y, this.w, this.h);
      pop();
      if (!this.noCross) {
        push();
        if (this.crossPosition === 'bottom') {
          translate(- 20, this.h / 2);
        } else {
          translate(this.w / 2 - 20, -this.h / 2);
        }
        image(imgCruz, this.x, this.y, 18, 18);
        pop();
      }
      if (DEBUG) {
        strokeWeight(1);
        stroke(255, 0, 0);
        line(this.x - 10, this.y, this.x + 10, this.y)
        line(this.x, this.y - 10, this.x, this.y  + 10)
        fill(255, 0, 0);
        textSize(12);
        text(nfs([this.x, this.y], 1, 1), this.x + 10, this.y + 10, 100, 100);
        text(nfs([this.sp.x, this.sp.y], 1, 1), this.x + 10, this.y + 20, 100, 100);
      }
    }
  }
  // drawLabel() {
  //   push();
  //   if (this.crossPosition === 'bottom') {
  //     translate(- 20, this.h / 2);
  //   } else {
  //     translate(this.w / 2 - 20, -this.h / 2);
  //   }
  //   fill(255);
  //   textSize(15);
  //   text(this.title, this.x + 20, this.y + 14);
  //   pop();
  // }
  drawHUD() {
    push();
    easycam.beginHUD();
    translate(50, windowHeight - 450);
    noLights();
    // Render the background box for the HUD
    noStroke();
    fill(0, 200);
    rect(0, 0, 400, 400);

    // Render Image
    if (this.imagePopup) {
      image(this.imagePopup, 25, 25, 350, 200);
    }
    // Render texts
    fill(255);
    textSize(24);
    text(this.title, 25, 300, 350, 350); // TODO: relative coordinates
    textSize(15);
    text(this.text, 25, 330, 350, 350); // TODO: relative coordinates
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
    return bubble.intersects({ x: this.sp.x, y: this.sp.y, r: this.r + this.r * (1 - easycam.getZoomMult()) });
  }
  intersectsCursor() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    return d < this.r + 30;
  }
  onClick() {
    easycam.setState({
      ...easycam.state,
      center: [ this.xCenter, this.yCenter , 0],
      distance: 250
    }, 2000); // animate to state in 1 second
  }
}
