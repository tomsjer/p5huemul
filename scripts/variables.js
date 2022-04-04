/** ---------------------------------------- */
/** -------------- GENERAL  ---------------- */
/** ---------------------------------------- */
var DEBUG = false;
var VIEWPORT_WIDTH = window.innerWidth;
var VIEWPORT_HEIGHT = window.innerHeight;
var HEIGHT_OFFSET;
var font;
var colorFondo = "#333";

/** ---------------------------------------- */
/** -------------- EASY CAM ---------------- */
/** ---------------------------------------- */
var easycam; // EasyCam instance
var myEasyCam; // EasyCamHandler instance

/** ---------------------------------------- */
/** ------------- LOCATIONS ---------------- */
/** ---------------------------------------- */
var reactorLocation, usinaLocation, locations; // Location instances & container
var auditorio,
  cruz,
  imgIslaVectorLiso,
  muelle,
  topografia,
  gemelas,
  imgReactorCenital,
  imgUsina;
var imgGuia, huemulscan, imgGrillaMapa; // Declarar variable 'img'.
var reactor;
var textomuelle =
  "El muelle es el principal acceso a la isla, en su momento era el punto de descarga de materiales de contruccion. Hoy en dia es utilizado por veleros y otras embarcaciones para llegar a la isla.";
var textoReactor =
  "El reactor es la estructura mas ambiociosa de toda la isla. En su interior se desarrollaria el principal experimento: la fusion nuclear.";

/** ---------------------------------------- */
/** ----------------- UI ------------------- */
/** ---------------------------------------- */
var bubble;
var bubble1;
// array
var numPoints = 0; // how many points to keep?
var points = []; // list of points

var topo = 0;
var booleanTopo = true;
var slider, slider2, slider3;
