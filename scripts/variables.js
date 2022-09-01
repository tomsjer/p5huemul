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
var titulo;

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
  
  text: 'La isla Huemul está ubicada a 1,5 km de la costa de la ciudad de S.C. de Bariloche, Río Negro. En 1949 se dio comienzo al llamado "proyecto Huemul", una iniciativa ambiciosa que tuvo como principal objetivo la obtención de energía atómica a través del proceso de fusión nuclear. El proyecto fue avalado directamente por el entonces presidente Juan Domingo Perón, quien designó al físico austríaco Ronald Richter como director del proyecto. La elección de esta locación tuvo que ver básicamente con 2 cuestiones: una poblacional y otra técnica. Por un lado Perón quería poblar rápidamente la Patagonia y por otro lado Richter consideraba que la abundante cantidad de agua que rodea la isla serviría para sus experimentos e incluso para contener un posible desborde de índole nuclear. El proyecto demandó la construcción de diversos galpones y grandes laboratorios, los cuales en su mayoría nunca llegaron a ser utilizados; dichas estructuras permanecen en la isla como monumentos de una historia no tan conocida.'
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
      x: 348, y: 632, w: 40, h: 40,
      // Coordinates for path hotspot
      px: 352, py: 614,
      title: "El muelle",
      text: "El muelle es el principal acceso a la isla, en su momento era el punto de descarga de materiales de construcción. Si bien hoy en dia es utilizado por veleros y otras embarcaciones para llegar a la isla, este no se encuenta habilitado para su uso.",
      image: "imgMuelle",
      imagePopup: "/assets/imgs_HUDS/muelle_hud.jpg",
      imageCrono: "img_crono_muelle",
      x2: 106, y2: 632,
      noCross: true,
      data: {
        sector: 'Azul',
        superficie: '80',
        elevacion: '790',
        lat: "41° 6' 30.75' 'S",
        lon: "71° 23' 39.44' 'O"
      }
    }
  },
  {
    id: 'prefectura',
    type: "DEFAULT",
    config: {
      x: 428, y: 624, w: 40, h: 40,
      px: 450, py: 677,
      title: "Guardia",
      text: "El edificio ubicado en la zona sur de la isla, que supo ser una guardia, es la única construcción que se puede ver desde la costa de Bariloche y la primera en observarse cuando se llega a la isla. En la actualidad se encuentra abandonada y saqueada, conservando aún en algunos sectores las gráficas de prefectura (quien supervisó la isla hasta hace algunos años y luego la abandonó).",
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
      x: 590,
      y: 750,
      px: 565,
      py: 757,
      w: 40,
      h: 40,
      title: "Tumba Cacique Güenul",
      text: "Aqui descansan los restos del Cacique Güenul, padre de Bernardino (último poblador de la isla). La familia Güenul se establecio en la isla en 1894; criaban animales domesticos como cabras y conejos. El apellido de la familia derivo en Huemul, y ya los pobladores de aquel momento llamaban a 'la isla de Huemul.' ",
      image: "imgCruz",
      imagePopup: "/assets/imgs_HUDS/tumba_hud.jpg",
      imageCrono: "img_crono_huenul",
      x2: 656, y2: 738,
      crossPosition: 'bottom',
      noCross: true,
      data: {
        sector: 'Azul',
        superficie: 'x',
        elevacion: '800',
        lat: "  41° 6'24.78' S",
        lon: " 71°23'35.39' O"
      }
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
      title: "Casa de Richter",
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
        lat: " 41° 6'27.26''S",
        lon: " 71°23'43.73''O"
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
      title: "Laboratorios Gemelos",
      text: "Los laboratorios gemelos (llamados así por su similitud y ubicación espejada), son 2 estructuras de gran tamaño, enfrentadas entre sí. El sendero que recorre la isla pasa entremedio de estos dos. Ambos están sin techo y con una increíble vegetación en su interior: los árboles crecen a una altura que supera los edificios.",
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
      title: "Laboratorio de química",
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
      title: "Laboratorio de Richter",
      text: "El laboratorio de Ronald Richter (laboratorio 2) es el más emblemático de la isla. Demolido en los años posteriores al cierre del proyecto por las fuerzas militares, es aún recorrible en su interior a través de un pasillo que atraviesa todo el laboratorio. Los escombros yacen inmóviles en un enjambre de hierros y cemento. Se conservan aún algunos de los elementos originales (bobinas, condensadores, etc.) del laboratorio en donde el físico Richter realizó experimentos concretos. ",
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
      text: "La usina es otro de los lugares particularmente interesantes debido a que conserva en su interior estructuras rectangulares parecidas a piletones, generando canteros naturales en donde crece vegetación. Es un edificio con grandes ventanas a traves de las cuales ingresa más vegetación. Su uso estaba pensado para generar energía eléctrica con el fin de abastecer a toda la isla y sus dispositivos. ",
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
      text: "El reactor (laboratorio 1) se encuentra en la parte más alta de la isla. Sus inmensas paredes de concreto y ladrillo fueron creadas para aislar la radiación (que nunca se generó). La construcción original fue demolida por orden de Richter. Luego se comenzó otra estructura pero bajo tierra, que finalmente se rellenó con concreto. Hoy permanece imponente, la estructura de protección, con altas paredes y sin techo, un espacio dividido a la mitad por otra pared. Toda la estructura es atravesable a pie de un extremo al otro. Aún conserva los llamativos tirantes de madera atravesando las paredes utilizados como andamios.",
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
      text: "El laboratorio 4 se encuentra al lado del reactor. Es uno de los laboratorios que aún conserva intacto su techo. Al ingresar se puede apreciar un amplio espacio sin divisiones. Luego de la caida de Perón en 1955, se pinto en una de sus paredes, un detalle del costo economico del proyecto Huemul, informacion que luego se tapo con negro en 1973, con la asuncion de Cámpora.",
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
      x: 870,
      y: 540,
      px: 759,
      py: 548,
      w: 30,
      h: 30,
      title: "Mirador",
      text: "El mirador concede una hermosa vista hacia el sur, donde se puede observar playa Bonita, el cerro Otto y hasta el centro de Bariloche. Se accede al mirador a traves de una hermosa escalera rodeada de vegetacion. Este es el ultimo punto del recorrido.",
      image: "img_mirador_3d",
      imagePopup: "/assets/imgs_HUDS/mirador_hud.jpg",
      imageCrono: "img_crono_mirador",
      x2: 908, y2: 494,
      noCross: true,
      data: {
        sector: 'Rojo',
        superficie: '18',
        elevacion: '850',
        lat: " 41° 6'17.27' 'S",
        lon: " 71°23'43.65' 'O"
      }
    }
  }
];