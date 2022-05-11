let dragging = false;
let draggingLocation = null;

//MAS FUNCIONES
document.ontouchmove = function (event) {
  event.preventDefault();
};

// suppress right-click context menu
document.oncontextmenu = function () {
  return false;
};

function keyPressed() {
  //if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {}

  if (key === "f") {
    let fs = fullscreen();
    fullscreen(!fs);
    setTimeout(() => windowResized);
  }
}

window.onpointerdown = (e) => {
  mouseX = e.x;
  mouseY = e.y;
  setTimeout(() => {
    mousePressed()
  }, 100)
}

function mousePressed() {
  locations.forEach((location) => {
    if (location.isActive) {
      location.onClick();
      // dragging = true
      // draggingLocation = location
      // console.log('dragging true')
    }
  });
}

function mouseReleased() {
  if (dragging) {
    console.log('released')
    dragging = false
    draggingLocation = null
  }
}

function mouseDragged() {
  if (dragging) {
    draggingLocation.x = mouseX
    draggingLocation.y = mouseY
    console.log('dragged')
  }
}

function windowResized() {
  // VIEWPORT_WIDTH = windowWidth;
  // VIEWPORT_HEIGHT = windowWidth * 0.5625;
  // HEIGHT_OFFSET = (windowHeight - VIEWPORT_HEIGHT) / 2;
  resizeCanvas(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
  if (easycam) {
    easycam.setViewport([0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT]);
  }
}

function setupSliders() {
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
}

function updateSliders() {
  fill(255);
  textSize(15);
  text("Topografia", 103, 240);
  // cambio el color del fondo
  colorFondo = slider2.value();
  // toogle topografico
  booleanTopo = slider3.value() === 0 ? false : true;
}

function updatePoints() {
  // array
  if (mouseX !== pmouseX && mouseY !== pmouseY) {
    // remove the oldest element using shift()
    points.shift();

    // then add the current mouse position
    let point = createVector(mouseX, mouseY);
    points.push(point);
  }

  // draw a line using the points!
  stroke(255);
  strokeWeight(5);
  fill(255, 0);
  beginShape();
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    curveVertex(pt.x, pt.y);
  }
  endShape();
}
