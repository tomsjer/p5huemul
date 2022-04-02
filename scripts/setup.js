function setup() {
  console.log("setup");

  createCanvas(windowWidth, windowHeight, WEBGL); // resolucion monitor
  setAttributes("antialias", true);
  textFont(font);
  setupSliders();

  colorfondo = color("#10002b"); // blue
  current = createVector(0, 0);
  fade = 0;

  myEasyCam = new EasyCamHandler(state);
  easycam = myEasyCam.easycam;

  windowResized();

  // array linea
  for (let i = 0; i < numPoints; i++) {
    // first, create a vector with x/y coords
    const point = createVector(width / 2, height / 2);

    // the push (add) it to the array!
    points.push(point);
  }

  // pg = createGraphics(100, 100);

  bubble = new Bubble(200, 250); // Mouse
  bubble1 = new Bubble(773, 396); // Ubicacion Isla Huemul
  // bubble2 = new Bubble(500, 500); // Ubicacion

  reactorLocation = new RadioactiveLocation({
    x: VIEWPORT_WIDTH * (640 / 1600),
    y: VIEWPORT_HEIGHT * (310 / 900),
    w: 70,
    h: 70,
    label: "Reactor Principal",
    text: textoReactor,
    image: imgReactorCenital,
    bounds: [250, -60, -160, -130, -80]
  });

  usinaLocation = new Location({
    x: VIEWPORT_WIDTH * (630 / 1600),
    y: VIEWPORT_HEIGHT * (150 / 900),
    w: 120,
    h: 120,
    label: "Usina",
    text: "Texto usina",
    image: imgUsina,
    bounds: [250, -80, -200, -300, -250]
  });
}
