// const vh = window.innerHeight * 0.01;
// document.documentElement.style.setProperty("--vh", `${vh}px`);
// window.addEventListener("resize", () => {
// 	let _vh = window.innerHeight * 0.01;
// 	document.documentElement.style.setProperty("--vh", `${_vh}px`);
// });

(() => {

	'use strict';

	const global = 'OcareUI';
	if (!window[global]) {
		window[global] = {};
	} 
	const Global = window[global];

	Global.exe = {};
	Global.callback = {
		tab: {},
		scroll: {},
		magazine(v) {
			const mgz_cover = document.querySelector('.ocr-magazine-cover');
			const mgz_cover_box = document.querySelector('.mdl-box');
			const mgz_tit = mgz_cover.querySelector('.ocr-magazine-cover-img');
			const n = document.querySelector('.ocr-body').scrollTop;
			const mgz_tit_top = Math.abs(mgz_cover_box.getBoundingClientRect().top);
			const breakpoint = window.innerHeight - 286;
			
			(mgz_cover_box.getBoundingClientRect().top < 0 && mgz_tit_top > breakpoint / 2) ? mgz_cover.classList.add('step2') : mgz_cover.classList.remove('step2'); 
			(mgz_cover_box.getBoundingClientRect().top < 0 && mgz_tit_top > breakpoint / 2) ? mgz_cover.classList.add('step3') : mgz_cover.classList.remove('step3'); 
			(mgz_cover_box.getBoundingClientRect().top < 0 && mgz_tit_top > breakpoint) ? mgz_cover.classList.add('step4') : mgz_cover.classList.remove('step4'); 
	
			n > 1 && v.ps === 'down' ? mgz_cover.classList.add('on') : '';
			n < 1 && v.ps === 'up' ? mgz_cover.classList.remove('on') : '';
	
			document.querySelector('.ocr-magazine-cover-bar').style.width = (document.querySelector('.ocr-body').scrollTop / (document.querySelector('.ocr-body-wrap').offsetHeight - document.querySelector('.ocr-body').offsetHeight) * 100 ) + '%';
		},
		magazineMain(v) {
			const breakpoint = 30;
	
			if (v.end > breakpoint) {
				const n = (v.end - breakpoint)  * 0.02;
				document.documentElement.style.setProperty('--opacity_0', n);
			}
		}
	};

	Global.state = {
		ing: false,
		breakPoint : 320,
		scroll: {
			y: 0,
			direction: 'down'
		},		
		effect: { //http://cubic-bezier.com - css easing effect
			linear: '0.250, 0.250, 0.750, 0.750',
			ease: '0.250, 0.100, 0.250, 1.000',
			easeIn: '0.420, 0.000, 1.000, 1.000',
			easeOut: '0.000, 0.000, 0.580, 1.000',
			easeInOut: '0.420, 0.000, 0.580, 1.000',
			easeInQuad: '0.550, 0.085, 0.680, 0.530',
			easeInCubic: '0.550, 0.055, 0.675, 0.190',
			easeInQuart: '0.895, 0.030, 0.685, 0.220',
			easeInQuint: '0.755, 0.050, 0.855, 0.060',
			easeInSine: '0.470, 0.000, 0.745, 0.715',
			easeInExpo: '0.950, 0.050, 0.795, 0.035',
			easeInCirc: '0.600, 0.040, 0.980, 0.335',
			easeInBack: '0.600, -0.280, 0.735, 0.045',
			easeOutQuad: '0.250, 0.460, 0.450, 0.940',
			easeOutCubic: '0.215, 0.610, 0.355, 1.000',
			easeOutQuart: '0.165, 0.840, 0.440, 1.000',
			easeOutQuint: '0.230, 1.000, 0.320, 1.000',
			easeOutSine: '0.390, 0.575, 0.565, 1.000',
			easeOutExpo: '0.190, 1.000, 0.220, 1.000',
			easeOutCirc: '0.075, 0.820, 0.165, 1.000',
			easeOutBack: '0.175, 0.885, 0.320, 1.275',
			easeInOutQuad: '0.455, 0.030, 0.515, 0.955',
			easeInOutCubic: '0.645, 0.045, 0.355, 1.000',
			easeInOutQuart: '0.770, 0.000, 0.175, 1.000',
			easeInOutQuint: '0.860, 0.000, 0.070, 1.000',
			easeInOutSine: '0.445, 0.050, 0.550, 0.950',
			easeInOutExpo: '1.000, 0.000, 0.000, 1.000',
			easeInOutCirc: '0.785, 0.135, 0.150, 0.860',
			easeInOutBack: '0.680, -0.550, 0.265, 1.550'
		}
	}

	Global.scroll = {
		option: {
			selector: null,
			area: null
		},

		init(option) {
			const opt = Object.assign({}, this.option, option);
			const el_area = (opt.area === undefined || opt.area === null) ? window : opt.area;
			const el_parallax = (opt.selector === undefined || opt.selector === null) ? document.querySelector('.ui-scrollevent') : opt.selector;
			const el_items = el_parallax.querySelectorAll('.ui-scrollevent-item');
			let prev_st = el_parallax.scrollTop;
			let ps;

			const act = () => {
				const isWin = el_area === window;
				const areaH = isWin ? window.innerHeight : el_area.offsetHeight;
				let areaT = 0;

				for (let i = 0, len = el_items.length; i < len; i++) {
					const that = el_items[i];
					const callbackname = that.dataset.act;
					const h = Math.floor(that.offsetHeight);
					!isWin ? areaT = el_area.getBoundingClientRect().top : '';
					const _start = Math.floor(that.getBoundingClientRect().top) - (areaT + el_area.scrollTop); 
					let start = Math.floor(that.getBoundingClientRect().top) - areaH;
					let _n = 0;
					let _per_s = 0;
					let _per_e = 0;
	
					if (start < 0) {
						_n = Math.abs(start);
						_per_s = Math.round(_n / areaH * 100);
						_per_s = _per_s >= 100 ? 100 : _per_s;
					} else {
						_n = 0;
						_per_s = 0;
					}
	
					if (start + areaH < 0) {
						_n = Math.abs(start + areaH);
						_per_e = Math.round(_n / h * 100);
						_per_e = _per_e >= 100 ? 100 : _per_e;
					} else {
						_n = 0;
						_per_e = 0;
					}

					that.setAttribute('data-scrollevent-s', _per_s);
					that.setAttribute('data-scrollevent-e', _per_e);


					if (prev_st < el_parallax.scrollTop) {
						ps = 'down';
					} else if (prev_st > el_parallax.scrollTop) {
						ps ='up';
					}

					prev_st = el_parallax.scrollTop;

					if (!!Global.callback[callbackname]) {
						Global.callback[callbackname]({
							el: that,
							name: callbackname,
							px: _n,
							start: _per_s,
							end: _per_e,
							ps: ps
						});
					}
				}
			}
	
			act();
			el_area.addEventListener('scroll', act);
		}
	}
	
	Global.include = {
		init(opt) {
			const selector = document.querySelector('[data-id="'+ opt.id +'"]');
			const src = opt.src;
			const insert = !!opt.insert ? opt.insert : false;

			if (!!selector && !!src) {
				fetch(src).then(response => response.text()).then(data => {
					if (insert) {
						selector.insertAdjacentHTML('afterbegin', data);
					} else {
						selector.innerHTML = data;
					}
					
					(!!selector.dataset.title && !!selector.querySelector('.ocr-header-tit')) && selector.querySelector('.ocr-header-tit').setAttribute('aria-label', selector.dataset.title)
				});
			}
		}	
	}

	Global.page = {
		current (v) {
			const selector = document.querySelector('.ocr-header[data-id="header"]');
			const selector_footer = document.querySelector('.ocr-footer[data-id="footer"]');
			let title = selector.dataset.title;

			if (!!v) {
				title = v;
				selector.dataset.title = v;
			} 

			selector.querySelector('.ocr-header-tit').setAttribute('aria-label', title);
			
			if (!!selector_footer) {
				const selector_footer_selected = selector_footer.querySelector('.ocr-nav-btn[aria-selected="true"]');
				selector_footer_selected && selector_footer_selected.setAttribute('aria-selected', false);

				switch (title) {
					case 'ocare' : selector_footer.querySelector('.ocr-nav-btn[data-nav="ocare"]').setAttribute('aria-selected', true); break;
					case '타.자.기' : selector_footer.querySelector('.ocr-nav-btn[data-nav="test"]').setAttribute('aria-selected', true); break;
					case '마이헬스' : selector_footer.querySelector('.ocr-nav-btn[data-nav="health"]').setAttribute('aria-selected', true); break;
					case '스토어' : selector_footer.querySelector('.ocr-nav-btn[data-nav="store"]').setAttribute('aria-selected', true); break;
					case '이벤트' : selector_footer.querySelector('.ocr-nav-btn[data-nav="event"]').setAttribute('aria-selected', true); break;
				}
			}
		}
	}

	Global.toggle = {
		init() {
			const toggleBtns = document.querySelectorAll('[data-toggle-button]');

			for (let btn of toggleBtns) {
				btn.addEventListener('click', this.act);
			}
		},
		act() {
			const name = this.dataset.toggleButton;
			const pressed = this.getAttribute('aria-pressed');
			const target = document.querySelector('[data-toggle-target="'+ name +'"]');
			const isExpanded = target.getAttribute('aria-expanded');

			pressed === 'false' ? this.setAttribute('aria-pressed', 'true') : this.setAttribute('aria-pressed', 'false');
			target.setAttribute('aria-expanded', isExpanded === 'false' ? 'true' : 'false');
		}
	}

	Global.modal = {
		show (v) {
			const el_modal = document.querySelector('.mdl-modal[data-id="'+ v +'"]');
			const el_close = el_modal.querySelector('.mdl-modal-close');

			el_modal.setAttribute('aria-hidden', 'false');
			!!el_close && el_close.focus();
		},
		hide (v) {
			const el_modal = document.querySelector('.mdl-modal[data-id="'+ v +'"]');
			const el_modal_wrap = el_modal.querySelector('.mdl-modal-wrap');
			
			const end = () => {
				el_modal_wrap.removeEventListener('animationend', end);
				el_modal.removeAttribute('aria-hidden');
			}

			el_modal.setAttribute('aria-hidden', 'true');
			el_modal_wrap.addEventListener('animationend', end);
		}
	}

	Global.loading = {
		init() {
			Global.exe.loadingAni = new AniBgMake({
                id: 'loading',
                fps: 2,
                loop: true,
                speed: 220,
                delay: 200 //ms
            });

			const step = document.querySelector('.ocr-bakery-loading-step');
			const step_li = step.querySelectorAll('li');
			const len = step_li.length;
			let i = 0;

			const act = ()=> {
				i >= len ? i = 0 : '';
				step.querySelector('li.on').classList.remove('on');
				step_li[i].classList.add('on');

				i = i + 1;
				if (i < 3) {
					setTimeout(act, 1000);
				}
				
			}
			act();
		}
	}

	Global.allMenuScroll = {
		timer : {},
		init() {
			Global.scroll.init({
				area: document.querySelector('.ui-scrollevent')
			});

			const el_tab = document.querySelector('.mdl-tab');
			let check_tabfixed;

			Global.callback.tabfixed = (v) => {
				const st = document.querySelector('.ui-scrollevent').scrollTop;
				
				if (155 <= st) {
					el_tab.dataset.fix = 'true';
				} else {
					el_tab.dataset.fix = 'false';
				}
				check_tabfixed = v.start;
			}
			
			Global.callback.myhealth = (v) => {
				this.scrollTabSelected(v);
			}
			Global.callback.service = (v) => {
				this.scrollTabSelected(v);
			}
			Global.callback.store = (v) => {
				this.scrollTabSelected(v);
			}
			Global.callback.notice = (v) => {
				this.scrollTabSelected(v);
			}
			Global.callback.helpdesk = (v) => {
				this.scrollTabSelected(v);
			}
			//스크롤 이벤트 탭선택
		
			//탭
			Global.exe.menuTab = new OcareTab({
				tab: 'menuTab', //data-tab
				current: 'menuTab_1', //data-id
				async: true
			});
		
			//탭 클릭시 스크롤 이동
			Global.exe.menuScrollevent = new Scrollevent({
				add: -56, 
				ps: 'y'
			});
		},
		scrollTabSelected (v)  {
			const that = document.querySelector('.ui-scrollevent-item[data-name="'+ v.name +'"]');
			const wrap = document.querySelector('.ui-scrollevent');
			const wraps = wrap.querySelector('.ui-scrollevent-wrap');
			const list = wrap.querySelector('.ocr-menulist');
			const limit = 100 - Math.floor(122 / (window.innerHeight - 56) * 100)
			const isEnd = (wraps.offsetHeight - 10) < Math.ceil(wrap.scrollTop + wrap.offsetHeight);
			const tabwrap = wrap.querySelector('.mdl-tab-wrap');
			let btn;

			if (!OcareUI.state.ing) {
				const selected = document.querySelector('.ui-scrollevent-btn[aria-selected="true"]');
				let name = v.name;

				if (v.start >= limit && v.end <= 0) {
					btn = document.querySelector('.ui-scrollevent-btn[data-name="'+ name +'"]');
					selected && selected.setAttribute('aria-selected', false);
					btn.setAttribute('aria-selected', true);

					tabwrap.scrollTo({	
						left: (tabwrap.offsetWidth / 2 - (tabwrap.scrollLeft + btn.getBoundingClientRect().left) - (btn.offsetWidth / 2)) * -1,
						behavior: 'smooth'
					});
				} else {
					if (isEnd) {
						btn = document.querySelector('.ui-scrollevent-btn[data-name="helpdesk"]');
						selected && selected.setAttribute('aria-selected', false);
						btn.setAttribute('aria-selected', true);

						tabwrap.scrollTo({	
							left: (tabwrap.offsetWidth / 2 - (tabwrap.scrollLeft + btn.getBoundingClientRect().left) - (btn.offsetWidth / 2)) * -1,
							behavior: 'smooth'
						});
					}
				}
				
			} else {
				clearTimeout(Global.allMenuScroll.timer);
				Global.allMenuScroll.timer = setTimeout(() => {
					OcareUI.state.ing = false;
				},300);
			}
		}
	}

	Global.toast = {
		timer : null,
		/**
		 * options 
		 * delay: short[2s] | long[3.5s]
		 * status: assertive[중요도 높은 경우] | polite[중요도가 낮은 경우] | off[default]
		 */
		options : {
			delay: 'short',
			classname : '',
			conts: '',
			status: 'off',
			callback : false,
		},
		show (option) {
			const opt = Object.assign({}, this.options, option);
			const delay = opt.delay;
			const classname = opt.classname;
			const callback = opt.callback;
			const conts = opt.conts;
			const status = opt.status;
			const el_body = document.querySelector('body');

			let toast = '<div class="ui-toast mdl-toast'+ classname +'" aria-live="'+ status +'">'+ conts +'</div>';
			let time = (delay === 'short') ? 2000 : 3500;

			const act2 = (e) => {
				const that = e.currentTarget;

				that.removeEventListener('animationend', act2);
				that.remove();
				el_body.classList.remove('ui-toast-hide');
				!!callback && callback();
			}
			const hide = (e) => {
				const el_toast2 = document.querySelector('.ui-toast');
				
				clearTimeout(Global.toast.timer);
				el_body.classList.add('ui-toast-hide');
				el_body.classList.remove('ui-toast-show');
				el_toast2.addEventListener('animationend', act2);
			}
			const act = (e) => {
				const that = e.currentTarget;

				that.removeEventListener('animationend', act);
				Global.toast.timer = setTimeout(hide, time);
			}
			
			if (!!document.querySelector('.ui-toast-hide') || !!document.querySelector('.ui-toast-show')) {
				clearTimeout(Global.toast.timer);
				el_body.classList.remove('ui-toast-show');
				el_body.classList.remove('ui-toast-hide');
				document.querySelector('.ui-toast').removeEventListener('animationend', act);
				document.querySelector('.ui-toast').remove();
			} 

			el_body.insertAdjacentHTML('beforeend', toast);
			toast = null;
			
			const el_toast = document.querySelector('.ui-toast');

			el_body.classList.add('ui-toast-show');
			el_toast.addEventListener('animationend', act);
		},
		hide () {
			const el_body = document.querySelector('body');
			const el_toast = document.querySelector('.ui-toast');
			const act = (e) => {
				const that = e.currentTarget;

				that.removeEventListener('animationend', act);
				that.remove();
				el_body.classList.remove('ui-toast-hide');
			}

			if (!!el_toast) {
				clearTimeout(Global.toast.timer);
				el_body.classList.add('ui-toast-hide');
				el_body.classList.remove('ui-toast-show');
				el_toast.addEventListener('animationend', act);
			}
		}
	}

	Global.MonthlyOcare = {
		init(v) {
			const data = v;
			
			const el_ocare_main = document.querySelector('.ocr-main-ocare');
			const el_monthly = document.querySelector('.ocr-monthly');
			const el_monthly_slogan = el_monthly.querySelector('.mdl-subject-em');
			const el_monthly_title = el_monthly.querySelector('.mdl-subject-tit');
			const el_img_main = el_monthly.querySelector('.ocr-monthly-img');
			const el_img_month = el_monthly.querySelector('.ocr-monthly-img2');
			const el_giftavay = document.querySelector('.ocr-giftavay');
			const el_giftavay_txt = el_giftavay.querySelector('.ocr-giftavay-txt');
			const el_giftavay_img = el_giftavay.querySelector('.ocr-giftavay-img img');
			const el_skeletons = document.querySelectorAll('.skeleton-item');
			const el_mzList = document.querySelector('.ocr-monthly-magazine .mdl-list-wrap');
			const el_mzList_items = el_mzList.querySelectorAll('.mdl-list-item');
			let mz_list = '';

			if (!!el_skeletons) {
				for (let skeleton of el_skeletons) {
					skeleton.remove();
				}
			}
			for(let item of el_mzList_items) {
				!item.classList.contains('cover') && item.remove();
			}
			for (let i = data.mz.length; i > 0; i--) {
				mz_list += '<li class="mdl-list-item"><button type="button" class="ocr-monthly-magazine-item" data-week="'+ i +'" data-cntnsId ="'+ data.mz[i-1].id +'" style="background-image:url('+ data.mz[i-1].img +')"><em>'+ data.mz[i-1].week +'</em><span>'+ data.mz[i-1].title +'</span></button></li>';
			}

			el_mzList.insertAdjacentHTML('afterbegin', mz_list);
			el_ocare_main.dataset.ocare = data.month;
			el_monthly_slogan.innerHTML = data.slogan;
			el_monthly_title.innerHTML = data.title;
			el_img_main.setAttribute('src', data.img_main);
			el_img_month.setAttribute('src', data.img_month);
			el_giftavay_img.setAttribute('src', data.img_giftavay);
			el_giftavay_txt.innerHTML = data.txt_giftavay;
		}
	}

	Global.form = {
		init () {
			const inps = document.querySelectorAll('input.mdl-form2-inp');
			const clear_html = '<button type="button" class="mdl-btn mdl-form2-clear" data-icon="btn-close" aria-label="입력값 삭제"></button>';

			for (let inp of inps) {
				const wrap = inp.parentNode;
				const isClear = wrap.querySelector('.mdl-form2-clear');
				if (inp.dataset.clear === 'true' && !isClear) {
					inp.insertAdjacentHTML('afterend', clear_html);
					wrap.querySelector('.mdl-form2-clear').addEventListener('click', (e) => {
						inp.value = '';
					});
				}
			}

		},
		clear () {
			const clears = document.querySelectorAll('.mdl-form2-clear');
			
			for (let clear of clears) {
				clear.addEventListener('click', act);
			}
			console.log(event, this);
		}
	}

	Global.test = {
		tab () {
			const tabs = document.querySelectorAll('.btn-tab');
			const foot = document.querySelector('.footer');
			const footbtn = document.querySelector('.footer .btn-txt');
			let names= [];
			let isService = false;
			const act = (event) => {
				const btn_current = event.currentTarget;
				const wrap = btn_current.parentNode;
				// const btns = wrap.querySelectorAll('.btn-tab');
				const btn_selected = wrap.querySelector('.btn-tab.selected');
				const tab = btn_current.dataset.tab;
				const name = btn_current.dataset.name;
				const pnl_current = document.querySelector('.tab-content[data-div="'+ tab +'"]');
				const wrap_pnl = pnl_current.parentNode;
				const pnls = wrap_pnl.querySelectorAll('.tab-content[data-name="'+  name +'"]');

				!!btn_selected && btn_selected.classList.remove('selected');
				btn_current.classList.add('selected');

				for (let pnl of pnls) {
					pnl.classList.add('none');
				}

				pnl_current.classList.remove('none');
				if (isService) {
					(tab === 'service') ?
					foot.removeAttribute('style') : 
					foot.style.display = 'none';
				}
				
			}
			for (let tab of tabs) {
				names.push(tab.dataset.tab);
				tab.addEventListener('click', act);
			}

			isService = (names.indexOf('service') < 0) ? false : true;

		}
	}
})();

