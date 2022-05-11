let myEasyCam
let unit
let booleanHUD = DEBUG = true
let font
let now
let prev
var VIEWPORT_WIDTH = 1920; // window.innerWidth;
var VIEWPORT_HEIGHT = 1080; // window.innerHeight;

function preload() {
    font = loadFont("assets/Bison-Bold.ttf");
}

function setup() {
    createCanvas(VIEWPORT_WIDTH, VIEWPORT_HEIGHT, WEBGL); // resolucion monitor
    myEasyCam = new EasyCamHandler({ distance: 750, center: [0, 0, 0] });
    unit = VIEWPORT_WIDTH / 10
    textFont(font);
    prev = performance.now()
}

function draw() {
    background('#222')
    
    // AHORA EL PUNTO DE ORIGEN ESTA EN EL LIMITE SUPERIOR IZQUIERDO DE LA IMAGEN
    translate(-width / 2, -height / 2, 0);

    stroke('#00f')
    noFill()
    rect(0,0,VIEWPORT_WIDTH, VIEWPORT_HEIGHT)
 
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            
            push();
            translate(unit * i, unit * j)
            fill('#f00')
            rect(0,0,10,10)
            pop();
        }
    }

    cursor(CROSS);
    push();
    let zoomMult = myEasyCam.easycam.getZoomMult()
    let x = map(mouseX, 0, width, - width * zoomMult, width * zoomMult)
    translate( x, mouseY);
    stroke('#f00')
    line(0, 0 - 10, 0, 0 + 10)
    line(0 - 10, 0, 0 + 10, 0)
    stroke('#fff')
    fill('#fff')
    textSize(20);
    text(x, 20, 0);
    // text(w, 20, 20);
    text(zoomMult, 20, 40);
    pop()

    now = performance.now()
    if (now - prev > 1000) {
        prev = now
        // console.log(myEasyCam.easycam)
    }

    myEasyCam.draw();
}