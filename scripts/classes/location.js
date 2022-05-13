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
    this.r = this.w > this.h ? this.w / 2 : this.h / 2;
    this.xCenter = this.x - width / 2;
    this.yCenter = this.y - height / 2; // + HEIGHT_OFFSET
    this.title = config.title;
    this.text = config.text;
    this.isActivable = this.title !== '' && this.text !== ''
    this.isActive = false;
    this.clicked = false;
    this.sp = createVector(0,0,0)
    this.tv = createVector(-width/2, -height/2, 0)
    this.noCross = config.noCross || false
    this.crossPosition = config.crossPosition || 'top'

    this.ppW = 400;
    this.ppH = 500;
    this.ppX = 64;
    this.ppP = 25;
    this.ppY = windowHeight - this.ppH - this.ppP * 2;
    this.ppImgW = this.ppW - this.ppP * 2;
    this.ppImgH = this.ppH / 2;
    this.ppTxtW = this.ppW - this.ppP * 2
    this.ppTxtH = this.ppH / 2 - this.ppP * 2
    this.ppPHalf = this.ppP / 2
    this.ppTtlH = this.ppH - this.ppImgH
    this.ppPTriple = this.ppP * 3
    this.ppImgY = this.ppPTriple + this.ppPHalf / 2
    this.ppTxtY = this.ppPTriple + this.ppPHalf + this.ppImgH
    
    this.titleSize = 56;
    this.textSize = 24;

    this.fade = 0;
    this.fadeAmount = 20;

    this.minZoom = 350
    this.range = 100
  }
  update() {
    this.sp = screenPosition(this.x, this.y, 0).sub(this.tv)
    if (this.isActivable) {
      if (this.intersects()) {
        if (this.fade < 255) {
          this.fade += this.fadeAmount;
        }
        this.isActive = true;
      } else {
        if (!this.clicked) {
          if (this.fade > 0) {
            this.fade -= this.fadeAmount;
          }
          if (this.isActive && this.fade === 0) {
            this.isActive = false
            OPENED_POPUP = false;
          }
        }
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
      if (this.clicked) {
        strokeWeight(4);
        stroke(255, 0, 0);
        fill(0, 200);
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
  drawHUD() {
    if ((!this.isActive && !this.clicked)) return
    push();
    translate(this.ppX, this.ppY);
    noLights();
    // Render the background box for the HUD
    noStroke();
    fill(0, this.fade - 50);
    rect(0, 0, this.ppW, this.ppH);

    // Render title
    fill(255, this.fade);
    textSize(this.titleSize);
    text(this.title, this.ppP, this.ppPHalf, this.ppTxtW, this.ppTtlH);

    // Render Image
    if (this.imagePopup) {
      tint (255, this.fade);
      if (DEBUG) {
        noFill();
        stroke(255, 0, 0);
        rect(this.ppP, this.ppImgY, this.ppImgW, this.ppImgH);
      }
      image(this.imagePopup, this.ppP, this.ppImgY, this.ppImgW, this.ppImgH);
    }
    // Render description
    fill(255, this.fade);
    textSize(this.textSize);
    text(this.text, this.ppP, this.ppTxtY, this.ppTxtW, this.ppTxtH);
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
    // Uso las posiciones del objeto 3d en pantalla 2d
    return bubble.intersects({ x: this.sp.x, y: this.sp.y, r: this.r + this.r * (1 - easycam.getZoomMult()) });
  }
  intersectsCursor() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    return d < this.r + 30;
  }
  onMousePressed() {
    if (this.intersectsBubble()) {
      this.onClick()
    } else if (this.clicked) {
      this.clicked = false
    }
  }
  onClick() {
    this.clicked = !this.clicked;
    if (this.clicked) {
      // OPENED_POPUP = true;
      // easycam.setState({
      //   ...easycam.state,
      //   center: [ this.xCenter, this.yCenter , 0],
      //   distance: 250
      // }, 2000); // animate to state in 1 second
    }
  }
  show() {
    this.isActive = true
    this.clicked = true
    easycam.setState({
        ...easycam.state,
        center: [ this.xCenter, this.yCenter , 0],
        distance: 250
      }, 2000); // animate to state in 1 second
  }
  hide() {
    this.isActive = false
    this.clicked = false
  }
}
