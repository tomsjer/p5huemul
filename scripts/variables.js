/** ---------------------------------------- */
/** -------------- GENERAL  ---------------- */
/** ---------------------------------------- */
var DEBUG = false;
var VIEWPORT_WIDTH = 1920; // window.innerWidth;
var VIEWPORT_HEIGHT = 1080; // window.innerHeight;
var HEIGHT_OFFSET;
var font;
var colorFondo = 33;
var booleanGrilla = true;
var booleanGuia = false;
var booleanTopo = false;
var booleanHUD = false;
var booleanPath = false;
var LOCATION_ACTIVE = null;
var PLAYER;
var ISLA;
var MAP_CONTROLLER;
var SVG_OBJECT;
var PATH, PATH_DATA;
var MOUSE_BUBBLE;

/** ---------------------------------------- */
/** -------------- EASY CAM ---------------- */
/** ---------------------------------------- */
var easycam; // EasyCam instance
var myEasyCam; // EasyCamHandler instance
/** ---------------------------------------- */
/** ------------- LOCATIONS ---------------- */
/** ---------------------------------------- */
var ISLA_CONFIG = {
  image: '/assets/masimg/ilus_intro.png',
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
      // Coordinates & dimensions
      x: 342, y: 634, w: 40, h: 40,
      // Coordinates for path hotspot
      px: 352, py: 614,
      title: "El muelle",
      text: "El muelle es el principal acceso a la isla, en su momento era el punto de descarga de materiales de contruccion. Hoy en dia es utilizado por veleros y otras embarcaciones para llegar a la isla.",
      image: "imgMuelle",
      imagePopup: "/assets/img_edif_3d/muelle_3d.png",
      noCross: true,
      data: {
        sector: 'Rojo',
        superficie: '594',
        elevacion: '838',
        lat: "41º 6' 18.40''S",
        lon: "71º 23' 46.27''O"
      }
    }
  },
  {
    id: 'prefectura',
    type: "DEFAULT",
    config: {
      x: 428, y: 624, w: 40, h: 40,
      px: 410, py: 640,
      title: "Prefectura",
      text: "Lorem ipsum",
      image: "img_guardia_3d",
      crossPosition: 'bottom',
      noCross: true
    }
  },
  {
    id: 'huenul',
    type: "DEFAULT",
    config: {
      x: 620,
      y: 750,
      px: 565,
      py: 757,
      w: 40,
      h: 40,
      title: "Cacique Huenul",
      text: "Aqui descansan los restos del Cacique Huenul,el último poblador de la isla. Lorem ipsum....",
      image: "imgCruz",
      imagePopup: "/assets/masimg/cruz.png",
      crossPosition: 'bottom',
      noCross: true
    }
  },
  {
    id: 'casa-richter',
    type: "DEFAULT",
    config: {
      x: 440,
      y: 545,
      px: 458,
      py: 554,
      w: 40,
      h: 40,
      title: "Casa Richter",
      text: "Lorem ipsum",
      image: "img_casa_richter_3d",
      noCross: true
    }
  },
  {
    id: 'gemelos',
    type: "DEFAULT",
    config: {
      x: 542,
      y: 558,
      px: 542,
      py: 558,
      w: 50,
      h: 90,
      title: "Lab. Gemelos",
      text: "Lorem ipsum",
      image: "img_gemelos_3d",
      imagePopup: "/assets/masimg/gemelas_arq.png",
      noCross: true
    }
  },
  {
    id: 'blindado',
    type: "DEFAULT",
    config: {
      x: 580,
      y: 590,
      px: 578,
      py: 564,
      w: 30,
      h: 35,
      title: "Lab. Blindado",
      text: "Lorem ipsum",
      image: "img_edif_blindado_3d",
      imagePopup: "/assets/masimg/laboblindado_arq.png",
      noCross: true
    }
  },
  {
    id: 'laboratorio-richter',
    type: "RADIOACTIVE",
    config: {
      x: 640,
      y: 420,
      px: 654,
      py: 435,
      w: 50,
      h: 50,
      title: "Laboratorio Richter",
      text: "El laboratorio de Ronal Richter es probablemente el mas interesante de toda la isla. Demolido por las fuerzas militares sin razon expresa, es aun recorrible en su interior a traves de un pasillo que atraviesa todo el largo del laboratioro. Los escombron yacen inmoviles en un enjambre de hierros y cemento. Se conservan aun los elementos originales del laboratorio en donde el físico Richter realizo experimentos concretos.",
      image: "img_laborichter_3d",
      imagePopup: "/assets/imgedificios/HUDSlaborichter.png",
      crossPosition: 'bottom',
      dangerImage: 'danger_laborichter',
      noCross: true,
      data: {
        sector: 'Rojo',
        superficie: '105',
        elevacion: '830',
        lat: "41º 6' 22.01''S",
        lon: "71º 23' 48.40''O"
      }
    }
  },
  {
    id: 'usina',
    type: "DEFAULT",
    config: {
      x: 720,
      y: 360,
      px: 715,
      py: 425,
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
    id: 'reactor-principal',
    type: "RADIOACTIVE",
    config: {
      x: 766,
      y: 482,
      px: 736,
      py: 462,
      w: 60,
      h: 60,
      title: "Reactor Principal",
      text: "El reactor es la estructura mas ambiociosa de toda la isla. En su interior se desarrollaria el principal experimento: la fusion nuclear.",
      image: "img_reactor_3d",
      imagePopup: "/assets/imgedificios/HUDSreactor.png",
      dangerImage: 'danger_reactor_posta',
      noCross: true
    }
  },
  { 
    id: 'auditorio',
    type: "DEFAULT",
    config: {
      x: 720,
      y: 505,
      px: 735,
      py: 505,
      w: 50,
      h: 50,
      title: "Audiotorio",
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti atque est dignissimos ipsum odit ut laudantium accusamus doloremque, consequuntur impedit, repellendus cupiditate voluptas totam voluptate repellat corrupti aliquam magni vel.",
      image: "img_auditorio_3d",
      imagePopup: "img_auditorio_arq",
      noCross: true
    }
  },
  {
    id: 'mirador',
    type: "DEFAULT",
    config: {
      x: 900,
      y: 480,
      px: 759,
      py: 548,
      w: 30,
      h: 30,
      title: "Mirador",
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti atque est dignissimos ipsum odit ut laudantium accusamus doloremque, consequuntur impedit, repellendus cupiditate voluptas totam voluptate repellat corrupti aliquam magni vel.",
      image: "imgCruz",
      imagePopup: "/assets/masimg/cruz.png",
      noCross: true
    }
  }
];