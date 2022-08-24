function drawBackground() {
  background(colorFondo);

  // AHORA EL PUNTO DE ORIGEN ESTA EN EL LIMITE SUPERIOR IZQUIERDO DE LA IMAGEN
  translate(-width / 2, -height / 2, 0);
  
  ////////// FONDO MAPA!   //////
  if(booleanGrilla) {
    image(imgGrillaMapa, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT); // fondo grilla
  }
  image(imgIslaVectorLiso, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT); // imagen fondo gris illustrator referencia posiciones
  image(img_recorridopunteado, 350, 415, 430, 400);
  
  if (booleanGuia) {
    image(imgGuia, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT); // imagen fondo gris illustrator referencia posiciones
  }

  if (booleanTopo) {
    image(imgTopografia, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
  }
}

function drawPath() {
  noFill();
  stroke(255,0,0);
  strokeWeight(2);
  beginShape();
  PATH_DATA.points.forEach(p => {
    curveVertex(p.x, p.y);
    ellipse(p.x, p.y, 10, 10);
  })
  endShape();
  fill(255, 0, 0)
  PATH_DATA.points.forEach(p => {
    text(nfs(p.x,1,2), p.x + 10, p.y + 10);
    text(nfs(p.y,1,2), p.x + 10, p.y + 20);
  })
}

function draw() {
  drawBackground()

  if (DEBUG) {
    cursor(CROSS);
  } else {
    // saco al cursor para que no se note el desvio con respecto al objeto MOUSE_BUBBLE
    // que se genera al hacer zoom
    noCursor();
  }

  if (booleanPath) {
    drawPath()
  }
  
  // Actualizo Locations
  LOCATIONS.forEach((location) => location.update());
  // Dibujo en capas
  LOCATIONS.forEach((location) => location.draw());

  // DRAW ON 2D FIXED POSITION
  easycam.beginHUD();

  myEasyCam.draw();
  MAP_CONTROLLER.draw();
  ISLA.update();
  // Draw MOUSE_BUBBLE on fixed screen and user screenPosition
  MOUSE_BUBBLE.update();
  
  easycam.endHUD();
}