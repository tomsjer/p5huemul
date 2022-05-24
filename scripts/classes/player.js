class Player {
    constructor(config) {
        this.items = config.items || [];
        this.time = config.time || 500;
        this.playing = false;
        this.stoped = true;
        this.index = 0;
        this.currentPathIndex = 0;
        this.intervalId = null;
        this.last = this.items.length - 1;
        this.toolbar = new Toolbar({
            id: 'player-buttons',
            buttons: [
                { label: '', handler: this.prev.bind(this), class: 'prev' },
                { label: '', handler: this.play.bind(this), class: 'play' },
                { label: '', handler: this.pause.bind(this), class: 'pause' },
                { label: '', handler: this.stop.bind(this), class: 'stop' },
                { label: '', handler: this.next.bind(this), class: 'next' }
            ]
        })
        this.playButton = this.toolbar.buttons[1].elt
        this.pauseButton = this.toolbar.buttons[2].elt
        document.addEventListener('toggle-info', (e) => {
            if (e.detail) {
                this.stop()
            }
            this.toolbar.container.classList.toggle('intro-visible')
        })

    }
    next() {
        if (this.items[this.index + 1]) {
            this.items[this.index].hide();
            this.index += 1;
            this.items[this.index].show();
        }
    }
    prev() {
        if (this.index >= 0 && this.items[this.index - 1]) {
            this.items[this.index].hide();
            this.index -= 1;
            this.items[this.index].show();
        }
    }
    play() {
        if (this.playing) return
        this.playButton.classList.add('active')
        this.pauseButton.classList.remove('active')
        this.playing = true;
        this.stoped = false;
        // this.items[this.index].show()
        this.intervalId = setInterval(() => {
            if (this.currentPathIndex === PATH_DATA.points.length - 1) {
                clearInterval(this.intervalId)
            }
            if (this.activeLocation) {
                this.index = this.activeLocation.index
                // this.pause()
                // this.activeLocation.show()
                // this.currentPathIndex += 1
                // return
            }
            easycam.setState({
                ...easycam.state,
                center: [ PATH_DATA.points[this.currentPathIndex].x - width / 2, PATH_DATA.points[this.currentPathIndex].y - height / 2, 0],
                distance: 250
            }, this.time);
            this.activeLocation = this.items.find(location => location.isActive)
            this.currentPathIndex += 1
        }, this.time)
        // this.intervalId = setInterval(() => {
        //     if (this.index === this.last) {
        //         this.stop()
        //         return
        //     }
        //     this.items[this.index].hide()
        //     this.index += 1;
        //     this.items[this.index].show()
        // }, this.time);
    }
    pause() {
        if (!this.playing && !this.stopped) return
        this.playing = false;
        this.playButton.classList.remove('active')
        this.pauseButton.classList.add('active')
        clearInterval(this.intervalId);
    }
    stop() {
        this.stoped = true;
        this.playing = false;
        this.playButton.classList.remove('active')
        clearInterval(this.intervalId);
        this.items[this.index].hide()
        this.index = 0;
        easycam.reset(1000);
    }
}