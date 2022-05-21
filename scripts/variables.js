/** ---------------------------------------- */
/** -------------- GENERAL  ---------------- */
/** ---------------------------------------- */
var DEBUG = false;
var VIEWPORT_WIDTH = 1920; // window.innerWidth;
var VIEWPORT_HEIGHT = 1080; // window.innerHeight;
var HEIGHT_OFFSET;
var font;
var colorFondo = 33;
var booleanGuia = false;
var booleanTopo = false;
var booleanHUD = false;
var OPENED_POPUP = false;
var PLAYER;
var ISLA;
var MAP_CONTROLLER;
var SVG_OBJECT;
var PATH, PATH_DATA;
/** ---------------------------------------- */
/** -------------- EASY CAM ---------------- */
/** ---------------------------------------- */
var easycam; // EasyCam instance
var myEasyCam; // EasyCamHandler instance
/** ---------------------------------------- */
/** ------------- LOCATIONS ---------------- */
/** ---------------------------------------- */
var ISLA_CONFIG = {
  image: 'img_intro',
  text: 'La isla Huemul esta ubicada a 1,5km de la costa de la ciudad de S.C. de Bariloche. A principios de la decada del 50, se desarrollo "el proyecto huemul". and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
}
var LOCATIONS = []; // Location instances & container
var LocationTypes = {
  RADIOACTIVE: RadioactiveLocation,
  DEFAULT: Location
};
var LOCATIONS_CONFIG = [
  {
    id: 'muelle',
    type: "DEFAULT",
    config: {
      x: 342, y: 634, w: 40, h: 40,
      title: "El muelle",
      text: "El muelle es el principal acceso a la isla, en su momento era el punto de descarga de materiales de contruccion. Hoy en dia es utilizado por veleros y otras embarcaciones para llegar a la isla.",
      image: "imgMuelle",
      imagePopup: "imgMuelle",
      noCross: true
    }
  },
  {
    id: 'prefectura',
    type: "DEFAULT",
    config: {
      x: 428,
      y: 624,
      w: 40,
      h: 40,
      title: "Prefectura",
      text: "Lorem ipsum",
      image: "img_guardia_3d",
      crossPosition: 'bottom',
      noCross: true
    }
  },
  // FIXME: esta location va?
  // {
  //   id: 'casa-richter',
  //   type: "DEFAULT",
  //   config: {
  //     x: 450,
  //     y: 550,
  //     w: 40,
  //     h: 40,
  //     title: "Casa Richter",
  //     text: "Lorem ipsum",
  //     image: "img_casa_richter_3d",
  //     noCross: true
  //   }
  // },
  {
    id: 'gemelos',
    type: "DEFAULT",
    config: {
      x: 542,
      y: 558,
      w: 50,
      h: 90,
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
      x: 580,
      y: 590,
      w: 25,
      h: 40,
      title: "Lab. Blindado",
      text: "Lorem ipsum",
      image: "img_edif_blindado_3d",
      imagePopup: "img_laboblindado_arq",
      noCross: true
    }
  },
  {
    id: 'laboratorio-richter',
    type: "RADIOACTIVE",
    config: {
      x: 640,
      y: 420,
      w: 50,
      h: 50,
      title: "Lab. de Richter",
      text: "lorem ipsum",
      image: "img_laborichter_3d",
      imagePopup: "img_laborichter",
      crossPosition: 'bottom',
      dangerImage: 'danger_laborichter',
      noCross: true
    }
  },
  {
    id: 'usina',
    type: "DEFAULT",
    config: {
      x: 720,
      y: 360,
      w: 55,
      h: 55,
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
      x: 720,
      y: 505,
      w: 50,
      h: 50,
      title: "Audiotorio",
      text: "Texto auditorio",
      image: "img_auditorio_3d",
      imagePopup: "img_auditorio_arq",
      noCross: true
    }
  },
  {
    id: 'reactor-principal',
    type: "RADIOACTIVE",
    config: {
      x: 766,
      y: 482,
      w: 60,
      h: 60,
      title: "Reactor Principal",
      text: "El reactor es la estructura mas ambiociosa de toda la isla. En su interior se desarrollaria el principal experimento: la fusion nuclear.",
      image: "img_reactor_3d",
      imagePopup: "img_reactor_arq",
      dangerImage: 'danger_reactor_posta',
      noCross: true
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


