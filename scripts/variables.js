/** ---------------------------------------- */
/** -------------- GENERAL  ---------------- */
/** ---------------------------------------- */
var DEBUG = true;
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
var locations; // Location instances & container
var auditorio, cruz, imgIslaVectorLiso, topografia, gemelas, reactor;
// Imgs se instancian en preload.js
var imgGuia, huemulscan, imgGrillaMapa, imgMuelle, imgReactorCenital, imgUsina;

var LocationTypes = {
  RADIOACTIVE: RadioactiveLocation,
  DEFAULT: Location
};
var LOCATIONS_CONFIG = [
  {
    type: "RADIOACTIVE",
    config: {
      x: VIEWPORT_WIDTH * (640 / 1600),
      y: VIEWPORT_HEIGHT * (310 / 900),
      w: 70,
      h: 70,
      label: "Reactor Principal",
      text: "El reactor es la estructura mas ambiociosa de toda la isla. En su interior se desarrollaria el principal experimento: la fusion nuclear.",
      image: "imgReactorCenital",
      bounds: [250, -60, -160, -130, -80]
    }
  },
  {
    type: "DEFAULT",
    config: {
      x: VIEWPORT_WIDTH * (630 / 1600),
      y: VIEWPORT_HEIGHT * (150 / 900),
      w: 120,
      h: 120,
      label: "Usina",
      text: "Texto usina",
      image: "imgUsina",
      bounds: [250, -80, -200, -300, -250]
    }
  },
  {
    type: "DEFAULT",
    config: {
      x: VIEWPORT_WIDTH * (320 / 1600),
      y: VIEWPORT_HEIGHT * (660 / 900),
      w: 120,
      h: 120,
      label: "El muelle",
      text: "El muelle es el principal acceso a la isla, en su momento era el punto de descarga de materiales de contruccion. Hoy en dia es utilizado por veleros y otras embarcaciones para llegar a la isla.",
      image: "imgMuelle",
      bounds: [250, -80, -200, -300, -250]
    }
  }
];

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
