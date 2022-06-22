class IslaInfo {
    constructor(config) {
        this.image = config.image;
        this.text = config.text
        this.visible = false
        this.toolbar = new Toolbar({
            id: 'info-button',
            buttons: [
                { label: '', handler: this.toggleVisible.bind(this), class: 'info' }
            ]
        })
        this.createHTML()
    }
    createHTML() {
        this.container = document.createElement('div')
        this.container.classList.add('info-container')
        this.container.innerHTML = `
            <img src="${this.image}">
            <p>${this.text}</p>
            <button>COMENZAR</button>
        `
        const event = new CustomEvent('player-start');
        this.container.querySelector('button').addEventListener('click', () => {
            this.toggleVisible()
            document.dispatchEvent(event)
        })
        document.body.appendChild(this.container)
    }
    toggleVisible() {
        this.visible = !this.visible
        this.toolbar.container.classList.toggle('intro-visible')
        this.container.classList.toggle('intro-visible')
        const event = new CustomEvent('toggle-info', { detail: this.visible });
        document.dispatchEvent(event);
    }
    update() {
        if (this.visible && easycam.state.distance < 800) {
            this.toggleVisible()
            return
        }
    }
}