class MainScroll {
	constructor (v) {
		this.swiper = document.querySelector('[data-id="inscroll"]');
		this.body = document.querySelector('body');
		OcareUI.exe.swiperOcare = new Swiper('.swiper[data-swiper="'+ v +'"]', {
			slidesPerView: "auto",
			spaceBetween: 0,
			speed: 800,
			touchRatio: 0.8,
			threshold: 20,
			resistance: false,
			shortSwipes: true,
			followFinger: false,
			resistanceRatio:0,
			direction: "vertical",
			touchAngle: 10
		});
		this.timer;
		this.init();
	}

	init () {
		if (this.body.dataset.loading === 'true') {
			console.log('재실행 방지');
			return false;
		}
		const btn_arrow = document.querySelector('[data-icon="singleArrowUp"]');
		let once_ocaremain2 = false;//한번만 실행

		btn_arrow.addEventListener('click', () => {
			OcareUI.exe.swiperOcare.slideTo(1)
		});

		OcareUI.exe.swiperOcare.on('slideChangeTransitionEnd', (v) => {
			if (v.activeIndex === 1) {
				this.body.classList.add('is-scroll');
			} else {
				this.body.classList.remove('ready-scroll');
			}
		});
		OcareUI.exe.swiperOcare.on('realIndexChange', (v) => {
			if (v.activeIndex === 1) {
				OcareUI.exe.swiperOcare.detachEvents();
				document.addEventListener('touchstart', this.eventStart);

				if (v.activeIndex === 1 && this.body.dataset.state === 'complete') {
					if (!once_ocaremain2) {
						once_ocaremain2 = true;
						setTimeout(OcareUI.exe.stampPieGraph.lineDraw, 1200);
						
					} 
				} else {
					OcareUI.callback.ocaremain2 = (v) => {
					    if (v.start > 50 && !once_ocaremain2) {
					        once_ocaremain2 = true;
					        OcareUI.exe.stampPieGraph.lineDraw();
					    } 
					}
				}
			}
		});
		OcareUI.exe.swiperOcare.on('touchMove', (v) => {
			v.activeIndex === 0 && this.body.classList.add('ready-scroll');
		});

		// OcareUI.exe.swiperOcare.on('touchEnd', (v) => {
		// 	clearTimeout(this.timer);
		// 	this.timer = setTimeout(() => {
		// 		v.activeIndex === 0 && this.body.classList.remove('ready-scroll');
		// 	},300);
		// });

		this.body.dataset.loading ='true';
	}
	eventStart = (event) => {
		const _this = event.currentTarget;
		const startY = event.changedTouches[0].clientY;
		const startX = event.changedTouches[0].clientX;
		let moveY;
		let moveX;
		
		const eventMove = (event) => {
			moveY = event.changedTouches[0].clientY;
			moveX = event.changedTouches[0].clientX;
		}
		const eventEnd = (event) => {
			document.removeEventListener('touchmove', eventMove);
			document.removeEventListener('touchend', eventEnd);
			
			if ((startY + 50) < moveY && Math.abs(startY-moveY) > Math.abs(startX - moveX) && this.swiper.scrollTop < 1) {
				OcareUI.exe.swiperOcare.attachEvents();
				OcareUI.exe.swiperOcare.slideTo(0);
				this.body.classList.remove('is-scroll');
				document.removeEventListener('touchstart', this.eventStart);
			} else {
				OcareUI.exe.swiperOcare.detachEvents();
			}
		}

		document.addEventListener('touchmove', eventMove);
		document.addEventListener('touchend', eventEnd);
	}
}

