/**
 * Extiende la clase Location para dibujar un alo radioactivo
 */
class RadioactiveLocation extends Location {
  constructor(id, config, index) {
    super(id, config, index);
    this.dangerImage = config.dangerImage;
    this.phase = 0;
    this.zoff = 0;
  }
  draw() {
    if (this.fade > 0) {
      //////// PROBANDO PERLIN NOISE - RADIACION?? /////
      push();
      smooth();
      translate(this.x, this.y);
      // stroke(200, 0, 0);
      // strokeWeight(1);
      noStroke();
      fill(200, 50, 60, this.fade - 80);   // COLOR
      curveDetail(200);
      beginShape();
      let noiseMax = 2;
      for (let a = 0; a < TWO_PI; a += radians(5)) {
        let xoff = map(cos(a + this.phase), -1, 1, 0, noiseMax);
        let yoff = map(sin(a + this.phase), -1, 1, 0, noiseMax);
        let r = map(noise(xoff, yoff, this.zoff), 0, 1, this.r * 1.5, this.r * .6);
        let x = r * cos(a) - 5;
        let y = r * sin(a) - 5;
        vertex(x, y);
      }
      endShape(CLOSE);

      this.phase += 0.003;
      this.zoff += 0.01;

      tint(255, this.fade)
      image(this.dangerImage, -this.w/2, -this.h/2 - 2, this.w, this.h);
      pop();
    }
    super.draw();
  }
}
