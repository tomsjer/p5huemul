function preload() {
  console.log("preload");
  font = loadFont("assets/Bison-Bold.ttf");

  // img = loadImage('assets/fondos/mapa-bche-extendido-ok.jpg');
  imgGuia = loadImage("assets/fondos/FONDO ISLA REFERENCIAS (1920X1080).png");
  imgIslaVectorLiso = loadImage("assets/fondos/FONDO ISLA  (1920X1080).png");
  imgGrillaMapa = loadImage("assets/masimg/grillamapa_cropped.png");
  // imgReactor = loadImage("assets/imgtargets/reactor-3d.png");
  // imgAuditorio = loadImage("assets/imgedificios/auditorio.png");
  imgCruz = loadImage("assets/masimg/cruz.png");
  imgTopografia = loadImage("assets/masimg/topografia.png");
  imgUsina = loadImage("assets/imgedificios/usina-transp.png");
  // imgReactorCenital = loadImage("assets/imgedificios/reactor-transp.png");
  imgMuelle = loadImage("assets/img_edif_3d/muelle_3d.png");
  // imgGemelas = loadImage("assets/imgedificios/gemelas-transp.png");
  // imgHuemulScan = loadImage("assets/masimg/huemulscan.png");
  imgLocationClicked = loadImage('assets/fondos/location-clicked.png');

  // img_recorridomacro = loadImage('assets/masimg/recorridomacro.png');
  // img_recorridopunteado = loadImage('assets/masimg/recorrido_punteado_solo.png'); 
  img_recorridopunteado = loadImage('assets/fondos/CAMINO_FONDO ISLA REFERENCIAS (1920X1080)-01.png'); 
  // img_brujula = loadImage('assets/masimg/brujula.png');
  img_intro = loadImage('assets/masimg/ilus_intro.png');

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
  // danger_gemelos = loadImage('assets/img_dangers/danger_gemelos.png');
  // danger_usina = loadImage('assets/img_dangers/danger_usina.png');
  danger_reactor_posta = loadImage('assets/img_dangers/danger_reactor.png');
  // danger_auditorio = loadImage('assets/img_dangers/danger_auditorio.png');
  // img_danger_edif_blindado = loadImage('assets/img_dangers/danger_edif_blindado.png');
  // img_danger_guardia = loadImage('assets/img_dangers/danger_guardia.png');

  //  ARQ
  // img_danger_reactor = loadImage('assets/masimg/base-danger-reactor.png');
  img_reactor_arq = loadImage('assets/masimg/reactor_arq.png');
  img_gemelas_arq = loadImage('assets/masimg/gemelas_arq.png');
  // img_danger_reactor_ok = loadImage('assets/masimg/reactor_danger.png');
  // img_usina_arq = loadImage('assets/masimg/usina_arq.png');
  img_laboblindado_arq = loadImage('assets/masimg/laboblindado_arq.png');
  img_auditorio_arq = loadImage('assets/masimg/auditorio_arq.png');
  img_laborichter = loadImage('assets/masimg/laborichter_arq.png');
}
