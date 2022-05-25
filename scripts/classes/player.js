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

        this.PATH_DATA = {
            ...PATH_DATA,
            points: PATH_DATA.points.map(p => ({ x: p.x - width / 2, y: p.y - height / 2 }))
        }
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
        easycam.linearInterpolation = true
        this.playButton.classList.add('active')
        this.pauseButton.classList.remove('active')
        this.playing = true;
        this.stoped = false;
        // this.items[this.index].show()
        this.intervalId = setInterval(() => {
            
            let { x, y } = this.PATH_DATA.points[this.currentPathIndex]

            this.items.forEach(location => {
                const d = dist(x, y, location.x, location.y)
                // console.log(d)
                if (d < 30 && !location.isActive) {
                    console.log(location.id, d)
                    location.show()
                    this.pause()
                } else if (location.isActive) {
                    location.hide()
                }
            })
            
            easycam.setState({
                ...easycam.state,
                center: [ x, y, 0],
                distance: 250
            }, this.time);
            
            if (this.currentPathIndex === this.PATH_DATA.points.length - 1) {
                this.stop()
            }

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
        clearInterval(this.intervalId);
        this.stoped = true;
        this.playing = false;
        this.playButton.classList.remove('active')
        this.items[this.index].hide()
        this.index = 0;
        this.currentPathIndex = 0;
        easycam.linearInterpolation = false
        easycam.reset(1000);
    }
}