class DrawPieGraph {
	constructor (opt) {
		this.id = opt.id;
		this.wrap = opt.wrap;
		this.wraphalf = opt.wrap / 2;
		this.linewidth = opt.linewidth;
		this.size = opt.size / 2;
		this.graphColor = opt.linecolor;
		this.bgColor = opt.bgcolor;
		this.step = Number(opt.step - 1);

		this.piechart = document.querySelector('.mdl-piechart[data-id="'+ this.id +'"]');
		this.item = this.piechart.querySelector('.mdl-piechart-item');
		this.txt = this.piechart.querySelector('.mdl-piechart-txt');
		this.bar = this.piechart.querySelector('.mdl-piechart-bar');
		this.ctx = null;
		this.ctxLine = null;
		this.graline = null;

		this.a = 0;
		this.count = 0;
		this.num = opt.num;
		this.end = false;

		this.init();
	}

	init (v) {
		const html = '<canvas width="'+ this.wrap +'" height="'+ this.wrap +'" class="mdl-piechart-bg"></canvas><canvas width="'+ this.wrap +'" height="'+ this.wrap +'" class="mdl-piechart-line"></canvas>';

		if (!this.item.querySelector('.mdl-piechart-line')) {
			this.item.insertAdjacentHTML('afterbegin', html);
		}
		if (!!v) {
			this.a = 0;
			this.count = 0;
			this.num = v;
		}
		
		this.piechart.dataset.value = this.num;
		this.piechart.style.width = this.wrap + 'px';
		this.ctx = this.item.querySelector('.mdl-piechart-bg').getContext("2d");
		this.ctxLine =this.item.querySelector('.mdl-piechart-line').getContext("2d");
		this.graline = this.ctxLine.createLinearGradient(0, 0, this.wrap, this.wraphalf);
		this.txt.textContent = this.num;
		const ctx = this.ctx;

		ctx.beginPath();
		ctx.strokeStyle = this.bgColor;
		ctx.lineWidth = this.linewidth;
		ctx.lineCap = 'round';
		ctx.arc(this.wraphalf, this.wraphalf, this.size, (Math.PI/180)*150, (Math.PI/180) *390, false);
		ctx.stroke();

		// this.num === 0 && (this.graphColor = [this.bgColor, this.bgColor]);
		// this.lineDraw();
	}
	lineDraw = (v) => {
		const ctxLine = this.ctxLine;
		const n = 30 * (this.count);

		if (this.num < 1) {
			return false;
		}

		if (!!v) {
			this.a = 0;
			this.count = 0;
			this.num = v;
			this.piechart.dataset.value = v;
		}

		this.a += 0.001;
		this.graline.addColorStop(0.4, this.graphColor[0]);
		this.graline.addColorStop(1, this.graphColor[1]);
		
		ctxLine.lineWidth = this.linewidth;
		ctxLine.clearRect(0, 0, ctxLine.width, ctxLine.height);
		ctxLine.beginPath();
		ctxLine.lineCap = 'round';
		ctxLine.strokeStyle = this.graline;
		ctxLine.arc(this.wraphalf, this.wraphalf, this.size, (Math.PI/180) * 150, (Math.PI/180) * (150 + n), false);

		ctxLine.stroke();
		this.bar.style.transform = 'rotate('+ (-30 + n) +'deg) translateZ(1px)';
		this.count += this.a;

		if (this.num > this.count) {
			setTimeout(this.lineDraw,1);
		} else {
			if (!this.end) {
				this.end = true;
				this.count = this.num;
				this.lineDraw();
			}
		}
	}

}

