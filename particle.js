class Particle {

    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.history = [];
    }
  
    update() {
      this.x = this.x + random(-5, 5);
      this.y = this.y + random(-5, 5);
  
      let v = createVector(this.x, this.y);
  
      this.history.push(v);
      //console.log(this.history.length);
  
      if (this.history.length > 100) {
        this.history.splice(0, 1);
      }
    }
  
    show() {
      stroke(255);
      beginShape();
      for (let i = 1; i < this.history.length; i++) {
        let pos = this.history[i];
        noFill();
        vertex(pos.x, pos.y);
        endShape();
      }
  
      noStroke();
      fill(200,0,0);
      ellipse(this.x, this.y, 30, 30);
      
    }
  }
  
  