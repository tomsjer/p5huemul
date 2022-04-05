function draw() {
  background(colorFondo);

  // AHORA EL PUNTO DE ORIGEN ESTA EN EL LIMITE SUPERIOR IZQUIERDO DE LA IMAGEN
  translate(-width / 2, -height / 2, 0);
  // Mantengo la relación de aspecto en 16/9, tengo que compensar la diferencia en Y
  translate(0, HEIGHT_OFFSET);

  // UI para manejar colorFondo y topografía
  // updateSliders();

  ////////// FONDO MAPA!   //////
  image(imgGrillaMapa, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT); // fondo grilla
  image(imgIslaVectorLiso, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT); // imagen fondo gris illustrator referencia posiciones
  
  if (booleanGuia) {
    image(imgGuia, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT); // imagen fondo gris illustrator referencia posiciones
  }

  if (booleanTopo) {
    image(imgTopografia, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
  }

  if (DEBUG) {
    cursor(CROSS);
  } else {
    // saco al cursor para que no se note el desvio con respecto al objeto bubble
    // que se genera al hacer zoom
    noCursor();
  }

  ////////// Nombre de la isla Huemul   //////////////
  // FIXME: embeber en la imagen de fondo?
  fill(255);
  textSize(30);
  text("Isla Huemul", 1130, 100);
  
  // Actualizo Locations
  locations.forEach((location) => location.update());

  myEasyCam.draw();
  bubble.show();

}
