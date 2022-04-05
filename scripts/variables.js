/** ---------------------------------------- */
/** -------------- GENERAL  ---------------- */
/** ---------------------------------------- */
var DEBUG = true;
var VIEWPORT_WIDTH = window.innerWidth;
var VIEWPORT_HEIGHT = window.innerHeight;
var HEIGHT_OFFSET;
var font;
var colorFondo = 33;
var booleanGuia = false;
var booleanTopo = false;
var booleanHUD = true;
/** ---------------------------------------- */
/** -------------- EASY CAM ---------------- */
/** ---------------------------------------- */
var easycam; // EasyCam instance
var myEasyCam; // EasyCamHandler instance

/** ---------------------------------------- */
/** ------------- LOCATIONS ---------------- */
/** ---------------------------------------- */
var locations; // Location instances & container
// Imgs se instancian en preload.js
var imgGuia,
  imgHuemulScan,
  imgGrillaMapa,
  imgMuelle,
  imgReactorCenital,
  imgUsina,
  imgIslaVectorLiso,
  imgGemelas,
  imgTopografia,
  imgCruz,
  imgReactor,
  imgAuditorio;

var LocationTypes = {
  RADIOACTIVE: RadioactiveLocation,
  DEFAULT: Location
};
var LOCATIONS_CONFIG = [
  {
    id: 'reactor-principal',
    type: "RADIOACTIVE",
    config: {
      // x: VIEWPORT_WIDTH * (640 / 1600),
      // y: VIEWPORT_HEIGHT * (310 / 900),
      x: VIEWPORT_WIDTH * 0.36,
      y: VIEWPORT_HEIGHT * 0.33,
      w: 70,
      h: 70,
      label: "Reactor Principal",
      text: "El reactor es la estructura mas ambiociosa de toda la isla. En su interior se desarrollaria el principal experimento: la fusion nuclear.",
      image: "imgReactorCenital"
    }
  },
  {
    id: 'usina',
    type: "DEFAULT",
    config: {
      // x: VIEWPORT_WIDTH * (630 / 1600),
      // y: VIEWPORT_HEIGHT * (150 / 900),
      x: VIEWPORT_WIDTH * 0.35,
      y: VIEWPORT_HEIGHT * 0.2,
      w: 120,
      h: 120,
      label: "Usina",
      text: "Texto usina",
      image: "imgUsina"
    }
  },
  {
    id: 'muelle',
    type: "DEFAULT",
    config: {
      // x: VIEWPORT_WIDTH * (320 / 1600),
      // y: VIEWPORT_HEIGHT * (660 / 900),
      x: VIEWPORT_WIDTH * 0.2,
      y: VIEWPORT_HEIGHT * 0.5,
      w: 120,
      h: 120,
      label: "El muelle",
      text: "El muelle es el principal acceso a la isla, en su momento era el punto de descarga de materiales de contruccion. Hoy en dia es utilizado por veleros y otras embarcaciones para llegar a la isla.",
      image: "imgMuelle"
    }
  },
  { 
    id: 'auditorio',
    type: "DEFAULT",
    config: {
      x: VIEWPORT_WIDTH * 0.35,
      y: VIEWPORT_HEIGHT * 0.55,
      w: 120,
      h: 120,
      label: "Audiotorio",
      text: "Texto auditorio",
      image: "imgAuditorio"
    }
  },
];

/** ---------------------------------------- */
/** ----------------- UI ------------------- */
/** ---------------------------------------- */
var bubble;
var bubble1;
// array
var numPoints = 0; // how many points to keep?
var points = []; // list of points


