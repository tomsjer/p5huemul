function draw() {
  // rotate(PI / 2);
  // background(colorfondo);
  //91 es el valor de gris que empata el fondo!

  // cambio el color del fondo
  let colorfondo = slider2.value();
  background(colorfondo);

  //AHORA EL PUNTO DE ORIGEN ESTA EN EL LIMITE SUPERIOR IZQUIERDO DE LA IMAGEN
  translate(-width / 2, -height / 2, 0);

  ////////// FONDO MAPA!   //////
  image(grillamapa, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT); // fondo grilla
  //image(img, 0, 0,VIEWPORT_WIDTH, VIEWPORT_HEIGHT);  // imagen fondo gris illustrator referencia posiciones
  image(islavectorliso, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT); // imagen fondo gris illustrator referencia posiciones

  // toogle topografico
  let topo = slider3.value();
  if (topo == 0) {
    booleantopo = false;
  } else if (topo == 1) {
    booleantopo = true;
  }

  if (booleantopo === true) {
    image(topografia, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
  }

  //noCursor(); //saco al cursor para que no se note el desvio con respecto al objeto bubble
  // que se genera al hacer zoom
  cursor(CROSS);

  let zoomMult = easycam.getZoomMult();
  bubble.x = mouseX * zoomMult;
  bubble.y = mouseY * zoomMult;

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

  // mapeo la distancia (zoom) para usarlo como una variable a usar
  let distanciacam = easycam.state.distance;
  let zoomopacity = map(distanciacam, 500, 1000, 255, 0);

  // easycam.setRotationScale(0); //BLOQUEAR ROTACION MAPA!
  // projection
  // var cam_dist = easycam.getDistance();
  // var oscale = cam_dist * 0.001;
  // var ox = (width / 2) * oscale;
  // var oy = (height / 2) * oscale;
  // ortho(-ox, +ox, -oy, +oy, -10000, 10000);
  // easycam.setPanScale(0.004 / sqrt(cam_dist));

  //Marco un punto en el origen de coordenadas nuevo
  noStroke();
  fill(255, 0, 0);
  ellipse(0, 0, 20, 20);

  image(cruz, 712, 298, 18, 18);
  fill(255);
  textSize(15);
  text("Reactor Principal", 735, 312);

  ////////// Nombre de la isla Huemul   //////////////
  fill(255);
  textSize(30);
  text("Isla Huemul", 1130, 100);

  // muestro posicion cursor
  textSize(25);
  text("X: " + int(mouseX), mouseX + 25, mouseY);
  text("Y: " + int(mouseY), mouseX + 25, mouseY + 25);

  // IMAGENES //-------------------------------------------------

  /*
//ISLA 2 con menos puntos
 //noFill();
 strokeWeight(4);
 noStroke();
stroke (0);
 //let fili = slider3.value();
 fill(200,0); //pongo transparencia 0 por q sino no detecta el fill
beginShape();

curveVertex (200, 300);
curveVertex (268, 247);
//curveVertex (283, 247);
curveVertex (363, 157);
curveVertex (652, 80);
curveVertex (897, 30);
curveVertex (1018, 71);
curveVertex (1283, 24);
//curveVertex (987, 753);
curveVertex (1408, 32);
curveVertex (1354, 32);
curveVertex ( 1419, 41);
  curveVertex ( 1397, 122);
    curveVertex ( 1368, 265);
      curveVertex ( 1274, 312);
        curveVertex ( 1190, 395);
          curveVertex ( 1213, 428);
            curveVertex ( 1140, 545);
              curveVertex ( 1078, 523);
                curveVertex ( 1003 ,634);
                curveVertex (966, 671);
                  curveVertex ( 879, 649);
                    curveVertex ( 667, 779);
                      curveVertex ( 584, 717);
                        curveVertex ( 528, 727);
                          curveVertex ( 394, 620);
                            curveVertex ( 356, 471);
                             // curveVertex ( 186, 361);
                              curveVertex ( 190, 357);
                              curveVertex ( 200, 400);

endShape(CLOSE);
*/

  //    USINA   //
  push();
  tint(255, 255);
  image(usina, 630, 150, 100, 100);
  pop();

  strokeWeight(2);
  stroke(255, opacidad);
  fill(255, 0, 0, 0);
  rect(620, 140, 64, 55);

  image(cruz, 690, 130, 18, 18);
  fill(255);
  textSize(15);
  text("Usina", 710, 144);

  //   MUELLE   //

  image(cruz, 360, 480, 18, 18);
  fill(255);
  textSize(15);
  text("El muelle", 380, 494);

  //   REACTOR   //
  push();
  tint(255, fade), image(reactorcenital, 640, 310, 70, 70);
  pop();

  strokeWeight(2);
  stroke(255, opacidad);
  fill(255, 0, 0, 0);
  rect(643, 318, 64, 55);

  //   AUDITORIO   //
  push();
  //tint (255,fade),
  image(auditorio, 590, 370, 100, 100);
  pop();

  strokeWeight(2);
  stroke(255, opacidad);
  fill(255, 0, 0, 0);
  rect(643, 318, 64, 55);

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
  bubble.show();
  bubble1.show();
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

  /*
easycam.attachMouseListeners(easycam);
//mouseDragLeft   : easycam.mouseDragPan.bind(easycam);
touchmove : function(event){
  event.preventDefault();
  event.stopPropagation();
  
  var mouse = easycam.mouse;
  
  if(mouse.istouchdown){
    
    mouse.evaluateTouches(event);  
    mouse.solveConstraint();

    if(event.touches.length === 1){
      mouse.touchmoveSingle();
    } else {
      mouse.touchmoveMulti();
      mouse.tapcount = 0;
    }
  }
}
*/

  // ---------------------------------

  //HUD CON DATOS DE LA POSICION DE LA CAMARA VIRTUAL
  // 2D screen-aligned rendering section
  easycam.beginHUD();
  noLights();
  let state = easycam.getState();

  // Render the background box for the HUD
  noStroke();
  fill(0);
  rect(x, y, 20, 75);
  fill(50, 50, 52, 200); // a bit of transparency
  rect(x + 20, y, 250, 75);

  // Render the labels
  textSize(20);
  fill(69, 161, 255);
  text("Distance:", x + 35, y + 25);
  text("Center:  ", x + 35, y + 25 + 20);
  // text("Rotation:",x+35,y+25+40);
  text("Framerate:", x + 35, y + 65);

  // Render the state numbers
  fill(69, 161, 255);
  text(nfs(state.distance, 1, 2), x + 125, y + 25);
  text(nfs(state.center, 1, 2), x + 125, y + 25 + 20);
  //  text(nfs(state.rotation, 1, 3),x+125,y+25+40);
  text(nfs(frameRate(), 1, 2), x + 125, y + 65);

  fill(255);
  textSize(15);
  text("Topografia", 103, 240);

  easycam.endHUD();

  // PRUEBA NUEVO HUD -- EL MUELLE    //

  if (
    easycam.state.distance <= 250 &&
    easycam.state.center[0] <= -420 &&
    easycam.state.center[0] >= -520 &&
    easycam.state.center[1] >= 40 &&
    easycam.state.center[1] <= 120
  ) {
    // fade in edificios
    if (fade >= 0) {
      fadeAmount = 20;
      // if (fade>200) fadeAmount=0;
      fade += fadeAmount;
      opacidad = 0;
    }

    push();
    tint(255, 255);
    image(muelle, 280, 480, 100, 100);
    pop();

    easycam.beginHUD();
    noLights();
    // Render the background box for the HUD
    noStroke();
    fill(0, 100);
    rect(100, 400, 400, 400);
    image(muelle, 170, 450, 300, 300);

    fill(255);
    textSize(15);
    text(textomuelle, 120, 700, 350, 350);

    easycam.endHUD();
  }

  // USINA HUD //
  if (
    easycam.state.distance <= 250 &&
    easycam.state.center[0] <= -80 &&
    easycam.state.center[0] >= -200 &&
    easycam.state.center[1] >= -300 &&
    easycam.state.center[1] <= -250
  ) {
    easycam.beginHUD();
    noLights();
    // Render the background box for the HUD
    noStroke();
    fill(0, 100);
    rect(100, 400, 400, 400);

    //image(muelle, 170, 450, 300, 300);
    fill(255, 0, 0);
    ellipse(630, 150, 100, 100);

    fill(255);
    textSize(15);
    // text(textomuelle, 120, 700, 350, 350);

    easycam.endHUD();
  }

  ///////// REACTOR  ////////////

  if (
    easycam.state.distance <= 250 &&
    easycam.state.center[0] <= -60 &&
    easycam.state.center[0] >= -160 &&
    easycam.state.center[1] >= -130 &&
    easycam.state.center[1] <= -80
  ) {
    //////// PROBANDO PERLIN NOISE - RADIACION?? /////
    smooth();
    translate(675, 345);
    stroke(200, 0, 0);
    strokeWeight(1);
    //noFill();
    fill(255, 0, 0, 50);
    curveDetail(200);
    beginShape();
    let noiseMax = 2;
    for (let a = 0; a < TWO_PI; a += radians(5)) {
      let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
      let yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
      let r = map(noise(xoff, yoff, zoff), 0, 1, 10, 10 / 2);
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
    }
    endShape(CLOSE);

    phase += 0.003;
    zoff += 0.01;

    // fade in edificios
    if (fade >= 0) {
      fadeAmount = 20;
      // if (fade>200) fadeAmount=0;
      fade += fadeAmount;
      opacidad = 0;
    }

    /////// HUD REACTOR    /////
    easycam.beginHUD();
    noLights();
    // Render the background box for the HUD
    noStroke();
    fill(0, 200);
    rect(100, 400, 400, 400);

    fill(255);
    textSize(15);
    text(textoreactor, 120, 700, 350, 350);

    easycam.endHUD();
  } else {
    fade = 0;
    opacidad = 255;
  }
  // Cuando la imagen este cargada complete va a ser true
  if (myImg.complete) {
    // drawingContext te da acceso al contexto del canvas para invocar metodos nativos de Canvas API, por ejemplo drawImage y le paso el SVG una vez que se cargo
    // drawingContext.drawImage(myImg, 0, 0, 400, 400);
  }

  /*
if (mouseIsPressed) {
	
  image(reactor, 760, 400,random (100),random (100));

}
*/

  /////////////////////// PRUEBAS PRINT

  //print(mouseX, mouseY, equis);
  //  print(easycam.state.center[0]);
}
