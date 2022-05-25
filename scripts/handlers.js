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
  if (key === "f") {
    let fs = fullscreen();
    fullscreen(!fs);
    setTimeout(() => windowResized);
  }
  const location = LOCATIONS.find(l => l.isActive)
  if (location) {
    switch(key) {
      case 'ArrowUp':
        location.py -= 1;
        break;
      case 'ArrowDown':
        location.py += 1;
        break;
      case 'ArrowLeft':
        location.px -= 1;
        break;
      case 'ArrowRight':
        location.px += 1;
        break;
    }
    console.log(location.px,location.py)
  }
}

if ((window.onmousedown === null || window.onmousedown === undefined) && window.location.hash !== '#notouch') {
  window.onpointerdown = (e) => {
    // if (!DEBUG) return
     mouseX = e.x;
     mouseY = e.y;
     setTimeout(() => mousePressed());
  }
}

function mousePressed() {
  if (!PLAYER.playing) {
    LOCATIONS.forEach((location, index) => {
      location.onMousePressed()
      if (DEBUG && location.clicked) {
        dragging = true
        draggingLocation = location
      }
    });
  }
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
  resizeCanvas(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
  if (easycam) {
    easycam.setViewport([0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT]);
  }
}
