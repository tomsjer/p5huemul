class Player {
    constructor(config) {
        this.items = config.items || [];
        this.time = config.time || 350;
        this.playing = false;
        this.stoped = true;
        this.onpause = false;
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
        this.stopButton = this.toolbar.buttons[3].elt
        this.stopButton.classList.add('active')
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
            this.items[this.index].intersectsPlayer = false
            this.index += 1;
            this.items[this.index].show(true);
            this.items[this.index].intersectsPlayer = true
            this.setCurrentPathIndex()
        }
    }
    prev() {
        if (this.index >= 0 && this.items[this.index - 1]) {
            this.items[this.index].hide();
            this.items[this.index].intersectsPlayer = false
            this.index -= 1;
            this.items[this.index].show(true);
            this.items[this.index].intersectsPlayer = true
            this.setCurrentPathIndex()
        }
    }
    play() {
        if (this.playing) return
        this.playButton.classList.add('active')
        this.pauseButton.classList.remove('active')
        this.stopButton.classList.remove('active')
        this.playing = true;
        this.stoped = false;
        this.onpause = false;
        if (this.index === 0 && !this.items[this.index].isActive) {
            this.items[this.index].show(true)
            setTimeout(() => {
                this.items[this.index].intersectsPlayer = true
                this.pause()
            }, 1000)
            return
        }
        easycam.linearInterpolation = true
        this.intervalId = setInterval(() => {
            
            let { x, y } = PATH_DATA.points[this.currentPathIndex]

            this.items.forEach(location => {
                const d = dist(x, y, location.px, location.py)
                if (d < 10 && location.index > 0) {
                    this.index = location.index;
                    location.intersectsPlayer = true
                    location.show()
                    this.pause()
                } else if (location.isActive) {
                    location.intersectsPlayer = false
                    location.hide()
                }
            })
            
            easycam.setState({
                ...easycam.state,
                center: [ x - width / 2, y - height / 2, 0],
                distance: 250
            }, this.time);
            
            this.currentPathIndex += 1

            if (this.currentPathIndex === PATH_DATA.points.length) {
                this.stop()
            }
        
        }, this.time)
    }
    pause() {
        if (!this.playing && this.stopped) return
        easycam.linearInterpolation = false
        this.playing = false;
        this.onpause = true;
        this.playButton.classList.remove('active')
        this.stopButton.classList.remove('active')
        this.pauseButton.classList.add('active')
        clearInterval(this.intervalId);
    }
    stop() {
        clearInterval(this.intervalId);
        this.stoped = true;
        this.playing = false;
        this.onpause = false;
        this.stopButton.classList.add('active')
        this.playButton.classList.remove('active')
        this.pauseButton.classList.remove('active')
        this.items[this.index].hide()
        this.index = 0;
        this.currentPathIndex = 0;
        easycam.linearInterpolation = false
        easycam.reset(1000);
    }
    setCurrentPathIndex() {
        this.currentPathIndex = PATH_DATA.points.findIndex(({x, y}) => {
            return dist(x, y, this.items[this.index].px, this.items[this.index].py) < 10
        }) + 1
    }
}