class OcareTab {
	constructor(opt) {
		this.tab = opt.tab;
		this.async = opt.async;
		this.current = opt.current;
		this.maxw = 400;
		this.init();
	}

	init() {
		const tabs = document.querySelectorAll('.mdl-tab-btn[data-tab="'+ this.tab +'"]');
		const tabwrap = tabs[0].closest('.mdl-tab-wrap');
		const tab = tabwrap.closest('.mdl-tab');

		tab.removeAttribute('data-scroll');
		this.isScroll();
		// window.addEventListener('resize', this.isScroll);
		
		if (this.current) {
			this.act(this.current);
		}
		
		for (let tab of tabs) {
			tab.addEventListener('click', this.act);
		}
	}
	isScroll = (e) => {
		const tabs = document.querySelectorAll('.mdl-tab-btn[data-tab="'+ this.tab +'"]');
		const tabwrap = tabs[0].closest('.mdl-tab-wrap');
		const tab = tabwrap.closest('.mdl-tab');
		let tabW = tabwrap.offsetWidth;
		let wrapW = tab.parentNode.offsetWidth;

		tabW = tabwrap.offsetWidth;
		wrapW = tab.parentNode.offsetWidth;
		const n = Math.min(wrapW, this.maxw);
		
		console.log('n', n, tabW);

		tab.dataset.scroll = (n <= tabW) ? 'true' : 'false';
	}
	act = (v) => {
		let btn = v.currentTarget;
		const tab = this.tab;
		
		if (!v.currentTarget) {
			btn = document.querySelector('.mdl-tab-btn[data-tab="'+ tab +'"][data-id="'+ v +'"]');
		}

		const name = btn.innerText;
		const id = btn.dataset.id;
		const callback = btn.dataset.callback;
		const btn_selected =  document.querySelector('.mdl-tab-btn[data-tab="'+ tab +'"][aria-selected="true"]');
		const isPnl = document.querySelector('.mdl-tab-pnl[data-tab="'+ tab +'"]');
		const wrap = btn.parentNode;
		!!callback && OcareUI.callback.tab[callback]({id: tab, current: id, name: name });
		
		!!btn_selected && btn_selected.setAttribute('aria-selected', false);
		btn.setAttribute('aria-selected', true);

		this.current = id;
		
		!!v.isTrusted ? OcareUI.state.ing = true : '';
		console.log(v.isTrusted  ,OcareUI.state.ing);
		wrap.scrollTo({	
			left: (wrap.offsetWidth / 2 - (wrap.scrollLeft + btn.getBoundingClientRect().left) - (btn.offsetWidth / 2)) * -1,
			behavior: 'smooth'
		});
		// OcareUI.scroll.move({ 
		// 	selector: btn.parentNode, 
		// 	left: btn.getBoundingClientRect().left + btn.parentNode.scrollLeft, 
		// 	add : 0,
		// 	align: 'center' 
		// });

		if (isPnl) {
			const pnl_selected =  document.querySelector('.mdl-tab-pnl[data-tab="'+ tab +'"][aria-hidden="false"]');
			const pnl_current =  document.querySelector('.mdl-tab-pnl[data-tab="'+ tab +'"][data-id="'+ id +'"]');

			if (!this.async) {
				!!pnl_selected && pnl_selected.setAttribute('aria-hidden', true);
				pnl_current.setAttribute('aria-hidden', false);
			} else {
				document.querySelector('.mdl-tab-pnl[data-tab="'+ tab +'"]').setAttribute('aria-hidden', false)
			}
		}
	}
}

