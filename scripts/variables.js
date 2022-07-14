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
var INACTIVE_TIMEOUT = 1000 * 60 // 1000 milisegundos = 1 segundo * 60 = 1 minuto
var LAST_TOUCH_TIMESTAMP, INACTIVE_TIMEOUT_ID;

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
      imagePopup: "/assets/masimg/cruz.png",
      imageCrono: "img_crono_muelle",
      x2: 106, y2: 632,
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
      px: 450, py: 677,
      title: "Prefectura",
      text: "El edificio ubicado en la zona sur de la isla, que supo ser una guardia, es la única construcción que se puede ver desde la costa de Bariloche y la primera en observarse cuando se llega a la isla. En la actualidad se encuentra abandonada y saqueada, conservando aún en algunos sectores, las gráficas de prefectura (quien supervisó la isla hasta hace algunos años y luego la abandonó).",
      image: "img_guardia_3d",
      imagePopup: '/assets/imgs_HUDS/guardia_hud.jpg',
      imageCrono: "img_crono_prefectura",
      x2: 284, y2: 722,
      crossPosition: 'bottom',
      noCross: true,
      noFocus: true,
      data: {
        sector: 'Azul',
        superficie: '252',
        elevacion: '791',
        lat: "41° 6' 27.91''S",
        lon: "71° 23' 39.57''O"
      }
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
      imageCrono: "img_crono_huenul",
      x2: 656, y2: 738,
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
      px: 534,
      py: 686,
      w: 40,
      h: 40,
      title: "Casa Richter",
      text: "La casa de Ronald Richter recibía visitas diurnas y rara vez se usaba para pernoctar (el físico austriaco tenía su casa en la costa de Bariloche). En la actualidad se encuentra saqueada y baleada (pruebas militares). Es una casa de humilde tamaño rodeada por bastante vegetación.",
      image: "img_casa_richter_3d",
      imagePopup: '/assets/imgs_HUDS/casarichter_hud.jpg',
      imageCrono: "img_crono_richter",
      x2: 532, y2: 610,
      noCross: true,
      noFocus: true,
      data: {
        sector: 'Naranja',
        superficie: '30',
        elevacion: '820',
        lat: "a calcular",
        lon: "a calcular"
      }
    }
  },
  {
    id: 'gemelos',
    type: "DEFAULT",
    config: {
      x: 542,
      y: 558,
      px: 460,
      py: 554,
      w: 50,
      h: 90,
      title: "Lab. Gemelos",
      text: "Lorem ipsum",
      image: "img_gemelos_3d",
      imagePopup: "/assets/imgs_HUDS/gemelos_hud.jpg",
      imageCrono: "img_crono_gemelos",
      x2: 294, y2: 464,
      noCross: true,
      noFocus: true,
      data: {
        sector: 'Azul',
        superficie: '550',
        elevacion: '812',
        lat: "41° 6' 24.20''S",
        lon: "71°23' 41.76''O"
      }
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
      text: "El laboratorio de química del Dr. Ehrenberg se encuentra a un lado de los laboratorios gemelos, tiene un espesor de pared cercano a los 50 cm. Tiene la particularidad de conservar una puerta blindada de gran espesor, con una cerradura de alta complejidad. El laboratorio es uno de los pocos que se encontraba terminado y en funcionamiento.",
      image: "img_edif_blindado_3d",
      imageCrono: "img_crono_blindado",
      x2: 594,
      y2: 602,
      imagePopup: "/assets/imgs_HUDS/depoblindado_hud.jpg",
      noCross: true,
      noFocus: true,
      data: {
        sector: 'Azul',
        superficie: '312',
        elevacion: '816',
        lat: "41° 6' 23.31''S",
        lon: "71° 23' 41.77''O"
      }
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
      imagePopup: "/assets/imgs_HUDS/laborichter_hud.jpg",
      imageCrono: "img_crono_laborichter",
      x2: 450, y2: 320,
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
      text: "La usina es otro de los lugares particularmente interesantes debido a que conserva en su interior estructuras rectangulares parecidas a piletones, en donde aún crece vegetación, generando canteros naturales. Es un edificio con grandes ventanas, por las que a su vez ingresa más vegetación. Su uso estaba pensado para generar energía eléctrica con el fin de abastecer a toda la isla y sus dispositivos. ",
      image: "img_usina_3d",
      imagePopup: "/assets/imgs_HUDS/usina_hud.jpg",
      noCross: true,
      imageCrono: "img_crono_usina",
      x2: 758, y2: 374,
      data: {
        sector: 'Rojo',
        superficie: '374',
        elevacion: '835',
        lat: "41° 6' 19.98''S",
        lon: "71° 23' 50.92''O"
      }
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
      text: "El reactor (laboratorio 1) se encuentra en la parte más alta de la isla. Sus inmensas paredes de concreto y ladrillo fueron creadas para aislar la radiación (que nunca se generó). La construcción original fue demolida por orden de Richter. Luego se comenzó otra estructura pero bajo tierra, que finalmente se rellenó. Hoy permanecen imponentes, las paredes de una particular estructura, con altas paredes y sin techo, un espacio partido a la mitad por otra pared. Toda la estructura es atravesable a pie de un extremo al otro.",
      image: "img_reactor_3d",
      imagePopup: "/assets/imgs_HUDS/reactor_hud.jpg",
      imageCrono: "img_crono_reactor",
      x2: 794, y2: 392,
      dangerImage: 'danger_reactor_posta',
      noCross: true,
      data: {
        sector: 'Rojo',
        superficie: '594',
        elevacion: '838',
        lat: "41° 6' 18.40''S",
        lon: "71° 23' 46.27''O"
      }
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
      title: "Laboratorio 4",
      text: "El laboratorio 4 se encuentra al lado del reactor. Es uno de los laboratorios que aún conserva intacto su techo. Al ingresar se puede apreciar un amplio espacio sin divisiones. Luego de la caida de Perón en 1955, se pinto en una de sus paredes, un detalle del costo economico del proyecto Huemul, informacion que luego se tapo con negro en 1973, con la asuncion de Campora.",
      image: "img_auditorio_3d",
      imagePopup: "/assets/imgs_HUDS/labo4_hud.jpg",
      imageCrono: "img_crono_auditorio",
      x2: 642, y2: 548,
      noCross: true,
      data: {
        sector: 'Rojo',
        superficie: '462',
        elevacion: '838',
        lat: "41° 6' 19.36''S",
        lon: "71° 23' 44.99''O"
      }
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
      imageCrono: "img_crono_mirador",
      x2: 908, y2: 494,
      noCross: true
    }
  }
];