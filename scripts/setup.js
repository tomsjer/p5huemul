function setup() {
  console.log("setup");

  createCanvas(VIEWPORT_WIDTH, VIEWPORT_HEIGHT, WEBGL); // resolucion monitor
  addScreenPositionFunction();

  // createCanvas(windowWidth, windowHeight, WEBGL); // resolucion monitor
  setAttributes("antialias", true);
  textFont(font);
  
  let gui_col = new dat.GUI();
	gui_col.add(window, 'colorFondo', 0, 255);
  gui_col.add(window, 'booleanTopo');
  gui_col.add(window, 'booleanGuia');
  gui_col.add(window, 'booleanHUD');
  gui_col.add(window, 'DEBUG');

  myEasyCam = new EasyCamHandler({ distance: 1100, center: [0, 0, 0] }, {
    viewportWidth: VIEWPORT_WIDTH,
    viewportHeight: VIEWPORT_HEIGHT
  });
  easycam = myEasyCam.easycam;

  windowResized();

  // array linea
  for (let i = 0; i < numPoints; i++) {
    // first, create a vector with x/y coords
    const point = createVector(width / 2, height / 2);

    // the push (add) it to the array!
    points.push(point);
  }

  bubble = new Bubble(200, 250); // Mouse
  // bubble1 = new Bubble(773, 396); // Ubicacion Isla Huemul
  // bubble2 = new Bubble(500, 500); // Ubicacion

  locations = LOCATIONS_CONFIG.map(
    (location) =>
      new LocationTypes[location.type]({
        ...location.config,
        // la imagen se instancia en preload.js
        image: window[location.config.image],
        imagePopup: window[location.config.imagePopup || 'imgCruz']
      })
  );
}
