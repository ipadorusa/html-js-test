window.addEventListener('load', () => {
    class flipCard {
        constructor(el) {
            this.el = document.querySelectorAll(el);
            this.max = 0;
            this.newIdx = 0;
            this.repeat = undefined;
            this.flipBack = undefined;
            this.init();
        }
        init() {
            this.max = this.el.length;
            this.start();
        }
        start() {
            this.addEl(this.newIdx);
        }
        pause(status, delay) {
            if(status === 'pause') {
                clearTimeout(this.flipBack);
                clearTimeout(this.repeat);
            }else {
                this.resume(this.newIdx, delay);
            }
        }
        resume(idx, delay) {
            if(!delay) delay = 1000;
            this.repeat = setTimeout(_ => this.addEl(idx, delay), delay);
        }
        addEl(idx, delay) {
            if(!delay) delay = 1000;
            this.el[idx].classList.add('flip');
            this.flipBack = setTimeout(_ => {
                this.el[idx].classList.remove('flip');
                this.newIdx+=1;
                if(this.newIdx === this.max) this.newIdx = 0;
                this.resume(this.newIdx);
            }, delay);
        }
        btnStatus(status) {
            if(status === 'pause') {
                ctrBtn.classList.remove('pause');
                ctrBtn.classList.add('start');
                ctrBtn.textContent = '카드 시작';
            }else {
                ctrBtn.classList.remove('start');
                ctrBtn.classList.add('pause');
                ctrBtn.textContent = '카드 정지';
            }
            this.pause(status, 100);
        }
    }
    const reviewCard = new flipCard('#wrap_card .card');
    const ctrBtn = document.getElementById('card_pause');
    ctrBtn.addEventListener('click', e => {
        e.currentTarget.classList.contains('pause') ? reviewCard.btnStatus('pause') : reviewCard.btnStatus('start')
    });
});
