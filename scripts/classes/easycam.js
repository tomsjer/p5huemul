/**
 * Inicializa una easycam con valores por defecto this.y bloquea la rotacion
 * Se encarga de dibujar el cursor con la coordenas this.y otra información
 */
class EasyCamHandler {
  constructor(
    state,
    config = {
      defaultInterpolation: 2000,
      distanceMin: 150,
      distanceMax: 2000
    }
  ) {
    this.easycam = createEasyCam(state);
    this.easycam.setRotationScale(0); // BLOQUEO ROTACION 3D!!!
    this.easycam.setViewport([0, 0, windowWidth, VIEWPORT_HEIGHT]);

    // slower transitions look nicer in the ortho mode
    this.easycam.setDefaultInterpolationTime(config.defaultInterpolation); //slower transition

    this.easycam.setState(state, config.defaultInterpolation); // animate to state in 1 second
    this.easycam.state_reset = state; // state to use on reset

    this.easycam.setDistanceMin(config.distanceMin); // MAXIMO ZOOM IN
    this.easycam.setDistanceMax(config.distanceMax); // MAXIMO ZOOM OUT
    this.easycam.attachMouseListeners(this._renderer);

    // Origin for the HUD
    this.x = 50;
    this.y = 50;
  }

  draw() {
    updatePoints();
    if (DEBUG) {
      this.drawHUD();
    }
    this.drawCursor();
  }

  drawCursor() {
    noStroke();
    fill(255, 0, 0);
    textSize(25);
    text("X: " + int(mouseX), mouseX + 25, mouseY);
    text("Y: " + int(mouseY), mouseX + 25, mouseY + 25);
  }

  drawHUD() {
    //HUD CON DATOS DE LA POSICION DE LA CAMARA VIRTUAL
    // 2D screen-aligned rendering section
    this.easycam.beginHUD();
    noLights();
    let state = this.easycam.getState();

    // Render the background box for the HUD
    noStroke();
    fill(0);
    rect(this.x, this.y, 20, 75);
    fill(50, 50, 52, 200); // a bit of transparency
    rect(this.x + 20, this.y, 250, 75);

    // Render the labels
    textSize(20);
    fill(69, 161, 255);
    text("Distance:", this.x + 35, this.y + 25);
    text("Center:  ", this.x + 35, this.y + 25 + 20);
    // text("Rotation:",this.x+35,this.y+25+40);
    text("Framerate:", this.x + 35, this.y + 65);

    // Render the state numbers
    fill(69, 161, 255);
    text(nfs(state.distance, 1, 2), this.x + 125, this.y + 25);
    text(nfs(state.center, 1, 2), this.x + 125, this.y + 25 + 20);
    //  text(nfs(state.rotation, 1, 3),this.x+125,this.y+25+40);
    text(nfs(frameRate(), 1, 2), this.x + 125, this.y + 65);

    // fill(255);
    // textSize(15);
    // text("Topografia", 103, 240);

    this.easycam.endHUD();
  }
}
