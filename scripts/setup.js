function setup() {
  console.log("setup");

  // createCanvas(displayWidth, displayHeight, WEBGL);
  // createCanvas(800, 450, WEBGL); //A mitad de resolucion anda mucho mas fluido.
  createCanvas(VIEWPORT_WIDTH, VIEWPORT_HEIGHT, WEBGL); // resolucion monitor

  // createEasyCam();
  easycam = createEasyCam();
  easycam.setRotationScale(0); // BLOQUEO ROTACION 3D!!!
  // FIXME: using createEasyCam instead
  easycam = new Dw.EasyCam(this._renderer, {
    distance: 600,
    center: [0, 0, 0]
  });

  easycam.setState(state, 2000); // animate to state in 1 second
  easycam.state_reset = state; // state to use on reset

  easycam.setDistanceMin(150); // MAXIMO ZOOM IN
  easycam.setDistanceMax(1000); // MAXIMO ZOOM OUT
  // CON ESTE SETEO SE ABRE BASTANTE BIEN EN EL TV BOOSTER

  // setRotationConstraint(100, 100, 100);

  // colorfondo = color('#495057');
  colorfondo = color("#10002b"); // blue

  img = loadImage("assets/fondos/islafondo.png"); // Cargar la imagen
  islavectorliso = loadImage("assets/fondos/isla_vector_liso.png"); // Cargar la imagen
  grillamapa = loadImage("assets/masimg/grillamapa.png");
  cruz = loadImage("assets/masimg/cruz.png"); // Cargar la imagen
  topografia = loadImage("assets/masimg/topografia.png"); // Cargar la imagen

  gemelas = loadImage("assets/imgedificios/gemelas-transp.png");
  huemulscan = loadImage("assets/masimg/huemulscan.png");
  auditorio = loadImage("assets/imgedificios/auditorio.png"); // Cargar la imagen

  current = createVector(0, 0);
  fade = 0;

  easycam.attachMouseListeners(this._renderer);

  // array linea
  for (let i = 0; i < numPoints; i++) {
    // first, create a vector with x/y coords
    const point = createVector(width / 2, height / 2);

    // the push (add) it to the array!
    points.push(point);
  }

  font = loadFont("assets/Bison-Bold.ttf");
  textFont(font);

  pg = createGraphics(100, 100);

  bubble = new Bubble(200, 250); // Mouse
  bubble1 = new Bubble(773, 396); // Ubicacion Isla Huemul
  // bubble2 = new Bubble(500, 500); // Ubicacion

  /*
// slider perlinoise circulo // SIN USO! ////
slider = createSlider(0, 5, 3, 0.1);
slider.position(500, 140);
*/

  // slideR color agua/fondo
  slider2 = createSlider(40, 150, 40, 1);
  slider2.position(100, 180);

  // slider topografia on/off
  slider3 = createSlider(0, 1, 0, 1);
  slider3.position(100, 242);
  slider3.size(30);

  console.log(easycam.getCanvas(), easycam.getViewport());
}
