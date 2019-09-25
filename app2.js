/* eslint-disable linebreak-style */
window.addEventListener('load', () => {
  class Flipcard {
    constructor(el, ctrBtn, resetCount) {
      this.el = document.querySelectorAll(el);
      this.max = 0;
      this.newIdx = 0;
      this.resetCount = resetCount;
      this.maxCount = 0;
      this.repeat = undefined;
      this.flipBack = undefined;
      this.ctrBtn = ctrBtn;
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
      if (status === 'pause') {
        this.maxCount = 0;
        clearTimeout(this.flipBack);
        clearTimeout(this.repeat);
      } else {
        this.resume(this.newIdx, delay);
      }
    }

    resume(idx, delay) {
      if (!delay) delay = 1000;
      this.repeat = setTimeout(() => this.addEl(idx, delay), delay);
    }

    addEl(idx, delay) {
      if (!delay) delay = 1000;
      if (delay === 100 && !this.el[idx].classList.contains('flip')) delay = 1000;

      this.el[idx].classList.add('flip');
      this.flipBack = setTimeout(() => {
        this.el[idx].classList.remove('flip');
        this.newIdx += 1;
        if (this.newIdx === this.max) {
          this.newIdx = 0;
          this.maxCount += 1;
          if (this.maxCount === this.resetCount) {
            this.maxCount = 0;
            return this.btnStatus('pause');
          }
        }
        this.resume(this.newIdx);
      }, delay);
    }

    btnStatus(status) {
      if (status === 'pause') {
        this.ctrBtn.classList.remove('pause');
        this.ctrBtn.classList.add('start');
        this.ctrBtn.textContent = '카드 시작';
      } else {
        this.ctrBtn.classList.remove('start');
        this.ctrBtn.classList.add('pause');
        this.ctrBtn.textContent = '카드 정지';
      }
      this.pause(status, 100);
    }
  }
  const ctrBtn = document.getElementById('card_pause');
  const resetCount = 5;
  const reviewCard = new Flipcard('#wrap_card .card', ctrBtn, resetCount);
  ctrBtn.addEventListener('click', (e) => (e.currentTarget.classList.contains('pause') ? reviewCard.btnStatus('pause') : reviewCard.btnStatus('start')));
});
document.addEventListener('DOMContentLoad', () => {
  const toogleBox = document.querySelectorAll('.box_toggle .wrap_flex_btn .btn_flex');
  toogleBox.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.currentTarget.closest('.box_toggle').classList.toggle('show');
    });
  });
});