class Scrollevent {
	constructor (opt){ 
		const option = !!opt;
		this.selector = !!option && !!option.selector ? option.selector : document.querySelector('html, body');
		this.focus = !!option && !!opt.focus ? opt.focus : false;
		this.top =  !!option && !!opt.top ? opt.top : 0;
		this.left =  !!option && !!opt.left ? opt.left : 0;
		this.add =  !!option && !!opt.add ? opt.add : 0;
		this.ps =  !!option && !!opt.ps ? opt.ps : 'y';
		this.align =  !!option && !!opt.align ? opt.align : 'default';
		this.effect =  !!option && !!opt.effect ? opt.effect : 'smooth'; //'auto'
		this.callback =  !!option && !!opt.callback ? opt.callback : false;
		this.checkEndTimer;
		this.el_item;
		this.el_area;
		this.init();
	}
	
	init() {
		const el_areas = document.querySelectorAll('.ui-scrollevent-btn[data-area]');

		for (let i = 0, len = el_areas.length; i < len; i++) {
			const that = el_areas[i];

			that.removeEventListener('click', this.act);
			that.addEventListener('click', this.act);
		}
	}
	act = (e) => {
		const el = e.currentTarget;
		const area = el.dataset.area;
		const name = el.dataset.name;
		const align = el.dataset.align === undefined ? 'default' : el.dataset.align;
		const callback = el.dataset.callback === undefined ? false : el.dataset.callback;

		this.el_area = document.querySelector('.ui-scrollevent[data-area="'+ area +'"]');
	

		this.el_item = this.el_area.querySelector('.ui-scrollevent-item[data-name="'+ name +'"]');
		
		this.top = (this.el_area.getBoundingClientRect().top - this.el_item.getBoundingClientRect().top) - this.el_area.scrollTop;
		this.left = (this.el_area.getBoundingClientRect().left - this.el_item.getBoundingClientRect().left) - this.el_area.scrollLeft;

		if (align === 'center') {
			this.top = this.top - (this.el_item.offsetHeight / 2);
			this.left = this.left - (this.el_item.offsetWidth / 2);
		}

		this.move();
	}
	move() {
		const top = this.top;
		const left = this.left;
		const callback = this.callback;
		const align = this.align;
		const add = this.add;
		const ps = this.ps;
		const focus = this.el_item;
		const effect = this.effect;
		let selector = this.el_area;
	
		switch (align) {
			case 'center':
				selector.scrollTo({
					top: ps === 'x' ? 0 : Math.abs(top) - (selector.offsetHeight / 2) + add,
					left: ps === 'y' ? 0 : Math.abs(left) - (selector.offsetWidth / 2) + add,
					behavior: effect
				});
				break;
			
			case 'default':
			default :
				selector.scrollTo({
					top: ps === 'x' ? 0 : Math.abs(top) + add,
					left:  ps === 'y' ? 0 : Math.abs(left) + add,
					behavior: effect
				});
		}

		this.checkEnd({
			selector : selector,
			nowTop : selector.scrollTop, 
			nowLeft : selector.scrollLeft,
			align : align,
			callback : callback,
			focus : focus
		});
	}
	checkEnd(opt) {
		const el_selector = opt.selector;
		const align = opt.align
		const focus = opt.focus
		const callback = opt.callback
		
		let nowTop = opt.nowTop;
		let nowLeft = opt.nowLeft;

		this.checkEndTimer = setTimeout(() => {
			//스크롤 현재 진행 여부 판단
			if (nowTop === el_selector.scrollTop && nowLeft === el_selector.scrollLeft) {
				clearTimeout(this.checkEndTimer);
				//포커스가 위치할 엘리먼트를 지정하였다면 실행
				if (!!focus ) {
					focus.setAttribute('tabindex', 0);
					focus.focus();
				}
				//스크롤 이동후 콜백함수 실행
				if (!!callback) {
					if (typeof callback === 'string') {
						Global.callback.scroll[callback]();
					} else {
						callback();
					}
				}
			} else {
				nowTop = el_selector.scrollTop;
				nowLeft = el_selector.scrollLeft;

				this.checkEnd({
					selector: el_selector,
					nowTop: nowTop,
					nowLeft: nowLeft,
					align: align,
					callback: callback,
					focus: focus
				});
			}
		},100);
	}
	
}

