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

// window.addEventListener("resize", () => {
//   VIEWPORT_WIDTH = window.innerWidth;
//   VIEWPORT_HEIGHT = window.innerHeight;
// });

// document.body.addEventListener("click", console.log);
