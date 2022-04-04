function draw() {
  background(colorFondo);

  // AHORA EL PUNTO DE ORIGEN ESTA EN EL LIMITE SUPERIOR IZQUIERDO DE LA IMAGEN
  translate(-width / 2, -height / 2, 0);
  // Mantengo la relación de aspecto en 16/9, tengo que compensar la diferencia en Y
  translate(0, HEIGHT_OFFSET);

  // UI para manejar colorFondo y topografía
  updateSliders();

  ////////// FONDO MAPA!   //////
  image(imgGrillaMapa, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT); // fondo grilla
  image(imgGuia, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT); // imagen fondo gris illustrator referencia posiciones
  image(imgIslaVectorLiso, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT); // imagen fondo gris illustrator referencia posiciones

  if (booleanTopo === true) {
    image(topografia, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
  }

  //noCursor(); //saco al cursor para que no se note el desvio con respecto al objeto bubble
  // que se genera al hacer zoom
  cursor(CROSS);

  let zoomMult = easycam.getZoomMult();
  bubble.x = mouseX; // * zoomMult;
  bubble.y = mouseY - HEIGHT_OFFSET; // * zoomMult;

  // image(cruz, 712, 298, 18, 18);
  // fill(255);
  // textSize(15);
  // text("Reactor Principal", 735, 312);

  ////////// Nombre de la isla Huemul   //////////////
  // fill(255);
  // textSize(30);
  // text("Isla Huemul", 1130, 100);
  reactorLocation.update();
  usinaLocation.update();

  myEasyCam.draw();
  bubble.show();

  // IMAGENES //-------------------------------------------------

  //    USINA   //
  // push();
  // tint(255, 255);
  // image(usina, 630, 150, 100, 100);
  // pop();

  // strokeWeight(2);
  // stroke(255, opacidad);
  // fill(255, 0, 0, 0);
  // rect(620, 140, 64, 55);

  // image(cruz, 690, 130, 18, 18);
  // fill(255);
  // textSize(15);
  // text("Usina", 710, 144);

  //   MUELLE   //

  // image(cruz, 360, 480, 18, 18);
  // fill(255);
  // textSize(15);
  // text("El muelle", 380, 494);

  //   REACTOR   //
  // push();
  // tint(255, fade), image(imgReactorCenital, 640, 310, 70, 70);
  // pop();

  // strokeWeight(2);
  // stroke(255, opacidad);
  // fill(255, 0, 0, 0);
  // rect(643, 318, 64, 55);

  //   AUDITORIO   //
  // push();
  //tint (255,fade),
  // image(auditorio, 590, 370, 100, 100);
  // pop();

  // strokeWeight(2);
  // stroke(255, opacidad);
  // fill(255, 0, 0, 0);
  // rect(643, 318, 64, 55);

  /*
  ///////   CURVE VERTEX RECORRIDO ISLA
  //noFill();
  strokeWeight(4);
  stroke(2);
  fill(255,0,0,0); //pongo transparencia 0 por q sino no detecta el fill
 beginShape();
 curveDetail(200);
curveVertex(328, 439);
curveVertex(368, 493);
curveVertex(414, 507);
curveVertex(447, 584);
curveVertex(515, 588);
curveVertex(400, 400);
curveVertex(540, 404);
curveVertex(550, 300);
curveVertex(700, 250);
curveVertex(600, 375);
curveVertex(730,450);

curveVertex(650,420);
endShape();
*/

  //let equis = dist(width/2, height/2, mouseX, mouseY);

  // translate(mouseX, mouseY);

  // bubble1.show();
  //bubble2.show();

  // easycam.pan(100, 200);
  //print(easycam.distance);
  //console.log(Dw.EasyCam.INFO);
  //easycam.setCenter(200,0.1);

  /*
  // USO EL OBJETO BUBBLE COMO CURSOR PARA SELECCIONAR DISTINTOS PUNTOS DEL MAPA

   if (bubble.intersects(bubble1)) {
  //   bubble.changeColor();
     
    easycam.beginHUD();
  noLights();
  //let state2 = easycam.getState();

  // Render the background box for the HUD
  noStroke();
  fill(0, 100);
  rect(850, 400, 500,200);
  //fill(50,50,52, 200); // a bit of transparency
 // rect(200,700,380,100);

image (huemulscan, 850, 250, 500, 500);

easycam.endHUD();

  }
*/

  //PRUEBA VENTANA
  /*
   pg.background(51);
  pg.noFill();
  pg.stroke(255);  
  pg.ellipse(mouseX - 150, mouseY - 75, 60, 60);
  //Draw the offscreen buffer to the screen with image()
  image(pg, 300, 500);
*/

  // ---------------------------------

  // PRUEBA NUEVO HUD -- EL MUELLE    //

  if (
    easycam.state.distance <= 250 &&
    easycam.state.center[0] <= -420 &&
    easycam.state.center[0] >= -520 &&
    easycam.state.center[1] >= 40 &&
    easycam.state.center[1] <= 120
  ) {
    // fade in edificios
    // if (fade >= 0) {
    //   fadeAmount = 20;
    //   // if (fade>200) fadeAmount=0;
    //   fade += fadeAmount;
    //   opacidad = 0;
    // }
    // push();
    // tint(255, 255);
    // image(muelle, 280, 480, 100, 100);
    // pop();
    // easycam.beginHUD();
    // noLights();
    // // Render the background box for the HUD
    // noStroke();
    // fill(0, 100);
    // rect(100, 400, 400, 400);
    // image(muelle, 170, 450, 300, 300);
    // fill(255);
    // textSize(15);
    // text(textomuelle, 120, 700, 350, 350);
    // easycam.endHUD();
  }

  // USINA HUD //
  if (
    easycam.state.distance <= 250 &&
    easycam.state.center[0] <= -80 &&
    easycam.state.center[0] >= -200 &&
    easycam.state.center[1] >= -300 &&
    easycam.state.center[1] <= -250
  ) {
    // easycam.beginHUD();
    // noLights();
    // // Render the background box for the HUD
    // noStroke();
    // fill(0, 100);
    // rect(100, 400, 400, 400);
    // //image(muelle, 170, 450, 300, 300);
    // fill(255, 0, 0);
    // ellipse(630, 150, 100, 100);
    // fill(255);
    // textSize(15);
    // // text(textomuelle, 120, 700, 350, 350);
    // easycam.endHUD();
  }

  ///////// REACTOR  ////////////

  if (
    easycam.state.distance <= 250 &&
    easycam.state.center[0] <= -60 &&
    easycam.state.center[0] >= -160 &&
    easycam.state.center[1] >= -130 &&
    easycam.state.center[1] <= -80
  ) {
    // //////// PROBANDO PERLIN NOISE - RADIACION?? /////
    // smooth();
    // translate(675, 345);
    // stroke(200, 0, 0);
    // strokeWeight(1);
    // //noFill();
    // fill(255, 0, 0, 50);
    // curveDetail(200);
    // beginShape();
    // let noiseMax = 2;
    // for (let a = 0; a < TWO_PI; a += radians(5)) {
    //   let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
    //   let yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
    //   let r = map(noise(xoff, yoff, zoff), 0, 1, 10, 10 / 2);
    //   let x = r * cos(a);
    //   let y = r * sin(a);
    //   vertex(x, y);
    // }
    // endShape(CLOSE);
    // phase += 0.003;
    // zoff += 0.01;
    // // fade in edificios
    // if (fade >= 0) {
    //   fadeAmount = 20;
    //   // if (fade>200) fadeAmount=0;
    //   fade += fadeAmount;
    //   opacidad = 0;
    // }
    // /////// HUD REACTOR    /////
    // easycam.beginHUD();
    // noLights();
    // // Render the background box for the HUD
    // noStroke();
    // fill(0, 200);
    // rect(100, 400, 400, 400);
    // fill(255);
    // textSize(15);
    // text(textoReactor, 120, 700, 350, 350);
    // easycam.endHUD();
  } else {
    fade = 0;
    opacidad = 255;
  }
}
