class Player {
    constructor(config) {
        this.items = config.items || [];
        this.time = config.time || 350;
        this.autopilotId = null;
        this.autopilotTime = config.autopilotTime || 10000;
        this.playing = false;
        this.stoped = true;
        this.onpause = false;
        this.reversePlay = false
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
                easycam.linearInterpolation = false
                easycam.reset(1000);
            }
            this.toolbar.container.classList.toggle('intro-visible')
        })
        document.addEventListener('player-start', () => this.play())
    }
    next() {
        clearTimeout(this.autopilotId)
        this.reversePlay = false
        this.play()
    }
    prev() {
        clearTimeout(this.autopilotId)
        this.reversePlay = true
        this.play()
    }
    play() {
        if (this.playing) return
        this.toolbar.container.classList.add('playing')
        this.playButton.classList.add('active')
        this.pauseButton.classList.remove('active')
        this.stopButton.classList.remove('active')
        if (LOCATION_ACTIVE) {
            LOCATION_ACTIVE.hide()
            LOCATION_ACTIVE = null
        }
        this.playing = true;
        this.stoped = false;
        this.onpause = false;
        if (this.index === 0 && !this.items[this.index].isCronoActive) {
            this.items[this.index].showCrono()
            setTimeout(() => {
                this.items[this.index].intersectsPlayer = true
                this.pause()
            }, 1000)
            return
        }
        easycam.linearInterpolation = true
        this.intervalId = setInterval(() => {
            if (!PATH_DATA.points[this.currentPathIndex]) return
            
            let { x, y } = PATH_DATA.points[this.currentPathIndex]

            this.items.forEach(location => {
                const d = dist(x, y, location.px, location.py)
                if (d < 10 && location.index > 0) {
                    this.index = location.index;
                    location.intersectsPlayer = true
                    location.showCrono()
                    this.pause()
                } else if (location.isCronoActive) {
                    location.intersectsPlayer = false
                    location.hideCrono()
                }
            })
            
            easycam.setState({
                ...easycam.state,
                center: [ x - width / 2, y - height / 2, 0],
                distance: 250
            }, this.time);

            this.currentPathIndex = this.reversePlay ? this.currentPathIndex - 1 : this.currentPathIndex + 1

            if (this.currentPathIndex === 0 || this.currentPathIndex === PATH_DATA.points.length) {
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
        clearTimeout(this.autopilotId);
    }
    stop() {
        if (this.stoped) return
        clearInterval(this.intervalId);
        clearTimeout(this.autopilotId)
        this.stoped = true;
        this.playing = false;
        this.onpause = false;
        this.stopButton.classList.add('active')
        this.playButton.classList.remove('active')
        this.pauseButton.classList.remove('active')
        this.toolbar.container.classList.remove('playing')
        this.items[this.index].hideCrono()
        this.index = 0;
        this.currentPathIndex = 0;
        easycam.linearInterpolation = false
        easycam.reset(1000);
    }
    setCurrentPathIndex() {
        this.currentPathIndex = PATH_DATA.points.findIndex(({x, y}) => {
            if (!this.items[this.index]) return 0
            return dist(x, y, this.items[this.index].px, this.items[this.index].py) < 10
        }) + 1
    }
}