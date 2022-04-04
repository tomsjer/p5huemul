function setup() {
  console.log("setup");

  createCanvas(windowWidth, windowHeight, WEBGL); // resolucion monitor
  setAttributes("antialias", true);
  textFont(font);
  setupSliders();

  myEasyCam = new EasyCamHandler({ distance: 750, center: [0, 0, 0] });
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
  bubble1 = new Bubble(773, 396); // Ubicacion Isla Huemul
  // bubble2 = new Bubble(500, 500); // Ubicacion

  locations = LOCATIONS_CONFIG.map(
    (location) =>
      new LocationTypes[location.type]({
        ...location.config,
        // la imagen se instancia en preload.js
        image: window[location.config.image]
      })
  );
}
