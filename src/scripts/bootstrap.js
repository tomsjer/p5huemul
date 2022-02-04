// Importo UNA SOLA VEZ la libreria p5.js
import * as V from "./variables";
require("p5");

// Divido las fases de la aplicación en archivos individuales
const preload = require("./preload");
const setup = require("./setup");
const draw = require("./draw");

// Exporto una IIFE, se ejecuta al ser importada
module.exports = (function bootstrap() {
  console.log("bootstrap");
  V.state.distance = 0;
  console.log(V.state);
  // Asigno las funciones globales a window
  window.preload = preload;
  window.setup = setup;
  window.draw = draw;
})();
