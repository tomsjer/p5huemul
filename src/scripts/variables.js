export let easycam;
export const state = {
  distance: 750,
  center: [0, 0, 0],
  rotation: [1, 0, 0, 0]
};
export const x = 50;
export const y = 50; // Posicion Hud State

export let img, huemulscan, grillamapa; // Declarar variable 'img'.
export let reactor;
export let bubble;
export let bubble1;
export let previousX;
export let previousY;
export const gray = 255;
export const vibrations = [];
export let font;
export let pg;
export let colorfondo;
export const textomuelle =
  "El muelle es el principal acceso a la isla, en su momento era el punto de descarga de materiales de contruccion. Hoy en dia es utilizado por veleros y otras embarcaciones para llegar a la isla.";
export const textoreactor =
  "El reactor es la estructura mas ambiociosa de toda la isla. En su interior se desarrollaria el principal experimento: la fusion nuclear.";
export let current;
export const opacidad = 255;
export const topo = 0;
export const booleantopo = false;

export let fade;
export const fadeAmount = 1;

// array
export const numPoints = 10; // how many points to keep?
export const points = []; // list of points

// perlin noise circle
export const phase = 0;
export const zoff = 0;
export let slider, slider2, slider3;
