
document.addEventListener('DOMContentLoaded', () => {
  const ctrBtn = document.getElementById('card_pause');
  const cardList = document.querySelectorAll('.card');
  let count = 0;
  let checkCount = 0;

  const stopCycle = 2;
  const cardMax = cardList.length;
  const cardRotate = () => {
    if (count === cardMax) {
      checkCount++;
      count = 0;
    }
    cardList[count].classList.add('flip');
    setTimeout(function () {
      cardList[count].classList.remove('flip');
      count++;
    },1000);
  };
  let startFlag = false;
  const startRote = () => startFlag = setInterval(() => {
    cardRotate(count);
    ctrBtn.classList.remove('start');
    ctrBtn.classList.add('pause');
    ctrBtn.textContent = '카드 정지';
    checkCount = 0;
    if (checkCount === stopCycle-1 && count === cardMax-1) {
      stopRotate();
    }
  },2000);
  const stopRotate = () => {
    if (startFlag !== false) {
      ctrBtn.classList.remove('pause');
      ctrBtn.classList.add('start');
      ctrBtn.textContent = '카드 시작';
      clearInterval(startFlag);
    }
  };
  startRote();
  ctrBtn.addEventListener('click', e => !e.currentTarget.classList.contains('pause') ? startRote() : stopRotate());
});