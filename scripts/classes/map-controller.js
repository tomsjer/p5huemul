class MapController {
    constructor(config) {
        this.north = false
        this.scaleMin = 10
        this.scaleMax = 200
        this.currentScale = 200
        this.currentScaleWidth = 1
        this.toolbar = new Toolbar({
            id: 'map-controller',
            buttons: [
                { label: '', class: 'north', handler: this.toggleNorth.bind(this) }
            ]
        })
        this.themeToolbar = new Toolbar({
            id: 'map-theme',
            buttons: [
                { label: '', class: 'dark', handler: () => {
                    colorFondo = 22;
                    this.themeToolbar.buttons[0].elt.classList.add('active')
                    this.themeToolbar.buttons[1].elt.classList.remove('active')
                } },
                { label: '', class: 'light', handler: () => {
                    colorFondo = 200;
                    this.themeToolbar.buttons[0].elt.classList.remove('active')
                    this.themeToolbar.buttons[1].elt.classList.add('active')
                } },
                { label: '', class: 'layers', handler: () => {
                    booleanTopo = !booleanTopo
                    this.themeToolbar.buttons[2].elt.classList.toggle('active')
                } }
            ]
        })
    }
    toggleNorth() {
        this.north = !this.north
        this.toolbar.buttons[0].elt.classList.toggle('true-north')
        if (this.north) {
            booleanGrilla = false;
            easycam.setRotation([1, 0, 0, -1.5], 600)
        } else {
            easycam.setRotation([1, 0, 0, 0], 600)
            setTimeout(() => {
                booleanGrilla = true;
            }, 600)
        }
    }
    update() {
        let state = easycam.getState();
        let n = map(state.distance, 150, 1200, 10, 200);
        if (n < 100) {
            this.currentScaleWidth = map(n, 10, 100, 100, 25);
            this.currentScale = n < 10 ? 5 : Math.floor((n | 0) * 0.1) * 10
        } else {
            this.currentScale = n < 200 ? 100 : 200;
            this.currentScaleWidth = n < 200 ? map(n, 100, 200, 100, 50) : 100;
        }

    }
    draw() {
        this.update();
        textSize(20);
        fill(200);
        stroke(200);
        strokeWeight(2);
        text(nfs(this.currentScale, 1, 0) + 'm', 100, VIEWPORT_HEIGHT - 50);
        line(145, VIEWPORT_HEIGHT - 63, 145, VIEWPORT_HEIGHT - 52);
        rect(145, VIEWPORT_HEIGHT - 52, this.currentScaleWidth, 2);
        line(145 + this.currentScaleWidth, VIEWPORT_HEIGHT - 63, 145 + this.currentScaleWidth, VIEWPORT_HEIGHT - 52);
    }
}