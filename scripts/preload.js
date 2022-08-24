function preload() {
  console.log("preload");
  font = loadFont("assets/Bison-Bold.ttf");

  imgGuia = loadImage("assets/fondos/FONDO ISLA REFERENCIAS (1920X1080).png");
  imgIslaVectorLiso = loadImage("assets/fondos/FONDO ISLA  (1920X1080).png");
  imgGrillaMapa = loadImage("assets/masimg/grillamapa_cropped.png");
  imgCruz = loadImage("assets/masimg/cruz.png");
  imgTopografia = loadImage("assets/fondos/isla_huemul_topografia.png");
  imgUsina = loadImage("assets/imgedificios/usina-transp.png");
  imgMuelle = loadImage("assets/img_edif_3d/muelle_3d.png");
  imgLocationClicked = loadImage('assets/fondos/location-clicked.png');
  img_recorridopunteado = loadImage('assets/fondos/CAMINO_FONDO ISLA REFERENCIAS (1920X1080)-01.png'); 
  
  // img edif 3D
  img_auditorio_3d = loadImage('assets/img_edif_3d/auditorio_3d.png'); 
  img_reactor_3d = loadImage('assets/img_edif_3d/reactor_3d.png'); 
  img_usina_3d = loadImage('assets/img_edif_3d/usina_3d.png'); 
  img_laborichter_3d = loadImage('assets/img_edif_3d/laborichter_3d.png'); 
  img_gemelos_3d = loadImage('assets/img_edif_3d/gemelos_3d.png');
  img_guardia_3d = loadImage('assets/img_edif_3d/guardia_3d.png');
  img_casa_richter_3d = loadImage('assets/img_edif_3d/casarichter_3d.png');
  img_edif_blindado_3d = loadImage('assets/img_edif_3d/lab_quimica_3d-10.png');
  
  //bases danger 
  danger_laborichter = loadImage('assets/img_dangers/danger_laborichter.png');
  danger_reactor_posta = loadImage('assets/img_dangers/danger_reactor.png');
  
  //  ARQ
  img_reactor_arq = loadImage('assets/masimg/reactor_arq.png');
  img_gemelas_arq = loadImage('assets/masimg/gemelas_arq.png');
  img_laboblindado_arq = loadImage('assets/masimg/laboblindado_arq.png');
  img_auditorio_arq = loadImage('assets/masimg/auditorio_arq.png');
  img_laborichter = loadImage('assets/masimg/laborichter_arq.png');

  img_crono_muelle = loadImage('/assets/imgs_cronology/1_COMIENZO.png')
  img_crono_prefectura = loadImage('/assets/imgs_cronology/2_PRIORIDAD.png')
  img_crono_huenul = loadImage('/assets/imgs_cronology/3_TUMBA.png')
  img_crono_richter = loadImage('/assets/imgs_cronology/4_ASISTENTES.png')
  img_crono_gemelos = loadImage('/assets/imgs_cronology/5_VISITA.png')
  img_crono_blindado = loadImage('/assets/imgs_cronology/6_CNEA.png')
  img_crono_laborichter = loadImage('/assets/imgs_cronology/7_CONFLICTO.png')
  img_crono_usina = loadImage('/assets/imgs_cronology/8_REACCION.png')
  img_crono_reactor = loadImage('/assets/imgs_cronology/9_ANUNCIO.png')
  img_crono_auditorio = loadImage('/assets/imgs_cronology/10_SOSPECHAS.png')
  img_crono_mirador = loadImage('/assets/imgs_cronology/11_INTERVENCION.png')
}
