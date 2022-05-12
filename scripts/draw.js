function drawBackground() {
  background(colorFondo);

  // AHORA EL PUNTO DE ORIGEN ESTA EN EL LIMITE SUPERIOR IZQUIERDO DE LA IMAGEN
  translate(-width / 2, -height / 2, 0);
  // Mantengo la relación de aspecto en 16/9, tengo que compensar la diferencia en Y
  // translate(0, HEIGHT_OFFSET);

  ////////// FONDO MAPA!   //////
  image(imgGrillaMapa, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT); // fondo grilla
  image(imgIslaVectorLiso, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT); // imagen fondo gris illustrator referencia posiciones
  image(img_recorridopunteado, 390,390, 850 ,800);
  
  if (booleanGuia) {
    image(imgGuia, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT); // imagen fondo gris illustrator referencia posiciones
  }

  if (booleanTopo) {
    image(imgTopografia, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
  }
}

function draw() {
  drawBackground()

  if (DEBUG) {
    cursor(CROSS);
  } else {
    // saco al cursor para que no se note el desvio con respecto al objeto bubble
    // que se genera al hacer zoom
    noCursor();
  }

  ////////// Nombre de la isla Huemul   //////////////
  // FIXME: embeber en la imagen de fondo?
  // fill(255);
  // textSize(30);
  // text("Isla Huemul", 1130, 100);
  
  // Actualizo Locations
  LOCATIONS.forEach((location) => location.update());
  // Dibujo en capas
  LOCATIONS.forEach((location) => location.draw());
  LOCATIONS.forEach((location) => location.drawHUD());
  
  // updatePoints();
  
  myEasyCam.draw();
  ISLA.draw();
  // Draw bubble on fixed screen and user screenPosition
  easycam.beginHUD();
  bubble.show();
  easycam.endHUD();

}