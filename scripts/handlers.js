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

let timeoutId, modX, modY;

function keyPressed() {
  if (key === "f") {
    let fs = fullscreen();
    fullscreen(!fs);
    setTimeout(() => windowResized);
  }
  if (DEBUG) {
    if (!modX && !modY) {
      modX = key === 'q' ? 'x2' : 'px';
      modY = key === 'q' ? 'y2' : 'py';
    }
    if(key !== 'q') {
      move()
    }
  }
}

window.onkeyup = (e) => {
  if (timeoutId && (e.code === 'ArrowLeft' || e.code === 'ArrowRight' || e.code === 'ArrowUp' || e.code === 'ArrowDown')) {
    clearTimeout(timeoutId)
    timeoutId = undefined;
  } else if (e.code === 'KeyQ') {
    modX = modY = undefined
  }
}

function move() {
  const location = LOCATIONS.find(l => l.isCronoActive)
  if (location) {
    switch(key) {
      case 'ArrowUp':
        location[modY] -= 2;
        break;
      case 'ArrowDown':
        location[modY] += 2;
        break;
      case 'ArrowLeft':
        location[modX] -= 2;
        break;
      case 'ArrowRight':
        location[modX] += 2;
        break;
    }
    console.log(`x2, y2: ${location.x2} ${location.y2} - px, py: ${location.px} ${location.py}`)
  }
  timeoutId = setTimeout(move, 50)
}

let mouseHasBeePressed = false;

if ((window.onmousedown === null || window.onmousedown === undefined) && window.location.hash !== '#notouch') {
  window.onpointerdown = (e) => {
    mouseX = e.x;
    mouseY = e.y;
    mousePressed();
  }
}

function mousePressed() {
  if ((!PLAYER || (PLAYER.stoped)) && !mouseHasBeePressed) {
    mouseHasBeePressed = true;
    LAST_TOUCH_TIMESTAMP = Date.now()
    console.log(LAST_TOUCH_TIMESTAMP)
    LOCATIONS.forEach((location, index) => {
      location.onMousePressed()
      if (location.clicked) {
        if (LOCATION_ACTIVE && LOCATION_ACTIVE.id !== location.id) {
          LOCATION_ACTIVE.onMousePressed()
          LOCATION_ACTIVE = null
        }
        LOCATION_ACTIVE = location
      }
      if (DEBUG && location.clicked) {
        dragging = true
        draggingLocation = location
      }
    });
    setTimeout(() => {
      mouseHasBeePressed = false;
    })
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
