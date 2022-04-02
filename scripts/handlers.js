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

function mousePressed() {
  current.x = mouseX;
  current.y = mouseY;
  locations.forEach((location) => {
    if (location.intersectsCursor(mouseX, mouseY)) {
      location.onClick();
    }
  });
}

function windowResized() {
  VIEWPORT_WIDTH = windowWidth;
  VIEWPORT_HEIGHT = windowWidth * 0.5625;
  HEIGHT_OFFSET = (windowHeight - VIEWPORT_HEIGHT) / 2;
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0, 0, windowWidth, VIEWPORT_HEIGHT]);
}

function setupSliders() {
  /*
  // slider perlinoise circulo // SIN USO! ////
  slider = createSlider(0, 5, 3, 0.1);
  slider.position(500, 140);
  */
  // // slideR color agua/fondo
  // slider2 = createSlider(40, 150, 40, 1);
  // slider2.position(100, 180);
  // // slider topografia on/off
  // slider3 = createSlider(0, 1, 0, 1);
  // slider3.position(100, 242);
  // slider3.size(30);
}

function updateSliders() {
  // cambio el color del fondo
  // let colorfondo = slider2.value();
  // toogle topografico
  // let topo = slider3.value();
  // if (topo == 0) {
  //   booleantopo = false;
  // } else if (topo == 1) {
  //   booleantopo = true;
  // }
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
