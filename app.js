window.addEventListener('load', () => {
    const ctrBtn = document.getElementById('card_pause');
    const cardList = document.querySelectorAll('#wrap_card .card');
    const stopCycle = 2;
    const cardMax = cardList.length;
    let count = 0;
    let checkCount = 0;
    let removeInterval = false;
    const cardRotate = () => {
        if (count === cardMax) {
            checkCount += 1;
            count = 0;
        }
        cardList[count].classList.add('flip');
        removeInterval = setTimeout(() => {
            cardList[count].classList.remove('flip');
            count += 1;
        }, 1000);
    };
    let startFlag = false;

    const resumeNgo = (count) => {
        /*if(count>0) {
            removeInterval = setTimeout(() => {
                cardList[count].classList.remove('flip');
                count += 1;
            }, 10);
        }*/
        cardRotate(count);
        ctrBtn.classList.remove('start');
        ctrBtn.classList.add('pause');
        ctrBtn.textContent = '카드 정지';
        checkCount = 0;
        startRote();
    };
    const startRote = (delay = 2000) => startFlag = setInterval(() => {
        cardRotate(count);
        ctrBtn.classList.remove('start');
        ctrBtn.classList.add('pause');
        ctrBtn.textContent = '카드 정지';
        checkCount = 0;
        if (checkCount === stopCycle - 1 && count === cardMax - 1) {
            stopRotate();
        }
    }, delay);
    const stopRotate = () => {
        if (startFlag !== false) {
            clearInterval(removeInterval);
            clearInterval(startFlag);
            ctrBtn.classList.remove('pause');
            ctrBtn.classList.add('start');
            ctrBtn.textContent = '카드 시작';
        }
    };
    resumeNgo();
    ctrBtn.addEventListener('click', (e) => (!e.currentTarget.classList.contains('pause') ? resumeNgo(count) : stopRotate()));
    const toogleBox = document.querySelectorAll('.box_toggle .wrap_flex_btn .btn_flex');
    toogleBox.forEach(el => {
        el.addEventListener('click', e => {
            e.currentTarget.closest('.box_toggle').classList.toggle('show');
        })
    });

});
