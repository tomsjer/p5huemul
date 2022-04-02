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
  }
}

function mousePressed() {
  current.x = mouseX;
  current.y = mouseY;
  print(int(current.x), int(current.y));
}

function windowResized() {
  VIEWPORT_WIDTH = windowWidth;
  VIEWPORT_HEIGHT = windowHeight;
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0, 0, windowWidth, windowHeight]);
}
