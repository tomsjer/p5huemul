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
  constructor(id, config, index) {
    this.index = index;
    this.id = id
    this.image = config.image;
    this.imagePopup = config.imagePopup;
    this.x = config.x;
    this.y = config.y;
    this.w = config.w;
    this.h = config.h;
    this.r = this.w > this.h ? this.w / 2 : this.h / 2;
    this.halfR = this.r / 2;
    this.doubleR = this.r * 2;
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
    this.cr = this.w > this.h ? this.w * 2 : this.h * 2;
    this.cx = this.x - this.cr / 4 - 10;
    this.cy = this.y - this.cr / 4 - 5;

    this.fade = 0;
    this.fadeAmount = 20;

    this.minZoom = 350
    this.range = 100

    this.data = config.data || {
      sector: 'Abcd',
      superficie: '123',
      elevacion: '123',
      lat: '1234',
      lon: '1234'
    }

    this.createHUDElements();
  }
  update() {
    this.sp = screenPosition(this.x, this.y, 0).sub(this.tv)
    if (this.isActivable) {
      if (this.intersects()) {
        if (this.fade < 255) {
          this.fade += this.fadeAmount;
        }
        this.isActive = true;
        this.HUDcontainer.classList.add('active')
      } else {
        if (!this.clicked) {
          if (this.fade > 0) {
            this.fade -= this.fadeAmount;
          }
          this.isActive = false;
          this.HUDcontainer.classList.remove('active')
        }
      }
    }
    if (this.isActivable) {
      if (this.intersects()) {
        this.isActive = true;
        
      } else {
        if (this.clicked) {
        } else {
          this.isActive = false
          this.HUDcontainer.classList.remove('active')
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
      if (this.isActive) {
        tint(255, this.fade - 200);
        image(imgLocationClicked, this.cx, this.cy, this.cr, this.cr);
        if (DEBUG) {
          strokeWeight(4);
          stroke(255, 0, 0);
          fill(0, 200);
          rect(this.x, this.y, this.w, this.h);
        }
      }
      tint(255, 255);
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
        noFill();
        strokeWeight(1);
        stroke(255, 0, 0);
        line(this.x - 10, this.y, this.x + 10, this.y)
        line(this.x, this.y - 10, this.x, this.y  + 10)
        ellipse(this.x, this.y, this.r, this.r);
        fill(255, 0, 0);
        textSize(12);
        text(nfs([this.x, this.y], 1, 1), this.x + 10, this.y + 10, 100, 100);
        text(nfs([this.sp.x, this.sp.y], 1, 1), this.x + 10, this.y + 20, 100, 100);
        noFill();
        stroke(0, 255, 0);
        ellipse(this.x, this.y, this.doubleR, this.doubleR);

      }
    }
  }
  intersects() {
    return (
      (bubble !== undefined ? this.intersectsBubble() : true) ||
      (easycam.state.distance <= this.minZoom &&
        easycam.state.center[0] <= this.xCenter + this.halfR &&
        easycam.state.center[0] >= this.xCenter - this.halfR &&
        easycam.state.center[1] <= this.yCenter + this.halfR &&
        easycam.state.center[1] >= this.yCenter - this.halfR
    ));
  }
  intersectsBubble() {
    // Uso las posiciones del objeto 3d en pantalla 2d
    return bubble.intersects({ x: this.sp.x, y: this.sp.y, r: this.r  });
  }
  onMousePressed() {
    if (this.intersectsBubble()) {
      this.onClick()
    } else if (this.clicked) {
      this.clicked = false
      this.isActive = false
      this.HUDcontainer.classList.remove('active')
    }
  }
  onClick() {
    this.clicked = !this.clicked;
    if (this.clicked) {
      this.isActive = true;
      this.HUDcontainer.classList.add('active')
    } else {
      this.isActive = false
      this.HUDcontainer.classList.remove('active')
    }
  }
  show() {
    this.isActive = true
    // this.clicked = true
    setTimeout(() => {
      this.HUDcontainer.classList.add('active')
    }, 2000)
    easycam.setState({
        ...easycam.state,
        center: [ this.xCenter, this.yCenter , 0],
        distance: 250
      }, 2000); // animate to state in 1 second
  }
  hide() {
    this.isActive = false
    // this.clicked = false
    this.HUDcontainer.classList.remove('active')
  }
  createHUDElements() {
    this.HUDcontainer = document.createElement('div')
    this.HUDcontainer.id = this.id
    this.HUDcontainer.classList.add('location-HUD-container')
    this.HUDcontainer.innerHTML = `
      <h3>${this.title}</h3>
      <div class="img-container" style="background-image: url(${this.imagePopup});"></div>
      <div class="data-container">
        <div class="sector"><label>Sector</label><span>${this.data.sector}</span></div>
        <div class="superficie"><label>Superficie</label><span>${this.data.superficie}</span>m2</div>
        <div class="elevacion"><label>Elevacion</label><span>${this.data.elevacion}</span>m2</div>
        <div class="lat"><label>Lat.</label><span>${this.data.lat}</span></div>
        <div class="lon"><label>Lon.</label><span>${this.data.lon}</span></div>
      </div>
      <div class="description">${this.text}</div>
    `
    document.body.appendChild(this.HUDcontainer)
  }
}
