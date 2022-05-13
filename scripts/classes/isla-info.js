class IslaInfo {
    constructor(config) {
        this.image = config.image;
        this.text = config.text
        this.visible = false
        this.fade = 0
        this.fadeAmount = 20
        this.p = 50
        this.width = (VIEWPORT_WIDTH * .66) | 0
        this.height = (VIEWPORT_HEIGHT * .76) | 0
        this.x = (VIEWPORT_WIDTH - this.width ) / 2
        this.y = (VIEWPORT_HEIGHT - this.height) / 2
        this.imgW = (this.width * .6) | 0
        this.imgH = (this.height * .5) | 0
        this.imgX = this.x + (this.width - this.imgW ) / 2
        this.imgY = this.y + this.p
        this.toolbar = new Toolbar({
            id: 'info-button',
            buttons: [
                { label: '', handler: this.toggleVisible.bind(this), class: 'info' }
            ]
        })
    }
    toggleVisible() {
        // setTimeout(() => {
            this.visible = !this.visible
            this.toolbar.container.classList.toggle('intro-visible')
        // }, 500)
        const event = new CustomEvent('toggle-info', { detail: this.visible });
        document.dispatchEvent(event);
    }
    update() {
        if (this.visible && easycam.state.distance < 800) {
            this.toggleVisible()
            return
        }
        if (this.visible && this.fade < 255) {
            this.fade += this.fadeAmount
        } else if (!this.visible && this.fade > 0) {
            this.fade -= this.fadeAmount
        }
    }
    draw() {
        this.update();
        if (this.fade === 0) return
        // easycam.beginHUD();
       // push();
        noStroke();
        fill(0, this.fade - 30);
        rect(this.x, this.y, this.width, this.height)
        tint(255, this.fade);
        image(this.image, this.imgX, this.imgY, this.imgW, this.imgH);
        fill(255, this.fade);
        textSize(24);
        text(this.text, this.x + this.p, this.imgY + this.imgH + this.p, this.width - this.p * 2, this.height - this.imgH - this.p * 3)
       // pop();
        // easycam.endHUD();
    }
}