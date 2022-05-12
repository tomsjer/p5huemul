class Toolbar {
    constructor(config) {
        this.position = config.position || { x: 50, y: 50 }
        this.container = document.createElement('div')
        this.container.classList.add('toolbar-container')
        this.container.id = config.id || `toolbar-${(Math.random() * 100) | 0}`
        this.buttons = config.buttons ? config.buttons.map(this.createButton.bind(this)) : []
        document.body.append(this.container)
    }
    createButton(option, index) {
        const button = createButton(option.label);
        const { x, y } = this.position;
        button.position(x * index, y);
        button.mousePressed(option.handler)
        button.elt.classList.add(option.class)
        this.container.append(button.elt)
        return button;
    }
}