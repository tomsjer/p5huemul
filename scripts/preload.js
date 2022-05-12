function preload() {
  console.log("preload");
  font = loadFont("assets/Bison-Bold.ttf");

  // img = loadImage('assets/fondos/mapa-bche-extendido-ok.jpg'); // Cargar la imagen
  imgGuia = loadImage("assets/fondos/islafondo.png"); // Cargar la imagen
  imgIslaVectorLiso = loadImage("assets/fondos/isla-base.png"); // Cargar la imagen
  imgGrillaMapa = loadImage("assets/masimg/grillamapa_cropped.png");
  // imgReactor = loadImage("assets/imgtargets/reactor-3d.png"); // Cargar la imagen
  // imgAuditorio = loadImage("assets/imgedificios/auditorio.png"); // Cargar la imagen
  imgCruz = loadImage("assets/masimg/cruz.png"); // Cargar la imagen
  imgTopografia = loadImage("assets/masimg/topografia.png"); // Cargar la imagen
  imgUsina = loadImage("assets/imgedificios/usina-transp.png"); // Cargar la imagen
  // imgReactorCenital = loadImage("assets/imgedificios/reactor-transp.png");
  imgMuelle = loadImage("assets/imgedificios/muelle-transp.png");
  // imgGemelas = loadImage("assets/imgedificios/gemelas-transp.png");
  // imgHuemulScan = loadImage("assets/masimg/huemulscan.png");

  // img_recorridomacro = loadImage('assets/masimg/recorridomacro.png'); // Cargar la imagen
  img_recorridopunteado = loadImage('assets/masimg/recorrido_punteado_solo.png'); 
  // img_brujula = loadImage('assets/masimg/brujula.png');
  img_intro = loadImage('assets/masimg/ilus_intro.png');

  // img edif 3D
  img_auditorio_3d = loadImage('assets/img_edif_3d/auditorio_3d.png'); 
  img_reactor_3d = loadImage('assets/img_edif_3d/reactor_3d.png'); 
  img_usina_3d = loadImage('assets/img_edif_3d/usina_3d.png'); 
  img_laborichter_3d = loadImage('assets/img_edif_3d/laborichter_3d.png'); 
  img_gemelos_3d = loadImage('assets/img_edif_3d/gemelos_3d.png');
  
  //bases danger 
  // danger_laborichter = loadImage('assets/img_dangers/danger_laborichter.png');
  // danger_gemelos = loadImage('assets/img_dangers/danger_gemelos.png');
  // danger_usina = loadImage('assets/img_dangers/danger_usina.png');
  // danger_reactor_posta = loadImage('assets/img_dangers/danger_reactor.png');
  // danger_auditorio = loadImage('assets/img_dangers/danger_auditorio.png');
  img_danger_edif_blindado = loadImage('assets/img_dangers/danger_edif_blindado.png');
  img_danger_guardia = loadImage('assets/img_dangers/danger_guardia.png');

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
