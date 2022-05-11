/** ---------------------------------------- */
/** -------------- GENERAL  ---------------- */
/** ---------------------------------------- */
var DEBUG = true;
var VIEWPORT_WIDTH = 1920; // window.innerWidth;
var VIEWPORT_HEIGHT = 1080; // window.innerHeight;
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
var locations = []; // Location instances & container
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
    id: 'muelle',
    type: "DEFAULT",
    config: {
      x: 356, y: 670, w: 120, h: 120,
      title: "El muelle",
      text: "El muelle es el principal acceso a la isla, en su momento era el punto de descarga de materiales de contruccion. Hoy en dia es utilizado por veleros y otras embarcaciones para llegar a la isla.",
      image: "imgMuelle",
      imagePopup: "imgMuelle"
    }
  },
  {
    id: 'prefectura',
    type: "DEFAULT",
    config: {
      x: 495,
      y: 640,
      w: 40,
      h: 40,
      title: "Prefectura",
      text: "Lorem ipsum",
      image: "img_danger_guardia",
      crossPosition: 'bottom'
    }
  },
  {
    id: 'casa-richter',
    type: "DEFAULT",
    config: {
      x: 450,
      y: 550,
      w: 40,
      h: 40,
      title: "Casa Richter",
      text: "Lorem ipsum",
      image: "img_danger_guardia",
      noCross: true
    }
  },
  {
    id: 'gemelos',
    type: "DEFAULT",
    config: {
      x: 595,
      y: 560,
      w: 40,
      h: 120,
      title: "Lab. Gemelos",
      text: "Lorem ipsum",
      image: "img_gemelos_3d",
      imagePopup: "img_gemelas_arq",
      noCross: true
    }
  },
  {
    id: 'blindado',
    type: "DEFAULT",
    config: {
      x: 636,
      y: 598,
      w: 25,
      h: 40,
      title: "Lab. Blindado",
      text: "Lorem ipsum",
      image: "img_danger_edif_blindado",
      imagePopup: "img_laboblindado_arq",
      noCross: true
    }
  },
  {
    id: 'laboratorio-richter',
    type: "RADIOACTIVE",
    config: {
      x: 726,
      y: 398,
      w: 60,
      h: 60,
      title: "Lab. de Richter",
      text: "lorem ipsum",
      image: "img_laborichter_3d",
      imagePopup: "img_laborichter",
      crossPosition: 'bottom'
    }
  },
  {
    id: 'reactor-principal',
    type: "RADIOACTIVE",
    config: {
      x: 850,
      y: 450,
      w: 65,
      h: 65,
      title: "Reactor Principal",
      text: "El reactor es la estructura mas ambiociosa de toda la isla. En su interior se desarrollaria el principal experimento: la fusion nuclear.",
      image: "img_reactor_3d",
      imagePopup: "img_reactor_arq",
      noCross: true
    }
  },
  {
    id: 'usina',
    type: "DEFAULT",
    config: {
      x: 820,
      y: 380,
      w: 65,
      h: 65,
      title: "Usina",
      text: "Texto usina",
      image: "img_usina_3d",
      imagePopup: "imgUsina",
      noCross: true
    }
  },
  { 
    id: 'auditorio',
    type: "DEFAULT",
    config: {
      x: 790,
      y: 492,
      w: 60,
      h: 60,
      title: "Audiotorio",
      text: "Texto auditorio",
      image: "img_auditorio_3d",
      imagePopup: "img_auditorio_arq"
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


