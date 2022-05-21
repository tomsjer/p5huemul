/**
 * Inicializa una easycam con valores por defecto this.y bloquea la rotacion
 * Se encarga de dibujar el cursor con la coordenas this.y otra información
 */
class EasyCamHandler {
  constructor(
    state,
    config = {
      viewportWidth: 1920,
      viewportHeight: 1080,
      defaultInterpolation: 2000,
      distanceMin: 150,
      distanceMax: 1200
    }
  ) {
    this.easycam = createEasyCam(state);
    this.easycam.setRotationScale(0); // BLOQUEO ROTACION 3D!!!
    this.easycam.setViewport([0, 0, config.viewportWidth, config.viewportHeight]);
    // this.easycam.setViewport([0, 0, windowWidth, windowHeight]);

    // slower transitions look nicer in the ortho mode
    this.easycam.setDefaultInterpolationTime(config.defaultInterpolation); //slower transition

    this.easycam.setState(state, config.defaultInterpolation); // animate to state in 1 second
    this.easycam.state_reset = state; // state to use on reset

    this.easycam.setDistanceMin(config.distanceMin); // MAXIMO ZOOM IN
    this.easycam.setDistanceMax(config.distanceMax); // MAXIMO ZOOM OUT
    this.easycam.attachMouseListeners(this._renderer);

    console.log(this.easycam)
    this.easycam.detachListener.call(this.easycam, this.easycam.mouse.dblclick)

    // Origin for the HUD
    this.x = 25;
    this.y = 25;
  }

  draw() {
    if (booleanHUD || DEBUG) {
      this.drawHUD();
    }
  }

  drawHUD() {
    //HUD CON DATOS DE LA POSICION DE LA CAMARA VIRTUAL
    // 2D screen-aligned rendering section
    noLights();
    let state = this.easycam.getState();

    // Render the background box for the HUD
    noStroke();
    fill(0, 200);
    rect(this.x, this.y, 250, 75);

    // Render the labels
    textSize(20);
    fill(69, 161, 255);
    text("Distance:", this.x + 10, this.y + 25);
    text("Center:  ", this.x + 10, this.y + 25 + 20);
    text("Framerate:", this.x + 10, this.y + 65);

    // Render the state numbers
    fill(69, 161, 255);
    text(nfs(state.distance, 1, 2), this.x + 100, this.y + 25);
    text(nfs(state.center, 1, 2), this.x + 100, this.y + 25 + 20);
    text(nfs(Math.round(frameRate()), 1, 2), this.x + 100, this.y + 65);

    if (DEBUG) {
      push()
      let x = width / 2 - state.center[0]
      let y = height / 2 - state.center[1]
      translate(x, y);
      strokeWeight(4);
      stroke(0, 250, 255);
      line(state.center[0] - 20, state.center[1], state.center[0] + 20, state.center[1])
      line(state.center[0], state.center[1] - 20, state.center[0], state.center[1]  + 20)
      textSize(16);
      fill(0, 200, 255);
      text('state: ' + nfs([state.center[0],state.center[1]],1,1), state.center[0] + 10, state.center[1] + 10, 100, 100);
      fill(255, 0, 255);
      text('x/y: ' + nfs([x, y],1,1), state.center[0] + 10, state.center[1] + 30, 100, 100);
      pop()
    }
  }
}
