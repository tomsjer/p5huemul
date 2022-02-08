var easycam;
var state = {
  distance: 750,
  center: [0, 0, 0],
  rotation: [1, 0, 0, 0]
};
var x = 50;
var y = 50; // Posicion Hud State
var auditorio,
  cruz,
  islavectorliso,
  muelle,
  reactorcenital,
  topografia,
  usina,
  gemelas,
  height,
  width;
var img, huemulscan, grillamapa; // Declarar variable 'img'.
var reactor;
var bubble;
var bubble1;
var previousX;
var previousY;
var gray = 255;
var vibrations = [];
var font;
var pg;
var colorfondo;
var textomuelle =
  "El muelle es el principal acceso a la isla, en su momento era el punto de descarga de materiales de contruccion. Hoy en dia es utilizado por veleros y otras embarcaciones para llegar a la isla.";
var textoreactor =
  "El reactor es la estructura mas ambiociosa de toda la isla. En su interior se desarrollaria el principal experimento: la fusion nuclear.";
var current;
var opacidad = 255;
var topo = 0;
var booleantopo = false;

var fade;
var fadeAmount = 1;

// array
var numPoints = 10; // how many points to keep?
var points = []; // list of points

// perlin noise circle
var phase = 0;
var zoff = 0;
var slider, slider2, slider3;

// JavaScript nativo
var myImg = new Image();
myImg.src = "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg";

var VIEWPORT_WIDTH = 1600; // window.innerWidth;
var VIEWPORT_HEIGHT = 800; //  window.innerHeight;