class OcareAcco {
	constructor(opt) {
		this.accoId = opt.id;
		this.callback = opt.callback;
		this.current = opt.current;
		this.autoclose = opt.autoclose;

		this.el_acco = document.querySelector('.mdl-acco[data-id="' + this.accoId +'"]');
		this.el_wrap = document.querySelectorAll('.mdl-acco[data-id="' + this.accoId +'"] > .mdl-acco-wrap');
		this.len = this.el_wrap.length;
		this.timer;
		this.el_acco.dataset.n = this.len;
		this.init();
	}
	init () {
		//panel의 aria, 높이값, 이벤트 등 기본 설정 & 전체열림일 경우 panel 설정
		for (let i = 0; i < this.len; i++) {
			const that = this.el_wrap[i];
			const el_tit = that.querySelector('.mdl-acco-tit');
			const el_pnl = that.querySelector('.mdl-acco-pnl');
			const el_btn = el_tit.querySelector('.mdl-acco-btn');
			const el_hide = el_btn.querySelector('.hide');
			const el_pnl_wrap = that.querySelector('.mdl-acco-pnl-wrap');
			
			that.dataset.n = i;
			(el_tit.tagName !== 'DT') && el_tit.setAttribute('role','heading');

			el_btn.id = this.accoId + 'Btn' + i;
			el_btn.dataset.selected = false;
			el_btn.setAttribute('aria-expanded', false);
			!!el_hide ? el_hide.textContent = '열기' : '';
			el_btn.removeAttribute('data-order');
			el_btn.dataset.n = i;

			//패널이 있다면
			if (!!el_pnl) {
				el_pnl.id = this.accoId + 'Pnl' + i;
				el_btn.setAttribute('aria-controls', el_pnl.id);
				el_pnl.setAttribute('aria-labelledby', el_btn.id);
				
				if (this.accoId === el_pnl_wrap.closest('.mdl-acco').dataset.id) {
					el_pnl.dataset.height = el_pnl_wrap.offsetHeight;
				}

				el_pnl.classList.add('off');
				el_pnl.setAttribute('aria-hidden', true);
				el_pnl.dataset.n = i;
				el_pnl.style.height = '0px';

				//전체 열림이 설정이라면
				if (this.current === 'all') {
					el_pnl.classList.remove('off');
					// el_pnl.style.height = 'auto';
					el_btn.dataset.selected = true;
					el_btn.setAttribute('aria-expanded', true);
					!!el_hide ? el_hide.textContent = '닫기' : '';
					el_pnl.setAttribute('aria-hidden', false);
				}
			}

			if (i === 0) {el_btn.dataset.order = 'first';}
			if (i === this.len - 1) {el_btn.dataset.order = 'last';}

			el_btn.removeEventListener('click', this.evtClick);
			el_btn.addEventListener('click', this.evtClick);
		}

		//열려있는 panel 설정
		//current값은 array형식으로 하나이상의 구성
		const currentLen = this.current === null ? 0 : this.current === 'all' ? this.len : this.current.length;

		for (let i = 0; i < currentLen; i++) {
			const n = (this.current === 'all') ? i : this.current[i];
			const this_wrap = this.el_acco.querySelector('.mdl-acco-wrap[data-n="'+ n +'"]');
			const _tit = this_wrap.querySelector('.mdl-acco-tit');
			const _btn = _tit.querySelector('.mdl-acco-btn');
			const _pnl = this_wrap.querySelector('.mdl-acco-pnl');
			const _el_hide = _btn.querySelector('.hide');

			//direct children 
			if (this.accoId === this_wrap.closest('.mdl-acco').dataset.id && !!_pnl) {
				_btn.dataset.selected = true;
				_btn.setAttribute('aria-expanded', true);
				_pnl.classList.remove('off');
				_pnl.style.height = 'auto';
				_pnl.setAttribute('aria-hidden', false);
				_btn.dataset.selected = true;
				_pnl.style.height = _pnl.offsetHeight + 'px';
				!!_el_hide ? _el_hide.textContent = '닫기' : '';
			} 
		}
		
		//콜백실행
		!!this.callback && callback();
		//개별 아코딩언마다 네임스페이스 생성하여 정보 저장
		
	}
	evtClick = (event) => {
		const that = event.currentTarget;
		const btnId = that.id;
		const n = that.dataset.n;
		const wrap = that.closest('.mdl-acco-pnl');
		let accoId = btnId.split('Btn');
			accoId = accoId[0];

		if (!!btnId) {
			event.preventDefault();

			if (!!wrap) {
				wrap.style.height = 'auto';
			} 
			this.current = [n];
			this.toggle();
		}
	}
	toggle = (v) => {
		console.log(this.accoId);
		v !== undefined ? this.current = [v] : '';

		const accoId = this.accoId;
		const el_acco = document.querySelector('.mdl-acco[data-id="' + accoId +'"]');
		const current = this.current;
		const callback = this.callback;
		const state = this.state === undefined ? 'toggle' : this.state;
		const autoclose = this.autoclose;
		let el_wraps = el_acco.querySelectorAll('.mdl-acco-wrap');
		let el_pnl;
		let el_tit;
		let el_btn;
		let len = el_wraps.length;
		
		const act = (v) => {
			const isHide = !(v === 'hide'); //true | false
			const toggleSlide = (opt) => {
				let isShow = false;
				const el = opt.el;
				const btnID = el.getAttribute('aria-labelledby');
				const el_btn = document.querySelector('#' + btnID);
				const el_hide = el_btn.querySelector('.hide');
				const state = opt.state;
			
				//accordion inner
				const el_child = el.querySelector('.mdl-acco-pnl-wrap');
				const acco = el.closest('.mdl-acco');
				const acco_parent = acco.closest('.mdl-acco-pnl');

				el_btn.dataset.selected = isHide;
				el_btn.setAttribute('aria-expanded', isHide);
				if (el_hide) {
					isHide ? el_hide.textContent = '닫기' : el_hide.textContent = '열기';
				}
					
				//show 동작
				const show = () => {
					isShow = true;
					el_btn.setAttribute('aria-expanded', true);
					el_btn.dataset.selected = true;
					el.setAttribute('aria-hidden', false);
					el.classList.remove('off');
					el.style.height = el_child.offsetHeight + 'px';
					if (el_hide) {
						el_hide.textContent = '닫기';
					}
				}

				//hide 동작
				const hide = () => {
					isShow = false;						
					el_btn.setAttribute('aria-expanded', false);
					el_btn.dataset.selected = false;
					el.style.height = 0;
					if (el_hide) {
						el_hide.textContent = '열기';
					}
				}
				//end 동작
				const end = () => {
					if (el.style.height === '0px') {
						el.classList.add('off');
						el.setAttribute('aria-hidden', true);
					}  

					if (!!acco_parent) {
						acco_parent.style.height = acco_parent.querySelector('.mdl-acco-pnl-wrap').offsetHeight + 'px';
					} 

					el.removeEventListener('transitionend', end);
				}

				el.addEventListener('transitionend', end);
	
				(state === 'toggle') ?
					(el_btn.dataset.selected === 'true') ? show() : hide() :
					(state === 'show') ? show() : hide();
			}

			//set up close
			if (!!autoclose || current === 'all') {
				for (let i = 0, len = el_wraps.length; i < len; i++) {
					const that = el_wraps[i];
					const _tit = that.querySelector('.mdl-acco-tit');
					const _btn = _tit.querySelector('.mdl-acco-btn');
					const _pnl = that.querySelector('.mdl-acco-pnl');
					const _el_hide = _btn.querySelector('.hide');

					//direct children 
					if (accoId === that.closest('.mdl-acco').dataset.id) {
						if (!!_pnl) {
							//자동닫히기
							if (!!autoclose && Number(current[0]) !== Number(i)) {
								_btn.dataset.selected = false;
								_btn.setAttribute('aria-expanded', false);
								_pnl.setAttribute('aria-hidden', true);
								if (_el_hide) {
									_el_hide.textContent = '열기';
								}
								toggleSlide({
									el: _pnl, 
									state: 'hide'
								});
							}
							//전체 열고 닫기
							if (current === 'all') {
								_btn.dataset.selected = isHide;
								_btn.setAttribute('aria-expanded', isHide);
								_pnl.setAttribute('aria-hidden', !isHide);
								if (_el_hide) {
									isHide ? _el_hide.textContent = '닫기' : _el_hide.textContent = '열기';
								}
								toggleSlide({
									el: _pnl, 
									state: !isHide ? 'show' : 'hide'
								});
							}
						}
					}
				}
			}
			
			//기본
			if (current !== 'all') {
				if (!!el_pnl) {
					// el_pnl.setAttribute('aria-hidden', isHide);
					toggleSlide({
						el: el_pnl, 
						state: 'toggle'
					});
				}
			}
		}

		//선택값이 없다면 0 , 있다면 선택값 전체갯수
		const currentLen = current === null ? 0 : current.length;
		if (current !== 'all') {
			
			//전체선택이 아닌 일반적인 경우

			for (let i = 0; i < currentLen; i++) {
				const this_wrap = el_acco.querySelector('.mdl-acco-wrap[data-n="'+ current[i] +'"]');
				el_tit = this_wrap.querySelector('.mdl-acco-tit');
				el_pnl = this_wrap.querySelector('.mdl-acco-pnl');
				el_btn = el_tit.querySelector('.mdl-acco-btn');

				//direct children 
				if (accoId === this_wrap.closest('.mdl-acco').dataset.id && !!el_pnl) {
					switch(state) {
						case 'toggle' : (el_btn.dataset.selected === 'true') ? act('hide') : act('show');
							break;
						case 'open' : act('show');
							break;
						case 'close' : act('hide');
							break;
					}
				}
			}

			!!callback && callback({ 
				id: accoId, 
				current: current
			});
		} else if (current === 'all') {
			//state option 
			if (state === 'open') {
				check = 0;
				el_acco.dataset.allopen = false;
			} else if (state === 'close') {
				check = len;
				el_acco.dataset.allopen = true;
			}

			//all check action
			if (el_acco.dataset.allopen !== 'true') {
				el_acco.dataset.allopen = true;
				act('hide');
			} else {
				el_acco.dataset.allopen = false;
				act('show');
			}
		}
	}
}

class AniBgMake {
	constructor(opt) {
		this.id = opt.id;
		this.fps = opt.fps;
		this.loop = opt.loop;
		this.speed = opt.speed;
		this.delay = opt.delay;
		this.el = document.querySelector('[data-id="'+ this.id +'"]');
		this.init();
	}
	init() {
		const w = this.el.offsetWidth;


		let n = 0;
		let timer;
		console.log(w);
		const loop = () => {
			if (this.loop) {
				n = 0;
				setTimeout(act, this.delay);
			}
		}
		const act = () => {
			this.el.style.backgroundPositionX = (w * n) * -1 + 'px';
			n = n + 1;
			this.fps > n ? setTimeout(act, this.speed) : loop();
		}
		act();
		

	}
}