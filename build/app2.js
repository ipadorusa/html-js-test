'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.addEventListener('load', function () {
    var flipCard = function () {
        function flipCard(el) {
            _classCallCheck(this, flipCard);

            this.el = document.querySelectorAll(el);
            this.max = 0;
            this.newIdx = 0;
            this.repeat = undefined;
            this.flipBack = undefined;
            this.init();
        }

        _createClass(flipCard, [{
            key: 'init',
            value: function init() {
                this.max = this.el.length;
                this.start();
            }
        }, {
            key: 'start',
            value: function start() {
                this.addEl(this.newIdx);
            }
        }, {
            key: 'pause',
            value: function pause(status, delay) {
                if (status === 'pause') {
                    clearTimeout(this.flipBack);
                    clearTimeout(this.repeat);
                } else {
                    this.resume(this.newIdx, delay);
                }
            }
        }, {
            key: 'resume',
            value: function resume(idx, delay) {
                var _this = this;

                if (!delay) delay = 1000;
                this.repeat = setTimeout(function (_) {
                    return _this.addEl(idx, delay);
                }, delay);
            }
        }, {
            key: 'addEl',
            value: function addEl(idx, delay) {
                var _this2 = this;

                if (!delay) delay = 1000;
                this.el[idx].classList.add('flip');
                this.flipBack = setTimeout(function (_) {
                    _this2.el[idx].classList.remove('flip');
                    _this2.newIdx += 1;
                    if (_this2.newIdx === _this2.max) _this2.newIdx = 0;
                    _this2.resume(_this2.newIdx);
                }, delay);
            }
        }, {
            key: 'btnStatus',
            value: function btnStatus(status) {
                if (status === 'pause') {
                    ctrBtn.classList.remove('pause');
                    ctrBtn.classList.add('start');
                    ctrBtn.textContent = '카드 시작';
                } else {
                    ctrBtn.classList.remove('start');
                    ctrBtn.classList.add('pause');
                    ctrBtn.textContent = '카드 정지';
                }
                this.pause(status, 100);
            }
        }]);

        return flipCard;
    }();

    var reviewCard = new flipCard('#wrap_card .card');
    var ctrBtn = document.getElementById('card_pause');
    ctrBtn.addEventListener('click', function (e) {
        e.currentTarget.classList.contains('pause') ? reviewCard.btnStatus('pause') : reviewCard.btnStatus('start');
    });
});