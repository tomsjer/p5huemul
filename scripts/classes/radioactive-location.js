/**
 * Extiende la clase Location para dibujar un alo radioactivo
 */
class RadioactiveLocation extends Location {
  constructor(config) {
    super(config);
    this.phase = 0;
    this.zoff = 0;
  }
  draw() {
    super.draw();
    if (this.intersects()) {
      //////// PROBANDO PERLIN NOISE - RADIACION?? /////
      push();
      smooth();
      translate(this.x, this.y);
      // stroke(200, 0, 0);
      // strokeWeight(1);
      noStroke();
      fill(255, 0, 0, 100);
      curveDetail(200);
      beginShape();
      let noiseMax = 2;
      for (let a = 0; a < TWO_PI; a += radians(5)) {
        let xoff = map(cos(a + this.phase), -1, 1, 0, noiseMax);
        let yoff = map(sin(a + this.phase), -1, 1, 0, noiseMax);
        let r = map(noise(xoff, yoff, this.zoff), 0, 1, 35, 35 / 2);
        let x = r * cos(a);
        let y = r * sin(a);
        vertex(x, y);
      }
      endShape(CLOSE);

      this.phase += 0.003;
      this.zoff += 0.01;

      // fade in edificios
      // if (fade >= 0) {
      //   fadeAmount = 20;
      //   // if (fade>200) fadeAmount=0;
      //   fade += fadeAmount;
      //   opacidad = 0;
      // }
      pop();
    }
  }
}
