function setup() {
  console.log("setup");

  createCanvas(VIEWPORT_WIDTH, VIEWPORT_HEIGHT, WEBGL); // resolucion monitor
  addScreenPositionFunction();

  setAttributes("antialias", true);
  textFont(font);
  
  let gui_col = new dat.GUI({ autoPlace: false });
  gui_col.domElement.id = 'gui';
	gui_col.add(window, 'colorFondo', 0, 255);
  gui_col.add(window, 'booleanTopo');
  gui_col.add(window, 'booleanGuia');
  gui_col.add(window, 'booleanHUD');
  gui_col.add(window, 'booleanPath');
  gui_col.add(window, 'DEBUG');
  gui_col.closed = true
  document.body.appendChild(gui_col.domElement)

  myEasyCam = new EasyCamHandler({ distance: 1200, center: [0, 0, 0] });
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

  LOCATIONS = LOCATIONS_CONFIG.map(
    (location, index) =>
      new LocationTypes[location.type](location.id, {
        ...location.config,
        // la imagen se instancia en preload.js
        image: window[location.config.image],
        imagePopup: location.config.imagePopup || 'imgCruz',
        dangerImage: window[location.config.dangerImage],
      }, index)
  );

  MAP_CONTROLLER = new MapController({})

  PLAYER = new Player({ items: LOCATIONS })

  ISLA = new IslaInfo({...ISLA_CONFIG, image: window[ISLA_CONFIG.image]})
    
  SVG_OBJECT = document.getElementById('svg-object')
  PATH = SVG_OBJECT.contentDocument.querySelector('path')
  PATH_DATA = {
    ...PATH,
    length: PATH.getTotalLength(),
    min: PATH.getPointAtLength(0),
    max: PATH.getPointAtLength(length),
    points: []
  }
  const resolution = PATH_DATA.length / 20;
  for (let i = 0; i < PATH_DATA.length; i+=resolution) {
    let {x, y} = PATH.getPointAtLength(i)
    PATH_DATA.points.push({
      // FIXME: magic numbers
      x: (x - 490) * 1.2,
      y: (y - 25) * 1.2
    })
  }
  
  // FIXME: esto debería ser un interval qe entre en este modo cada N tiempo
  // setTimeout(() => {
  //   ISLA.toggleVisible()
  // }, 3000)
}
