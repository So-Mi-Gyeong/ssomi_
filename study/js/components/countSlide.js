/**
 * count slide
 * option
 * id: 'unique name'
 * value: 12345 //number
 */

export default class CountSlide {
    constructor(opt) {
        this.id = opt.id;
        this.el = document.querySelector('.mdl-count[data-id="'+ this.id +'"]');
        this.value = opt.value;
        this.items;
        this.h = this.el.offsetHeight;
        this.timer;
        this.init();
    }
    reset = (e) => {
        const items = this.el.querySelectorAll('.mdl-count-item');
        for (let item of items) {
            item.remove();
        }
        this.el.style.height = 'auto';
        clearTimeout(this.timer);
        this.timer  = setTimeout (this.init, 1000);
    }
    init() {
        let n = OcareUI.parts.comma(this.value);
        const len = n.length;
        let html_item = '';
        const html_number = '<span style="height:'+ this.h + 'px">0</span><span style="height:'+ this.h + 'px">1</span><span style="height:'+ this.h + 'px">2</span><span style="height:'+ this.h + 'px">3</span><span style="height:'+ this.h + 'px">4</span><span style="height:'+ this.h + 'px">5</span><span style="height:'+ this.h + 'px">6</span><span style="height:'+ this.h + 'px">7</span><span style="height:'+ this.h + 'px">8</span><span style="height:'+ this.h + 'px">9</span><span style="height:'+ this.h + 'px">0</span><span style="height:'+ this.h + 'px">1</span><span style="height:'+ this.h + 'px">2</span><span style="height:'+ this.h + 'px">3</span><span style="height:'+ this.h + 'px">4</span><span style="height:'+ this.h + 'px">5</span><span style="height:'+ this.h + 'px">6</span><span style="height:'+ this.h + 'px">7</span><span style="height:'+ this.h + 'px">8</span><span style="height:'+ this.h + 'px">9</span>';
        
        const html_comma = '<span style="height:'+ this.h + 'px">';

        this.el.style.height = this.h + 'px';

        for (let i = 0; i < len; i++) {
            const _n = (Number(n.substr(i, 1)));

            if (isNaN(_n)) {
                html_item += '<span class="mdl-count-item" style="height:'+ this.h + 'px"><span class="mdl-count-num">';
                html_item += html_comma + n.substr(i, 1) + '</span>';
            } else {
                html_item += '<span class="mdl-count-item" data-n="'+ n.substr(i, 1) +'"  style="height:'+ this.h + 'px"><span class="mdl-count-num">';
                html_item += html_number;
            }
            html_item += '</span></span>';
        }

        this.el.insertAdjacentHTML('beforeend', html_item);
        this.items = this.el.querySelectorAll('.mdl-count-item[data-n]');

        html_item = null;
    }
    act() {
        const len = this.items.length;
        let loop = 0;
        this.h = this.el.offsetHeight;

        const act = () => {
            const item = this.items[(len - 1) - loop];
            const n = Number(item.dataset.n);
            const _num = item.querySelector('.mdl-count-num');
            _num.style.transition = 'transform '+ 1.3 +'s cubic-bezier(.21,-0.04,.66,1.21)';
            let add = n < 7 ? 10 : 0;

            setTimeout(() => {
                _num.style.transform = 'translateY(-'+ (this.h * (n + add)) +'px)';
            },0);

            setTimeout(() => {
                loop = loop + 1;
                (loop < len) && act(); 
            }, 200);
        }
        act();
    }
}
