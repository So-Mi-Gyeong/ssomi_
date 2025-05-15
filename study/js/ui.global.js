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

	Global.colorSystem = {};
	Global.data = {};
	Global.chart = {};
	Global.exe = {};
	Global.callback = {
		readOnce: true,
		onceShow: false,
		tab: {},
		scroll: {},
		magazineRead: {},
		magazineComplete: {},
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

			const per = (document.querySelector('.ocr-body').scrollTop / (document.querySelector('.ocr-body-wrap').offsetHeight - document.querySelector('.ocr-body').offsetHeight) * 100 );

			document.querySelector('.ocr-magazine-cover-bar').style.width = per + '%';

			if (per >= 95 && !Global.callback.readOnce && !Global.callback.onceShow) {
				let modal_html = '<section class="mdl-modal ocr-magazine-modal" data-id="magazineRead" data-type="bottom" aria-hidden="true">';
				modal_html += '<div class="mdl-modal-wrap">';
				modal_html += '<div class="mdl-modal-body">';
				modal_html += '<h1 class="mdl-modal-tit">버튼을 누르고<br> 매거진 미션을 완료하세요</h1>';
				modal_html += '<div class="mdl-btn-wrap">';
				modal_html += '<button type="button" class="mdl-btn" data-style="primary" onclick="OcareUI.callback.magazineRead()"><span>다 읽었어요</span></button>';
				modal_html += '</div>';
				modal_html += '</div>';
				modal_html += '</div>';
				modal_html += '</section>';

				Global.callback.onceShow = true;
				document.querySelector('body').insertAdjacentHTML('beforeend', modal_html);
				OcareUI.modal.show('magazineRead');
				modal_html = null;
			}
			if (per >= 95 && !!Global.callback.readOnce && !Global.callback.onceShow) {
				let modal_html2 = '<section class="mdl-modal ocr-magazine-modal" data-id="magazineComplete" data-type="bottom" aria-hidden="true">';
				modal_html2 += '<div class="mdl-modal-wrap">';
				modal_html2 += '<div class="mdl-modal-body">';
				modal_html2 += '<h1 class="mdl-modal-tit">버튼을 누르고<br> 매거진 미션을 완료하세요</h1>';
				modal_html2 += '<div class="mdl-btn-wrap">';
				modal_html2 += '<button type="button" class="mdl-btn" data-style="primary" onclick="OcareUI.modal.hide(\'magazineComplete\');"><span>참여완료</span></button>';
				modal_html2 += '</div>';
				modal_html2 += '</div>';
				modal_html2 += '</div>';
				modal_html2 += '</section>';

				Global.callback.onceShow = true;
				document.querySelector('body').insertAdjacentHTML('beforeend', modal_html2);
				OcareUI.modal.show('magazineComplete');
				modal_html2 = null;
			}
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
		healthStep : ['정상', '경계', '의심'],
		ing: false,
		breakPoint : 320,
		scroll: {
			y: 0,
			direction: 'down'
		},

		time: {
			value() {
				let today = new Date();
				let hours = today.getHours(); // 시
				let minutes = today.getMinutes();  // 분

				return Global.parts.add0(hours) + ':' + Global.parts.add0(minutes);
			},
			now(v) {
				const selector = document.querySelector('.ui-nowtime[data-id="'+ v +'"]');
				const selector_b = selector.querySelector('b');
				const selector_span = selector.querySelector('span');
				let today = new Date();
				let hours = today.getHours(); // 시
				let minutes = today.getMinutes();  // 분
				let seconds = today.getSeconds();  // 초
				let milliseconds = today.getMilliseconds(); // 밀리초

				const act = () => {
					setTimeout(() => {
						today = new Date();
						hours = today.getHours(); // 시
						minutes = today.getMinutes();  // 분

						hours = hours > 12 ? hours - 12 : hours;
						selector_b.textContent = Global.parts.add0(hours) + ':' + Global.parts.add0(minutes);
						selector_span.textContent = (hours >= 12 && hours < 24) ?  '오전' : '오후';
						act();
					}, 1000);
				}
				act();
			},
			countdown(v) {
				const selector = document.querySelector('.ui-nowtime[data-id="'+ v +'"]');
				const selector_b = selector.querySelector('b');
				const selector_span = selector.querySelector('span');
				let today = new Date();
				let hours = today.getHours(); // 시
				let minutes = today.getMinutes();  // 분
				let seconds = today.getSeconds();  // 초

				const act = () => {
					setTimeout(() => {
						today = new Date();
						hours = 24 - today.getHours(); // 시
						minutes = 60 - today.getMinutes();  // 분
						seconds = 60 - today.getSeconds();

						hours = hours === 24 ? 0 : hours;
						minutes = minutes === 60 ? 0 : minutes;
						seconds = seconds === 60 ? 0 : seconds;

						selector_b.textContent = Global.parts.add0(hours) + ':' + Global.parts.add0(minutes) + ':' + Global.parts.add0(seconds);
						act();
					}, 1000);
				}
				act();
			}
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
	Global.parts = {
		makeID(v) {
			let idLength = v;
			let idText = "";
			let word_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*"; 
			for (let i = 0; i < idLength; i++) {
				idText += word_list.charAt(Math.floor(Math.random() * word_list.length));
			};
			return idText;
		},

		convertProtein(v) {    
			//요단백 값 숫자로 변경    
			let value = v;
			if (typeof v === 'string') { 
				switch (v) { 
					case '음성' : value = -0.5; break;
					case '약양성' : value = 0.5; break;                
					case '양성(+1)이상' :
					case '양성' : value = 1.5; break;                
					default: value = -0.5; break;          
				}    
			}
		return value;
		},	
		t_h_m(v){
			let time = v;
			let h = Number(time[0]);
			let m = Number(time[1]);
			let t = h > 12 ? '오후' : '오전';
			h > 12 ? h = h - 12 : '';

			return t +' '+ h +':'+ m;
		},
		calc_hm(v){
			//분 > 시간 분
			let time = Number(v);
			return `${Math.floor(time / 60)}시간 ${Math.floor(time % 60)}분`;
		},
		h_m(v){
			//초 > 시간 분
			let time = Number(v);

			time = time / 60;
			time = (time >= 60) ?
				time = Math.floor(time / 60) + '시간 ' + Math.floor(time % 60) + '분':
				time = Math.floor(time % 60) + '분';
			return time;

		},
		scroll(){
			let last_know_scroll_position = 0;
			let ticking = false;

			const doSomething = (scroll_pos) => {
				Global.state.scroll.direction =
					Global.state.scroll.y > scroll_pos ? 'up' : Global.state.scroll.y < scroll_pos ? 'down' : '';
				Global.state.scroll.y = scroll_pos;
			}
			window.addEventListener('scroll', (e) => {
				last_know_scroll_position = window.scrollY;

				if (!ticking) {
					window.requestAnimationFrame(() => {
						doSomething(last_know_scroll_position);
						ticking = false;
					});

					ticking = true;
				}
			});
		},
		//resize state
		resizeState() {
			let timerWin;

			const act = () => {
				const browser = Global.state.browser;
				const device = Global.state.device;

				device.width = window.innerWidth;
				device.height = window.innerHeight;

				device.touch = device.ios || device.android || (document.ontouchstart !== undefined && document.ontouchstart !== null);
				device.mobile = device.touch && (device.ios || device.android);
				device.os = device.os ? device.os[0] : '';
				device.os = device.os.toLowerCase();

				device.breakpoint = device.width >= deviceSize[5] ? true : false;
				device.colClass = device.width >= deviceSize[5] ? 'col-12' : device.width > deviceSize[8] ? 'col-8' : 'col-4';

				if (browser.ie) {
					browser.ie = browser.ie = parseInt( browser.ie[1] || browser.ie[2] );
					( 11 > browser.ie ) ? support.pointerevents = false : '';
					( 9 > browser.ie ) ? support.svgimage = false : '';
				} else {
					browser.ie = false;
				}
				
				const clsBrowser = browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie' + browser.ie : 'other';
				const clsMobileSystem = device.ios ? "ios" : device.android ? "android" : 'etc';
				const clsMobile = device.mobile ? device.app ? 'ui-a ui-m' : 'ui-m' : 'ui-d';
				const el_html = document.querySelector('html');

				el_html.classList.remove('col-12', 'col-8', 'col-4');
				el_html.classList.add(device.colClass);
				el_html.classList.add(clsBrowser);
				el_html.classList.add(clsMobileSystem);
				el_html.classList.add(clsMobile);
			
				const w = window.innerWidth;

				clearTimeout(timerWin);
				timerWin = setTimeout(() => {
					el_html.classList.remove('size-tablet');
					el_html.classList.remove('size-desktop');
					el_html.classList.remove('size-mobile');
						el_html.classList.remove('size-desktop');

					if (w < Global.state.breakPoint[0]) {
						Global.state.browser.size = 'mobile';
						el_html.classList.add('size-mobile');
					} else if (w < Global.state.breakPoint[1]) {
						Global.state.browser.size = 'tablet';
						el_html.classList.add('size-tablet');
					} else {
						Global.state.browser.sizee = 'desktop';
						el_html.classList.add('size-desktop');
					}
				},200);
			}
			window.addEventListener('resize', act);
			act();
		},
		pageName() {
			const page = document.URL.substring(document.URL.lastIndexOf("/") + 1);
			const pagename = page.split('?');

			return pagename[0];
		},
		/**
		* append html : 지정된 영역 안에 마지막에 요소 추가하기
		* @param {object} el target element
		* @param {string} str 지정된 영역에 들어갈 값
		* @param {string} htmltag HTML tag element
		*/
		appendHtml(el, str, htmltag) {
			const _htmltag = !!htmltag ? htmltag : 'div';
			const div = document.createElement(_htmltag);

			div.innerHTML = str;

			while (div.children.length > 0) {
				el.appendChild(div.children[0]);
			}
		},

		/**
		* delete parent tag : 지정된 요소의 부모태그 삭제
		* @param {object} child target element
		*/
		deleteParent(child) {
			const parent = child.parentNode;

			parent.parentNode.removeChild(parent);
		},

		/**
		* wrap tag : 지정된 요소의 tag 감싸기
		* @param {object} child target element
		*/
		wrapTag(front, selector, back) {
			const org_html = selector.innerHTML;
			const new_html = front + org_html + back;

			selector.innerHTML = '';
 			selector.insertAdjacentHTML('beforeend', new_html) ;
		},

		//숫자 세자리수마다 ',' 붙이기
		comma(n) {
			var parts = n.toString().split(".");

			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
		},

		//숫자 한자리수 일때 0 앞에 붙이기
		add0(x) {
			return Number(x) < 10 ? '0' + x : x;
		},

		//주소의 파라미터 값 가져오기
		para(paraname) {
			const _tempUrl = window.location.search.substring(1);
			const _tempArray = _tempUrl.split('&');

			for (let i = 0, len = _tempArray.length; i < len; i++) {
				const that = _tempArray[i].split('=');

				if (that[0] === paraname) {
					return that[1];
				}
			}
		},

		//기본 선택자 설정
		selectorType(v) {
			let base = document.querySelector('body');

			if (v !== null) {
				if (typeof v === 'string') {
					base = document.querySelector(v);
				} else {
					base = v;
				} 
			}

			return base;
		},

		RAF(start, end, startTime, duration){
			const _start = start;
			const _end = end;
			const _duration = duration ? duration : 300;
			const unit = (_end - _start) / _duration;
			const endTime = startTime + _duration;

			let now = new Date().getTime();
			let passed = now - startTime;

			if (now <= endTime) {
				Global.parts.RAF.time = _start + (unit * passed);
				requestAnimationFrame(scrollTo);
			} else {
				!!callback && callback();
			}
		},

		getIndex(ele) {
			let _i = 0;

			while((ele = ele.previousSibling) != null ) {
				_i++;
			}

			return _i;
		},
		textLength(opt) {
			const textLengthObjects = document.querySelectorAll('[data-textlength-object]');
			const actTextLength = (v) => {
				const _this =  v.type === 'keyup' ? v.currentTarget : v;
				const _id =_this.dataset.textlengthObject;
				const _target = document.querySelector('[data-textlength-target="'+_id+'"]');
				const _btn = opt.btn;
				const _max_num = Number(_this.getAttribute('maxlength'));
				const _min_num = Number(_this.getAttribute('minlength')) || 4;
				let len = _this.value.length;
				
				len = (_max_num < len) ? _max_num : len;
				_target.textContent = len;
				_this.dataset.state=  (len > _min_num) ? 'on' : 'off';
				let n = 0;

				for (const item of textLengthObjects) {
					if (item.dataset.state === 'on') n = n + 1;
				}
				
				if (_btn) {
					if (n === textLengthObjects.length) {
						_btn.disabled = false;
					} else {
						_btn.disabled = true;
					}
				}
			}
			
			for (const item of textLengthObjects) {
				item.addEventListener('keyup', actTextLength);
				actTextLength(item);
			}
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
	Global.cookie = {
		set(opt) {
			const name = opt.name;
			const value = opt.value;
			const term = opt.term;
			const path = opt.path;
			const domain = opt.domain;
			let cookieset = name + '=' + value + ';';
			let expdate;

			if (term) {
				expdate = new Date();
				
				let _hours = 23 - expdate.getHours();
				let _minutes = 59 - expdate.getMinutes();
				let _secondes = 59 - expdate.getSeconds();
				let _milliseconds = 999 - expdate.getSeconds();

				const _1d = 1000 * 60 * 60 * 24;
				const _1d_f = (1000 * 60 * 60 * _hours) + (1000 * 60 * _minutes) + (1000 * _secondes) + _milliseconds;
				const _1d_b = (1000 * 60 * 60 * expdate.getHours()) + (1000 * 60 * expdate.getMinutes())  + (1000 * expdate.getSeconds()) + expdate.getSeconds();
				let _add = 0;

				if (term > 1) {
					_add = 1000 * 60 * 60 * 24 * (term - 1);
				}

				expdate.setTime(expdate.getTime() + (_1d_b + _add)); // term 1 is a day
				cookieset += 'expires=' + expdate.toGMTString() + ';';
			}

			(path) ? cookieset += 'path=' + path + ';' : '';
			(domain) ? cookieset += 'domain=' + domain + ';' : '';

			document.cookie = cookieset;
		},
		get(name) {
			
			const match = ( document.cookie || ' ' ).match( new RegExp(name + ' *= *([^;]+)') );
			return (match) ? match[1] : null;
		},
		del(name){
			document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
	}
	
	Global.scrollEvent = {
		options : {
			selector: document.querySelector('html, body'),
			focus: false,
			top: 0,
			left:0,
			add: 0,
			align: 'default',
			effect:'smooth', //'auto'
			callback: false,	
		},
		init() {
			const el_areas = document.querySelectorAll('.ui-scrollmove-btn[data-area]');

			for (let i = 0, len = el_areas.length; i < len; i++) {
				const that = el_areas[i];

				that.removeEventListener('click', this.act);
				that.addEventListener('click', this.act);
			}
			// for (let that of el_areas) {
			// 	that.removeEventListener('click', this.act);
			// 	that.addEventListener('click', this.act);
			// }
		},
		act(e) {
			const el = e.currentTarget;
			const area = el.dataset.area;
			const name = el.dataset.name;
			const add = el.dataset.add === undefined ? 0 : el.dataset.add;
			const align = el.dataset.align === undefined ? 'default' : el.dataset.align;
			const callback = el.dataset.callback === undefined ? false : el.dataset.callback;
			let el_area = document.querySelector('.ui-scrollmove[data-area="'+ area +'"]');
			const item = el_area.querySelector('.ui-scrollbar-item');
			
			if (!!item) {
				el_area = el_area.querySelector('.ui-scrollbar-item');
			}

			const el_item = el_area.querySelector('.ui-scrollmove-item[data-name="'+ name +'"]');
			
			let top = (el_area.getBoundingClientRect().top - el_item.getBoundingClientRect().top) - el_area.scrollTop;
			let left = (el_area.getBoundingClientRect().left - el_item.getBoundingClientRect().left) - el_area.scrollLeft;

			if (align === 'center') {
				top = top - (el_item.offsetHeight / 2);
				left = left - (el_item.offsetWidth / 2);
			}

			Global.scroll.move({
				top: top,
				left: left,
				add: add,
				selector: el_area,
				align: align,
				focus: el_item,
				callback: callback
			});
		},
		move(option) {
			const opt = Object.assign({}, this.options, option);
			//const opt = {...this.options, ...option};
			const top = opt.top;
			const left = opt.left;
			const callback = opt.callback;
			const align = opt.align;
			const add = opt.add;
			const focus = opt.focus;
			const effect = opt.effect;
			let selector = opt.selector;
			const item = selector.querySelector('.ui-scrollbar-item');
			const isCustomScroll = selector.classList.contains('ui-scrollbar');

			if (!!item && !!isCustomScroll) {
				selector = selector.querySelector('.ui-scrollbar-item');
			}

			switch (align) {
				case 'center':
					selector.scrollTo({
						top: Math.abs(top) - (selector.offsetHeight / 2) + add,
						left: Math.abs(left) - (selector.offsetWidth / 2) + add,
						behavior: effect
					});
					break;
				
				case 'default':
				default :
					selector.scrollTo({
						top: Math.abs(top) + add,
						left: Math.abs(left) + add,
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
		},
		checkEndTimer : {},
		checkEnd(opt) {
			const el_selector = opt.selector;
			const align = opt.align
			const focus = opt.focus
			const callback = opt.callback
			
			let nowTop = opt.nowTop;
			let nowLeft = opt.nowLeft;

			Global.scrollEvent.checkEndTimer = setTimeout(() => {
				//스크롤 현재 진행 여부 판단
				if (nowTop === el_selector.scrollTop && nowLeft === el_selector.scrollLeft) {
					clearTimeout(Global.scrollEvent.checkEndTimer);
					//포커스가 위치할 엘리먼트를 지정하였다면 실행
 					if (!!focus ) {
						focus.setAttribute('tabindex', 0);
						focus.focus();
					}
					//스크롤 이동후 콜백함수 실행
					if (!!callback) {
						if (typeof callback === 'string') {
							Global.callback[callback]();
						} else {
							callback();
						}
					}
				} else {
					nowTop = el_selector.scrollTop;
					nowLeft = el_selector.scrollLeft;

					Global.scrollEvent.checkEnd({
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
	
	Global.include = {
		init(opt) {
			const selector = document.querySelector('[data-id="'+ opt.id +'"]');
			const src = opt.src;
			const type = !opt.type ? 'html' : opt.type;
			const insert = !!opt.insert ? opt.insert : false;

			if (!!selector && !!src && type === 'html') {
				fetch(src).then(response => response.text()).then(data => {
					if (insert) {
						selector.insertAdjacentHTML('afterbegin', data);
					} else {
						selector.innerHTML = data;
					}
					
					(!!selector.dataset.title && !!selector.querySelector('.ocr-header-tit')) && selector.querySelector('.ocr-header-tit').setAttribute('aria-label', selector.dataset.title);

					opt.callback && opt.callback();
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
					case 'challenge' : selector_footer.querySelector('.ocr-nav-btn[data-nav="challenge"]').setAttribute('aria-selected', true); break;
					case '마인드' : selector_footer.querySelector('.ocr-nav-btn[data-nav="test"]').setAttribute('aria-selected', true); break;
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
	Global.fileUpload = {
		init() {
			const el_files = document.querySelectorAll('input[data-fileupload]');
			const updateImageDisplay = (e) => {
				const el_file = e.currentTarget;
				const name = el_file.dataset.fileupload;
				const inputItem = document.querySelector(`[data-fileupload-item="${name}"]`);

				inputItem.value = el_file.files[0].name;
			}
			el_files.forEach(item => {
				if (!item.dataset.ready) {
					item.addEventListener('change', updateImageDisplay);
					item.dataset.ready = true;
				}
			});
		}
	}
	
	/**
	 * OcareUI.alert({
	 * 	id : 'idname',
	 *  title : '제목',
	 *  content: '<p>컨텐츠 내용 html 로 구성<p>',
	 *  button: [
	 * 		{
	 * 			text: '취소',
	 *  		callback: () => {...}
	 * 		},
	 * 		{
	 * 			text: '확인',
	 * 			callback: () => {...}
	 * 		}
	 * ]
	 * });
	 */

	Global.alert = {
		init(opt) {
			const id = opt.id;
			const title = opt.title;
			const content = opt.content;
			const btn = opt.button;

			let html = '';
			html += '<section class="mdl-modal" data-id="'+ id +'" data-type="alert" aria-hidden="true">';
            html += '<div class="mdl-modal-wrap">';
            html += '    <div class="mdl-modal-body">';

			if (!!title) {
				html += '        <h1 class="mdl-modal-tit">'+ title +'</h1>';
			}
			
            html += content;
            html += '        <div class="mdl-btn-wrap">';
			if (btn.length === 2) {
				html += '            <button type="button" class="mdl-btn" data-state="cancel" data-style="primary-gray">';
				html += '                <span>'+ btn[1].text +'</span>';
				html += '            </button>';
			} 
			html += '            <button type="button" class="mdl-btn" data-state="ok" data-style="primary">';
			html += '                <span>'+ btn[0].text +'</span>';
			html += '            </button>';
            
            html += '        </div>';
            html += '    </div>';
            html += '</div>';
        	html += '</section>';

			document.querySelector('body').insertAdjacentHTML('beforeend', html);

			html = null;

			if (!!btn[0]) {
				document.querySelector('.mdl-modal[data-id="'+ id +'"] .mdl-btn[data-state="ok"]').addEventListener('click', btn[0].callback);
			} 
			if (!!btn[1]) {
				document.querySelector('.mdl-modal[data-id="'+ id +'"] .mdl-btn[data-state="cancel"]').addEventListener('click', btn[1].callback);
			} 
		}
	}

	Global.modal = {
		show (v, z) {
			const el_modal = document.querySelector('.mdl-modal[data-id="'+ v +'"]');
			const el_close = el_modal.querySelector('.mdl-modal-close');
			document.querySelector('body').dataset.modalShow = 'true';
			el_modal.setAttribute('aria-hidden', 'false');	
			setTimeout(() => {
				el_modal.classList.add('dim-show');
			},0);

			const el_openModals = document.querySelectorAll('.mdl-modal[aria-hidden="false"]');

			if (!!el_openModals) {
				let zindex_array = [];
				
				for (let i = 0; i < el_openModals.length; i++) {
					el_openModals[i].dataset.current = 'false';
					zindex_array.push(Number(getComputedStyle(el_openModals[i]).zIndex));
				}
				
				el_modal.style.zIndex = z ? z : Math.max.apply(null, zindex_array) + 1;
			}

			el_modal.dataset.current = 'true';
			!!el_close && el_close.focus();
			
		},
		hide (v) {
			const openModals = document.querySelectorAll('.mdl-modal[aria-hidden="false"]');
			const el_modal = document.querySelector('.mdl-modal[data-id="'+ v +'"]');
			const el_modal_wrap = el_modal.querySelector('.mdl-modal-wrap');
			const z = (Number(getComputedStyle(el_modal).zIndex));

			if (openModals.length === 0) return false;

			const end = () => {
				el_modal_wrap.removeEventListener('animationend', end);
				el_modal.removeAttribute('aria-hidden');
				el_modal.removeAttribute('data-current');
				el_modal.removeAttribute('style');
				const el_openModals = document.querySelectorAll('.mdl-modal[aria-hidden="false"]');
				el_modal.classList.remove('dim-show');
				

				if (!!el_openModals) {
					for (let i = 0; i < el_openModals.length; i++) {
						if ((z - 1) ===  Number(getComputedStyle(el_openModals[i]).zIndex)) {
							el_openModals[i].dataset.current = 'true';
							
						}
					}
				}
			}

			if (openModals.length === 1) document.querySelector('body').dataset.modalShow = 'false';

			el_modal.setAttribute('aria-hidden', 'true');
			el_modal_wrap.addEventListener('animationend', end);
		}
	}

	Global.tooltipbtn = {
		show(v){
			const tid = v ? v :'nav-tooltip';
			const tooltip = document.querySelector('.mdl-tooltip[data-id="'+ tid +'"]');
			tooltip.setAttribute('data-type', 'show');
		},
		hide(v){
		 	const tid = v ? v :'nav-tooltip';
			const tooltip = document.querySelector('.mdl-tooltip[data-id="'+ tid +'"]');
			tooltip.setAttribute('data-type', 'hide');
		}
	}

	Global.tooltipAct = {
		show(v){
			const tooltip = document.querySelector('.mdl-tooltip[data-id="'+ v +'"]');
			tooltip.setAttribute('aria-hidden', 'false');
		},
		hide(v){
			const tooltip = document.querySelector('.mdl-tooltip[data-id="'+ v +'"]');
			tooltip.setAttribute('aria-hidden', 'true');
		}
	}

	Global.loading = {
		timerShow : {}, 
		timerHide : {},
		options : {
			selector: null,
			message : null,
			styleClass : 'orbit' //time
		},
		show(option){
			const opt = Object.assign({}, this.options, option);
			const selector = opt.selector; 
			const styleClass = opt.styleClass; 
			let message = opt.message;
			const el = (selector !== null) ? selector : document.querySelector('body');
			const el_loadingHides = document.querySelectorAll('.ui-loading:not(.visible)');

			for (let i = 0, len = el_loadingHides.length; i < len; i++) {
				const that = el_loadingHides[i];

				that.remove();
			}

			let htmlLoading = '';

			(selector === null) ?
				htmlLoading += '<div class="ui-loading '+ styleClass +'">':
				htmlLoading += '<div class="ui-loading type-area '+ styleClass +'">';

			htmlLoading += '<div class="ui-loading-wrap">';

			switch (styleClass) {
				case 'myhealth':
				htmlLoading += '<div class="ocr-loading-myhealth"><div class="ocr-loading-myhealth-bar"></div><div class="ocr-loading-myhealth-bar"></div><div class="ocr-loading-myhealth-bar"></div></div>';
				message = '고객님의 건강 데이터를<br>안전하게 불러오고 있어요';
				break;

				case 'ocare':
				htmlLoading += '<img src="../../assets/img/ocare/m12/tiket.gif" />';
				break;

				case 'challenge':
				htmlLoading += '<div class="ocr-loading-challenge"><div class="ocr-loading-challenge-main"></div><div class="ocr-loading-challenge-star n1"></div><div class="ocr-loading-challenge-star n2"></div><div class="ocr-loading-challenge-star n3"></div></div>';
				break;

				case 'content':
				htmlLoading += '<img src="../../assets/img/challenge/loading_content.gif" />';
				break;

				case 'correct':
				htmlLoading += '<img src="../../assets/img/page/NMOK_4_8P/correct.gif" /><div class="txt">정답입니다!</div>';
				break;
			}
			
			(message !== null) ?
				htmlLoading += '<strong class="ui-loading-message"><span>'+ message +'</span></strong>':
				htmlLoading += '';

			htmlLoading += '</div>';
			htmlLoading += '</div>';

			const showLoading = () => {
				const el_child = el.childNodes;
				let is_loading = false;

				for (let i = 0; i < el_child.length; i++) {
					if (el_child[i].nodeName === 'DIV' && el_child[i].classList.contains('ui-loading')) {
						is_loading = true;
					}
				}

				!is_loading && el.insertAdjacentHTML('beforeend', htmlLoading);
				htmlLoading = null;		
				
				const el_loadings = document.querySelectorAll('.ui-loading');

				for (let i = 0, len = el_loadings.length; i < len; i++) {
					const that = el_loadings[i];

					that.classList.add('visible');
					that.classList.remove('close');
				}
			}
			clearTimeout(this.timerShow);
			clearTimeout(this.timerHide);
			this.timerShow = setTimeout(showLoading, 300);
		},
		hide(){
			clearTimeout(this.timerShow);
			this.timerHide = setTimeout(() => {
				const el_loadings = document.querySelectorAll('.ui-loading');

				for (let i = 0, len = el_loadings.length; i < len; i++) {
					const that = el_loadings[i];

					that.classList.add('close');
					setTimeout(() => {
						that.classList.remove('visible')
						that.remove();
					},300);
				}
			},300);
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

	Global.noticeRollingText = {
		init(v) {
			

			const time = v;
			const notiItem = document.querySelector('.ocr-store-noti-item');
			const notiBtns = notiItem.querySelectorAll('button');

			if (notiItem.dataset.ready === 'complete') {
				return false;
			}
			
			notiItem.insertAdjacentElement('beforeend', notiBtns[0].cloneNode(true));

			notiItem.dataset.ready = 'complete';

			const n = notiBtns.length;
			const h = notiBtns[0].offsetHeight;
			const limit = n * h;
			let t = 0;
			let i = 1;
			
			const reset = () => {
				i = 1;
				notiItem.style.transition = 'none'; 
				notiItem.style.transform = 'translateY(0px)';
				setTimeout(() => {
					notiItem.style.transition = 'transform .2s ease-in'; 
					act();
				}, 0);
			}
			const act = () => {
				if (n + 1 < i) {
					reset();
				} else {
					setTimeout(() => {
						notiItem.style.transform = 'translateY(-'+ (h * i) +'px)';
						i = i + 1;
						act();
					}, time);
				}
			}
			act();
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
			auto: true,
			callback : false,
			once:false,
		},
		show (option) {
			const opt = Object.assign({}, this.options, option);
			const delay = opt.delay;
			const classname = opt.classname;
			const callback = opt.callback;
			const conts = opt.conts;
			const once = opt.once;
			const status = opt.status;
			const el_body = document.querySelector('body');
			const dataId = once ? once : Global.parts.makeID(5);
			const elFoot = document.querySelector('.foot, .footer, .ocr-footer');
			
			!document.querySelector('.base-toast') && el_body.insertAdjacentHTML('beforeend', `<div class="base-toast"></div>`);
			const baseToast = document.querySelector('.base-toast');
			let tagToast = `<div class="ui-toast mdl-toast ${classname}" aria-live="${status}" data-id="toast_${dataId}">
				${conts}`;
				if (!opt.auto) tagToast += `<button type="button" class="mdl-toast-close" data-icon="close-w"></button>`;
			tagToast += `</div>`;

			const isToast = document.querySelector(`.ui-toast[data-id="toast_${dataId}"]`);
			if (isToast) return false;
			
			baseToast.insertAdjacentHTML('beforeend', tagToast);
			tagToast = null;

			const elToast = document.querySelector(`.ui-toast[data-id="toast_${dataId}"]`);
			const elBaseToast = document.querySelector('.base-toast');
			
			if (elFoot) {
				console.log(elFoot.offsetHeight)
				elBaseToast.style.bottom = ((elFoot.offsetHeight / 10) + 0.8) + 'rem';
			} else {
				elBaseToast.style.bottom = '3.6rem';
			}
			
			let time = (delay === 'short') ? 2000 : 3500;
			
			const clear = e => {
				const _this = e.currentTarget;
				_this.removeEventListener('animationend', clear);
			 	_this.remove();
				elToast.removeAttribute('aria-hidden');
				!!callback && callback();
			}
			const hide = t => {
				setTimeout(() => {
					elToast.setAttribute('aria-hidden','true');
					elToast.addEventListener('animationend', clear);
				}, t);
			}
			const act = e => {
				const _this = e.currentTarget;
				_this.removeEventListener('animationend', act);
				hide(time);
			}
			elToast.setAttribute('aria-hidden','false');
			elToast.addEventListener('animationend', act);

			if (!opt.auto) {
				elToast.querySelector('.mdl-toast-close').addEventListener('click', hide);
			}
		}
	}

	Global.MonthlyOcare = {
		init(v) {
			const data = v;
			const el_mzList = document.querySelector('.ocr-monthly-magazine .mdl-list-wrap');
			const el_mzList_items = el_mzList.querySelectorAll('.mdl-list-item');
			const el_mzList_items_btn = document.querySelector('.ocr-monthly-magazine-item');
			let mz_list = '';

			//최초 한번만 실행
			if (!el_mzList_items_btn) {
				for (let i = data.mz.length; i > 0; i--) {
					mz_list += '<li class="mdl-list-item"><button type="button" data-state="close" class="ocr-monthly-magazine-item" data-frdt="'+ data.mz[i-1].frdt +'" data-weekno="'+ data.mz[i-1].weekno +'" data-week="'+ i +'" data-cntnsId ="'+ data.mz[i-1].id +'" style="background-image:url('+ data.mz[i-1].img +')"><em>'+ data.mz[i-1].week +'</em><span>'+ data.mz[i-1].title +'</span></button></li>';
				}
			}

			el_mzList.insertAdjacentHTML('afterbegin', mz_list);
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
		}
	}

	Global.brand = {
		tab (callback) {
			const _callback = callback
			let tabLine;
			let tabs;
			let rect_tab;
			let names;
			let isService;
			let h;
			const scroll_wrap = document.querySelector('.scrollBox');
			let sat = Number(getComputedStyle(document.documentElement).getPropertyValue("--sat").split('px')[0]);
			sat = sat === undefined ? 0 : sat; 
			const act = (event) => {
				const _current = event.currentTarget;
				let btn_current = _current.classList.contains('.btn-tab') ? _current : document.querySelector(`.btn-tab[data-name="${_current.dataset.name}"][data-tab="${_current.dataset.tab}"]`);

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

				_callback && _callback({
					tab: tab,
					name: name
				})

				for (let pnl of pnls) {
					pnl.classList.add('none');
				}

				pnl_current.classList.remove('none');
				
				scroll_wrap.scrollTo({
					top: h,
					behavior: 'smooth'
				});
			}
			const set = () => {
				tabLine = document.querySelector('.tab.line');
				tabs = document.querySelectorAll('[data-tab]');
				const img_h = document.querySelector('.brand-head-img img').offsetHeight;
				rect_tab = tabLine.getBoundingClientRect();
				const head_h = document.querySelector('.header').offsetHeight;

				if (img_h < 100) {
					setTimeout(set, 300);
				}

				names = [];
				isService = false;
				h = scroll_wrap.scrollTop + rect_tab.top - head_h - sat;
			}
			set();

			for (let tab of tabs) {
				names.push(tab.dataset.tab);
				tab.addEventListener('click', act);
			}

			isService = (names.indexOf('service') < 0) ? false : true;
			window.addEventListener('resize', set);
		}
	}

	Global.calendarPeriod= {
		init() {
			const calsBtns = document.querySelectorAll('.calendar-tbl td button');
			calsBtns.forEach(item => {
				item.addEventListener('click', this.actSelect.bind(this))
			});
		},
		set(opt) {
			console.log(opt)
			const el_cal = document.querySelectorAll(`.calendar-tbl[data-id="${opt.id}"]`);
			console.log(el_cal);

			el_cal.forEach(cal => {
				const calDate = cal.dataset.yyyymm;
				const dateS = opt.dateStart;
				const dateE = opt.dateEnd;

				let yyyymm_s = dateS.split('-');
				const yearS = yyyymm_s[0];
				const monthS = yyyymm_s[1];
				const dayS = yyyymm_s[2];
				yyyymm_s = yearS + '-' + monthS;
				

				let yyyymm_e = dateE.split('-');
				const yearE = yyyymm_e[0];
				const monthE = yyyymm_e[1];
				const dayE = yyyymm_e[2];
				yyyymm_e = yearE + '-' + monthE;

				cal.dataset.start = false;
				cal.dataset.end = false;

				console.log(yyyymm_s, calDate);

				const calYear = calDate.split('-')[0];
				const calMonth = calDate.split('-')[1];


				if (yyyymm_s === calDate) {
					cal.dataset.start = true;
					cal.dataset.dataS = dayS;
					const btnS = cal.querySelector(`button[data-day="${Number(dayS)}"]`);
					btnS.classList.add('period--start');
					btnS.closest('td').classList.add('period--start-td');
					btnS.closest('tr').classList.add('period--start-tr');
					cal.classList.add('period--complete');
				}
				if (yyyymm_e === calDate) {
					cal.dataset.end = true;
					cal.dataset.dataE = dayE;
					const btnE = cal.querySelector(`button[data-day="${Number(dayE)}"]`);
					btnE.classList.add('period--end');
					btnE.closest('td').classList.add('period--end-td');
					btnE.closest('tr').classList.add('period--end-tr');
					cal.classList.add('period--complete');
				}
				if (Number(yearS) <= Number(calYear) && Number(calYear) <= Number(yearE)) {
					if (Number(monthS) < Number(calMonth) && Number(calMonth) < Number(monthE)) {
						cal.classList.add('period--complete');
					}
				}
			});


			

		},
		actSelect(e) {
			const _this = e.currentTarget;
			const _td = _this.closest('td');
			const _tr = _this.closest('tr');
			const _tbody = _this.closest('tbody');
			const _cal = _this.closest('.calendar-tbl');
			let n = Number(_this.querySelector('.date').innerText.trim());
			const isComplete = _cal.classList.contains('period--complete');

			const removeStart = () => {
				_cal.dataset.dateS = '';
				_cal.dataset.state = 'false';
				_cal.dataset.end = 'false';
				_cal.querySelector('.period--start') && _cal.querySelector('.period--start').classList.remove('period--start');
				_cal.querySelector('.period--start-tr') && _cal.querySelector('.period--start-tr').classList.remove('period--start-tr');
				_cal.querySelector('.period--start-td') && _cal.querySelector('.period--start-td').classList.remove('period--start-td');
			}
			const removeEnd = () => {
				_cal.dataset.dateE = '';
				_cal.dataset.state = 'start';
				_cal.dataset.start = 'true';
				_cal.dataset.end = 'false';
				_cal.querySelector('.period--end') && _cal.querySelector('.period--end').classList.remove('period--end');
				_cal.querySelector('.period--end-tr') && _cal.querySelector('.period--end-tr').classList.remove('period--end-tr');
				_cal.querySelector('.period--end-td') && _cal.querySelector('.period--end-td').classList.remove('period--end-td');
			}
			const removeAll = () => {
				_cal.dataset.dateE = '';
				_cal.dataset.dateS = '';
				_cal.dataset.state = 'false';
				_cal.dataset.start = 'false'
				_cal.dataset.end = 'false';
				_cal.classList.remove('period--complete');
				_cal.querySelector('.period--start') && _cal.querySelector('.period--start').classList.remove('period--start');
				_cal.querySelector('.period--start-tr') && _cal.querySelector('.period--start-tr').classList.remove('period--start-tr');
				_cal.querySelector('.period--start-td') && _cal.querySelector('.period--start-td').classList.remove('period--start-td');
				_cal.querySelector('.period--end') && _cal.querySelector('.period--end').classList.remove('period--end');
				_cal.querySelector('.period--end-tr') && _cal.querySelector('.period--end-tr').classList.remove('period--end-tr');
				_cal.querySelector('.period--end-td') && _cal.querySelector('.period--end-td').classList.remove('period--end-td');
			}

			if (isComplete) {
				removeAll();
			}
			
			// 시작일 선택 
			if (_cal.dataset.state !== 'start' && _cal.dataset.state !== 'end') {
				_cal.dataset.state = 'start';
				_cal.dataset.start = 'true';
				_cal.dataset.dateS = _this.querySelector('.date').innerText.trim();
				_this.classList.add('period--start');
				_tr.classList.add('period--start-tr');
				_td.classList.add('period--start-td');
			}
			// 종료일 선택
			else if (_cal.dataset.state === 'start') {
				// 시작일 재선택, 시작일 취소, 종료일 선택
				if (Number(_cal.dataset.dateS) > n) {
					removeStart();
					_cal.dataset.state = 'start';
					_cal.dataset.start = 'true';
					_cal.dataset.end = 'false';
					_cal.dataset.dateS = n;
					_this.classList.add('period--start');
					_tr.classList.add('period--start-tr');
					_td.classList.add('period--start-td');
				} 
				else if(Number(_cal.dataset.dateS) === n) {
					removeStart();
				}
				else {
					_cal.dataset.state = 'end';
					_cal.dataset.start = 'true';
					_cal.dataset.end = 'true';
					_cal.dataset.dateE = n;
					_cal.classList.add('period--complete');
					_this.classList.add('period--end');
					_tr.classList.add('period--end-tr');
					_td.classList.add('period--end-td');
				}
			}
			// 변경 
			else if (_cal.dataset.state === 'end') {
				if (Number(_cal.dataset.dateE) === n) {
					removeEnd();
					_cal.classList.remove('period--complete');
					_cal.dataset.state = 'start';
					_cal.dataset.start = 'true';
					_cal.dataset.end = 'false';
					_cal.dataset.dateE = '';
				} 
				else if (n === Number(_cal.dataset.dateS)) {
					removeStart();
					removeEnd();
					_cal.classList.remove('period--complete');
					_cal.dataset.state = '';
					_cal.dataset.start = 'false';
					_cal.dataset.end = 'false';
					_cal.dataset.dateS = '';
					_cal.dataset.dateE = '';
				}
				else {
					if (Number(_cal.dataset.dateS) < n) {
						removeEnd();
						_cal.dataset.state = 'end';
						_cal.dataset.start = 'true';
						_cal.dataset.end = 'true';
						_cal.dataset.dateE = n;
						_cal.classList.add('period--complete');
						_this.classList.add('period--end');
						_tr.classList.add('period--end-tr');
						_td.classList.add('period--end-td');
					} 
					else {
						removeStart();
						removeEnd();
						_cal.classList.remove('period--complete');
						_cal.dataset.state = 'start';
						_cal.dataset.start = 'true';
						_cal.dataset.end = 'false';
						_cal.dataset.dateS = n;
						_this.classList.add('period--start');
						_tr.classList.add('period--start-tr');
						_td.classList.add('period--start-td');
					}
				}
			}
		}
	}
})();

/**
 * INPUT TIME
 * in use: OcareUI.parts, OcareUI.scroll
 */
class TimeSelect {
	constructor(opt) {
		this.id = opt.id;
		this.min = "00:00";
		this.max = "24:00";
		this.value = opt.value;
		this.middayUnit = ['오전', '오후'];
		this.miuntUnit = opt.miuntUnit;
		this.timerWheel = null;
		this.nowScrollTop = 0;
		this.hUnit = 0;
		this.el_time = document.querySelector('.mdl-time[data-id="'+ this.id +'"]')

		this.init();
	}
	init () {
		const txt_midday = this.middayUnit;
		const min_time = !!this.min ? this.min : null;
		const max_time = !!this.max ? this.max : null;
		const time = this.value;

		let _time = time.split(':');
		let _time_min = min_time.split(':');
		let _time_max = max_time.split(':');
		let hour = Number(_time[0]);
		let minute = Number(_time[1]);
		let hour_min = Number(_time_min[0]) - 1 < 0 ? 0 : Number(_time_min[0]) - 1;
		let hour_max = Number(_time_max[0]);
		let minute_min = Number(_time_min[1]);
		let minute_max = Number(_time_max[1]);
		let isPM = 0;
		let hour12 = hour;
		let hour_len = 24;

		hour === 0 ? hour = 24 : '';
		hour > 11 ? isPM = 1 : '';
		hour > 23 ? isPM = 0 : '';

		let html = '';
		html += '<div class="mdl-time-wrap">';
		html += '<div class="mdl-time-line"><div></div><div></div><div></div></div>';
		html += '<div class="mdl-time-midday" data-type="midday"><div class="mdl-time-group"></div></div>';
		html += '<div class="mdl-time-hour" data-type="hour"><div class="mdl-time-group"></div></div>';
		html += '<div class="mdl-time-minute" data-type="minute"><div class="mdl-time-group"></div></div>';
		html += '</div>';
		this.el_time.insertAdjacentHTML('beforeend', html);
		html = '';

		const el_midday = this.el_time.querySelector('.mdl-time-midday');
		const el_hour = this.el_time.querySelector('.mdl-time-hour');
		const el_minute = this.el_time.querySelector('.mdl-time-minute');
		
		this.el_time.dataset.midday = isPM;
		this.el_time.dataset.hour = hour;
		this.el_time.dataset.minute = minute;
		this.el_time.dataset.hourMin = Number(_time_min[0]);
		this.el_time.dataset.hourMax = Number(_time_max[0]);
		this.el_time.dataset.minuteMin = Number(_time_min[1]);
		this.el_time.dataset.minuteMax = Number(_time_max[1]);

		//오전,오후
		for (let i = 0; i < 2; i++) {
			const group = el_midday.querySelector('.mdl-time-group');
			let btn = document.createElement('button');
			btn.type = 'button';
			btn.value = i;
			btn.textContent = txt_midday[i];

			if (isPM === i) {
				btn.dataset.selected = true;
			}

			group.appendChild(btn);
			btn = '';				
		}

		//시간
		for (let i = 1; i < hour_len + 1; i++) {
			const group = el_hour.querySelector('.mdl-time-group');
			let btn = document.createElement('button');

			btn.type = 'button';
			btn.value = i;
			btn.textContent = i > 12 ? i - 12 : i;
			
			if ((hour_min + 1 > i && hour_min !== null) || (hour_max < i && hour_max !== null)) {
				btn.disabled = true;
			}
			if (hour === i) {
				btn.dataset.selected = true;
			} 

			group.appendChild(btn);
			btn = '';
		}

		//분
		for (let i = 0; i < 60; i++) {
			if (i === 0 || i % this.miuntUnit === 0) {
				const group = el_minute.querySelector('.mdl-time-group');
				let btn = document.createElement('button');

				btn.type = 'button';
				btn.value = OcareUI.parts.add0(i);
				btn.textContent = OcareUI.parts.add0(i);

				if ((minute_min > i && minute_min !== null && minute_min !== minute_max) || (minute_max < i && minute_max !== null && minute_min !== minute_max)){
					btn.disabled = true;
				}
				if (minute === i) {
					btn.dataset.selected = true;
				}

				group.appendChild(btn);
			}
		}

		this.hUnit = el_hour.querySelectorAll('button')[0].offsetHeight;
		OcareUI.scrollEvent.move({ 
			top: Number(this.hUnit * (isPM ? 1 : 0)), 
			selector: el_midday, 
			effect: 'auto', 
			align: 'default' 
		});
		OcareUI.scrollEvent.move({ 
			top: Number(this.hUnit * (hour - 1)), 
			selector: el_hour, 
			effect: 'auto', 
			align: 'default' 
		});
		OcareUI.scrollEvent.move({ 
			top: Number(this.hUnit * Number(minute / this.miuntUnit)), 
			selector: el_minute, 
			effect: 'auto', 
			align: 'default' 
		});

		//event
		const el_midday_btns = el_midday.querySelectorAll('button');
		const el_hour_btns = el_hour.querySelectorAll('button');
		const el_minute_btns = el_minute.querySelectorAll('button');

		for (let btn of el_minute_btns) {
			btn.addEventListener('click', this.action);
		}
		for (let btn of el_hour_btns) {
			btn.addEventListener('click', this.action);
		}
		for (let btn of el_midday_btns) {
			btn.addEventListener('click', this.action);
		}
		
		el_midday.removeEventListener('touchstart', this.action);
		el_hour.removeEventListener('touchstart', this.action);
		el_minute.removeEventListener('touchstart', this.action);
		el_midday.addEventListener('touchstart', this.action);
		el_hour.addEventListener('touchstart', this.action);
		el_minute.addEventListener('touchstart', this.action);
		el_midday.addEventListener('mousedown', this.action);
		el_hour.addEventListener('mousedown', this.action);
		el_minute.addEventListener('mousedown', this.action);
		el_midday.addEventListener('wheel', this.action);
		el_hour.addEventListener('wheel', this.action);
		el_minute.addEventListener('wheel', this.action);
	}
	set(opt) {
		this.value = opt.value;

		const min_time = !!this.min ? this.min : null;
		const max_time = !!this.max ? this.max : null;
		const time = this.value;

		let _time = time.split(':');
		let _time_min = min_time.split(':');
		let _time_max = max_time.split(':');
		let hour = Number(_time[0]);
		let minute = Number(_time[1]);
		let isPM = 0;

		hour === 0 ? hour = 24 : '';
		hour > 11 ? isPM = 1 : '';
		hour > 23 ? isPM = 0 : '';

		const el_midday = this.el_time.querySelector('.mdl-time-midday');
		const el_hour = this.el_time.querySelector('.mdl-time-hour');
		const el_minute = this.el_time.querySelector('.mdl-time-minute');
		
		const el_midday_btn = el_midday.querySelector('[data-selected="true"]');
		const el_hour_btn = el_hour.querySelector('[data-selected="true"]');
		const el_minute_btn = el_minute.querySelector('[data-selected="true"]');

		const el_midday_btns = el_midday.querySelectorAll('button');
		const el_hour_btns = el_hour.querySelectorAll('button');
		const el_minute_btns = el_minute.querySelectorAll('button');
		
		const n_midday =  Number((isPM ? 1 : 0));
		const n_hour =  Number((hour - 1));
		const n_minute =  Number(minute / this.miuntUnit);

		el_midday_btn.removeAttribute('data-selected');
		el_hour_btn.removeAttribute('data-selected');
		el_minute_btn.removeAttribute('data-selected');
		el_midday_btns[n_midday].dataset.selected = 'true';
		el_hour_btns[n_hour].dataset.selected = 'true';
		el_minute_btns[n_minute].dataset.selected = 'true';

		this.el_time.dataset.midday = isPM;
		this.el_time.dataset.hour = hour;
		this.el_time.dataset.minute = minute;
		this.el_time.dataset.hourMin = Number(_time_min[0]);
		this.el_time.dataset.hourMax = Number(_time_max[0]);
		this.el_time.dataset.minuteMin = Number(_time_min[1]);
		this.el_time.dataset.minuteMax = Number(_time_max[1]);

		OcareUI.scrollEvent.move({ 
			top: Number(this.hUnit * n_midday), 
			selector: el_midday, 
			effect: 'auto', 
			align: 'default' 
		});
		OcareUI.scrollEvent.move({ 
			top: Number(this.hUnit * n_hour), 
			selector: el_hour, 
			effect: 'auto', 
			align: 'default' 
		});
		OcareUI.scrollEvent.move({ 
			top: Number(this.hUnit * n_minute), 
			selector: el_minute, 
			effect: 'auto', 
			align: 'default' 
		});
	}
	action = (e) => {
		const _this = this;
		const event = e;
		const that = e.currentTarget;
		const eType = e.type;
		const unit = this.miuntUnit;
		const el_time = that.closest('.mdl-time');
		const el_wrap = that.closest('.mdl-time-wrap');
		const el_midday = el_wrap.querySelector('.mdl-time-midday');
		const el_midday_button = el_midday.querySelectorAll('button');
		const el_hour = el_wrap.querySelector('.mdl-time-hour');
		const el_hour_button = el_hour.querySelectorAll('button');

		let isPM = Number(el_wrap.dataset.midday);
		let timerScroll = null;
		let touchMoving = null;
		let type_time = null;
		let that_wrap = null;
		let wrapT = 0;
		let getScrollTop = 0;
		let currentN = 0;
		let actEnd;
		let midday_n;

		const selectedInit = (v, el) => {
			const n = v;
			const btns = el;
			const val = btns[n].value;
			
			for (let i = 0, len = btns.length; i < len; i++) {
				if (!!btns[i].dataset.selected) {
					delete btns[i].dataset.selected;
				}
				if (val === btns[i].value) {
					btns[i].dataset.selected = true;
				} 
			}
			if (type_time === 'hour') {
				if (val < 12) {
					isPM = 0;
					el_midday_button[0].dataset.selected = true;
					el_midday_button[1].dataset.selected = false;
				} else if (val > 11 && val < 24) {
					isPM = 1;
					el_midday_button[1].dataset.selected = true;
					el_midday_button[0].dataset.selected = false;
				} else if (val > 23 ) {
					isPM = 0;
					el_midday_button[0].dataset.selected = true;
					el_midday_button[1].dataset.selected = false;
				}
				
				OcareUI.scrollEvent.move({ 
					top: Number(this.hUnit * isPM), 
					selector: el_midday
				});
				
				el_wrap.dataset.hour = currentN + 1;
				el_wrap.dataset.midday = isPM;
			}
		}
		const scrollSelect = (v, el) => {
			const btn = el.querySelectorAll('button');
			const len = btn.length;
			const n = v < 0 ? 0 : v > len - 1 ? len - 1 : v;
			
			el.scrollTo({
				top: this.hUnit * n,
				behavior: 'smooth'
			});
			selectedInit(n, el.querySelectorAll('button'));

		}
		const actMove = () => {
			touchMoving = true;
			getScrollTop = Math.abs(that_wrap.getBoundingClientRect().top - wrapT);
			that.addEventListener('touchcancel', actEnd);
			that.addEventListener('touchend', actEnd);

		}
		const actValue = (v, w) => {
			let n_hour = Number(v.dataset.hour);
			currentN = Math.floor((Math.floor(getScrollTop) + (this.hUnit / 2)) / this.hUnit);

			switch (eType) {
				case 'touchstart' :
				case 'mousedown' :
				case 'wheel' :
					scrollSelect(currentN, that);
					break;

				case 'click' : 
					currentN = w;
					break;
			}

			//dataset 값 설정
			switch (type_time) {
				case 'midday':
					if (!n_hour) {
						n_hour = Number(el_time.dataset.hour);
					}
					eType === 'mousedown' ? currentN = midday_n : '';
					el_hour_button[n_hour - 1].dataset.selected = false;

					if (currentN < 1) {
						//오전
						if (n_hour === 12) {
							isPM = 1;
							n_hour = n_hour + 12;
						} else if (n_hour > 12) {
							isPM = 0;
							n_hour = n_hour - 12;
						} else {
							isPM = 0;
						}
					} else {
						//오후
						if (n_hour === 24) {
							isPM = 0;
							n_hour = n_hour - 12;
						} else if (n_hour < 12) {
							isPM = 1;
							n_hour = n_hour + 12;
						} else {
							isPM = 1;
						}
					}

					el_hour_button[n_hour - 1].dataset.selected = true;
					OcareUI.scrollEvent.move({ 
						top: Number(this.hUnit * (n_hour - 1)), 
						selector: el_hour
					});

					el_wrap.dataset.midday = isPM;
					el_wrap.dataset.hour = n_hour;
					break;

				case 'minute':
					el_wrap.dataset.minute = OcareUI.parts.add0(currentN * unit);
					break;
			}

			const _m = el_time.querySelector('.mdl-time-minute button[data-selected="true"]').value;
			const _h = el_time.querySelector('.mdl-time-hour button[data-selected="true"]').value;
			
			el_time.dataset.minute = _m;
			el_time.querySelector('.mdl-time-wrap').dataset.minute = _m;
			el_time.dataset.hour = _h;
			el_time.querySelector('.mdl-time-wrap').dataset.hour = _h;
		}
		
		//touch 이벤트 종료시 가까운 값으로 추가 이동
		actEnd = () => {
			const scrollCompare = () => {
				timerScroll = setTimeout(() => {
					if (getScrollTop !== Math.abs(that_wrap.getBoundingClientRect().top - wrapT)) {
						getScrollTop = Math.abs(that_wrap.getBoundingClientRect().top - wrapT);
						scrollCompare();
					} else {
						actValue(that_wrap.closest('.mdl-time-wrap'));
					}
					that.removeEventListener('touchmove', actMove);
					that.removeEventListener('touchend', actEnd);
					that.removeEventListener('touchcancel', actEnd);
				},20);
			} 
			touchMoving && scrollCompare();
		}
		
		//이벤트 click & touch
		const eventList = {
			click (){
				const el_p = that.parentNode;
				const el_pp = that.parentNode.parentNode;
				const btns = el_p.querySelectorAll('button');
				const nodes = [... e.target.parentElement.children];
				let index = Number(nodes.indexOf(e.target));

				that_wrap = el_pp.querySelector('.mdl-time-group');
				type_time = el_pp.dataset.type;
				wrapT = el_pp.getBoundingClientRect().top;
				currentN = 0;
				
				el_pp.scrollTo({
					top: _this.hUnit * index,
					behavior: 'smooth'
				});
				
				
				selectedInit(index, btns);
			},
			wheel(){
				type_time = that.dataset.type;
				that_wrap = that.closest('.mdl-time-wrap');
				
				event.preventDefault();
				if (event.deltaY > 0) {//아래로
					getScrollTop = that.scrollTop + _this.hUnit;
				} else if (event.deltaY < 0) {//위로
					getScrollTop = that.scrollTop - _this.hUnit;
				}
				actValue(that_wrap);
			},
			mousedown() {
				const btns = that.querySelectorAll('button');
				const tn = that.scrollTop;
				const ts = e.pageY - tn;

				if (e.target.type !== 'button') {
					return false
				}

				const _wrap = e.target.closest('.mdl-time-midday');
				_wrap ? midday_n = e.target.value : midday_n = null;

				type_time = that.dataset.type;
				that_wrap = that.querySelector('.mdl-time-group');
				wrapT = that.getBoundingClientRect().top;
				
				const onMouseMove = (e) => {
					const tm = e.pageY - tn;
					that.scrollTo(0, tn + ts - tm);

					for (let btn of btns) {
						btn.removeEventListener('click', _this.action);
					}
				}
				
				document.addEventListener('mousemove', onMouseMove);
				document.onmouseup = (e) => {
					
					document.removeEventListener('mousemove', onMouseMove);
					document.onmouseup = null;
					getScrollTop = Math.abs(that_wrap.getBoundingClientRect().top - wrapT);

					actValue(that_wrap.closest('.mdl-time'));

					setTimeout(() => {
						for (let btn of btns) {
							 btn.addEventListener('click',_this.action);
						}
					},0);
				}
			},
			touchstart() {
				that_wrap = that.querySelector('.mdl-time-group');
				type_time = that.dataset.type;
				wrapT = that.getBoundingClientRect().top;
				currentN = 0;
				getScrollTop = Math.abs(that_wrap.getBoundingClientRect().top - wrapT);

				clearTimeout(timerScroll);
				that.addEventListener('touchmove', actMove);
			}
		}
		eventList[eType]();
	}
}

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
	reset() {
		document.querySelector('.ocr-ocaremain-content').scrollTo(0,0);
		OcareUI.exe.swiperOcare.slideTo(0);
		document.querySelector('.ocr-main-ocare').classList.remove('is-scroll');
		
	}
	init () {
		if (this.body.dataset.loading === 'true') {
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
						// setTimeout(OcareUI.exe.stampPieGraph.lineDraw, 1200);
						
					} 
				} else {
					OcareUI.callback.ocaremain2 = (v) => {
					    if (v.start > 50 && !once_ocaremain2) {
					        once_ocaremain2 = true;
					        // OcareUI.exe.stampPieGraph.lineDraw();
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
		this.bntTab = document.querySelectorAll('.mdl-tab-btn[data-tab="'+ this.tab +'"]');
		this.init();
	}

	init() {
		const tabs = this.bntTab;
		const tabwrap = tabs[0].closest('.mdl-tab-wrap');
		const tab = tabwrap.closest('.mdl-tab');

		if (!!OcareUI.exe[this.tab]) {
			OcareUI.exe[this.tab].remove();
		}
		tab.dataset.sum = tabs.length;
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
	remove() {
		const tabs = this.bntTab;

		for (let tab of tabs) {
			tab.removeEventListener('click', this.act);
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
		
		tab.dataset.scroll = (n <= tabW) ? 'true' : 'false';
	}
	act = (v) => {
		let btn = v.currentTarget;
		const tab = this.tab;
		
		if (!v.currentTarget) {
			btn = document.querySelector('.mdl-tab-btn[data-tab="'+ tab +'"][data-id="'+ v +'"]');
		}

		const name =  !!btn.dataset.name ? btn.dataset.name : btn.innerText;
		const id = btn.dataset.id;
		const callback = btn.dataset.callback;
		const btn_selected =  document.querySelector('.mdl-tab-btn[data-tab="'+ tab +'"][aria-selected="true"]');
		const isPnl = document.querySelector('.mdl-tab-pnl[data-tab="'+ tab +'"]');
		const wrap = btn.parentNode;

		!!callback && OcareUI.callback.tab[callback]({
			id: tab, 
			current: id, 
			name: name 
		});
		
		!!btn_selected && btn_selected.setAttribute('aria-selected', false);
		btn.setAttribute('aria-selected', true);

		this.current = id;
		
		!!v.isTrusted ? OcareUI.state.ing = true : '';
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
						OcareUI.callback.scroll[callback]();
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
		v !== undefined ? this.current = v.current : '';

		const accoId = this.accoId;
		const el_acco = document.querySelector('.mdl-acco[data-id="' + accoId +'"]');
		const current = this.current;
		const callback = this.callback;
		let state = this.state === undefined ? 'toggle' : this.state;
		const autoclose = this.autoclose;
		let el_wraps = el_acco.querySelectorAll('.mdl-acco-wrap');
		let el_pnl;
		let el_tit;
		let el_btn;
		let len = el_wraps.length;

		!!v?.state ? state = v.state : '';
		
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
		
	}
}

//객관식문제 : 월간오케어 미션
class MultipleChoice {
	constructor(opt) {
		this.id = opt.id;
		this.answer = opt.answer;
		this.callback = opt.callback;
		this.init();
	}
	init () {
		const wrap = document.querySelector('.ui-multiplechoice[data-id="'+ this.id +'"]');
		const items = wrap.querySelectorAll('.ui-multiplechoice-item');

		for (let item of items) {
			item.addEventListener('change', this.answerCheck);
		}
	}
	answerCheck = (event) => {
		let ox = false;

		if (typeof this.answer === 'object') {
			for (let i = 0; i < this.answer.length; i++) {
				if (Number(event.target.value) === this.answer[i]) {
					ox = true;
				}
			}
			
			!!this.callback && this.callback(ox);
		} else {
			!!this.callback && this.callback(Number(event.target.value) === this.answer);
		}
		if (!this.answer) {
			!!this.callback && this.callback(event.target.value);
		}
	}

}
class YearMonthSelect {
	constructor (opt) {
		this.now = new Date();
		this.now_y = this.now.getFullYear();
		this.now_m = this.now.getMonth() + 1;
		this.id = opt.id;
		this.base =  document.querySelector('[data-id="'+ this.id +'"]')
		this.swiper = this.base.querySelector('.swiper');
		this.swiperWrap = this.swiper.querySelector('.swiper-wrapper');
		this.tit = this.base.querySelector('.ocr-year-tit');
		this.prev = this.base.querySelector('.ocr-year-prev');
		this.next = this.base.querySelector('.ocr-year-next');
		this.year = this.now_y;
		this.month = this.now_m;
		this.callback = opt.callback;
		this.ing = false;

		this.init();
	}
	init () {
		this.monthAct();
		this.prev.addEventListener('click', this.prevAct);
		this.next.addEventListener('click', this.nextAct);
		this.prev.disabled = (this.now_y === 2023) ? true : false;
		this.next.disabled = this.now_m === 12 ? false : true;
	}
	monthAct () {
		const n = this.year === 2023 ? 4 : 0;
		this.tit.textContent = this.year;
		let max_m;

		if (this.year === this.now_y) {
			max_m = this.now_m === 12 ? this.now_m : this.now_y < this.year? this.now_m : this.now_m + 1;
		} 
		else if (this.year < this.now_y) {
			max_m = 12;
		}
		else {
			max_m = this.month === 12 ? this.month :  this.now_y < this.year? this.month : this.month + 1;
		}

		for (let i = n; i < max_m; i++) {
			const sMont = ('0' + (1 + i )).slice(-2);
			const sYeNo = this.year + '-' + sMont;
		   	const item = '<div class="swiper-slide"><button type="button" class="mdl-btn marginMonth" data-yemo="'+ sYeNo +'" data-year="'+ this.year +'" data-month="'+ (i + 1) +'"><em class="mdl-btn-em">'+ (i + 1) +'월</em></button></div>';
		   	this.swiperWrap.insertAdjacentHTML('beforeend', item);
		}

		this.year <= 2023 ? this.prev.disabled = true : this.prev.disabled = false;
		this.swiperAct();
	}
	nextAct = (v) => {
		this.swiperWrap.innerHTML = '';
		OcareUI.exe[this.id].destroy();
		this.year = this.year + 1;
		this.month = 1;
		this.monthAct();
		this.callback({
			year: this.year,
			month: 1
		});

		if (this.now_y < this.year) {
			this.next.disabled = true;
		} else if (this.now_y === this.year) {
			this.next.disabled = this.now_m === 12 ? false : true;
		}

	}
	prevAct = (v) => {
		this.swiperWrap.innerHTML = '';
		OcareUI.exe[this.id].destroy();
		this.year = this.year - 1;
		this.month = 12;
		// if (this.year <= 2023) {
		// 	this.year = 2023;
		// 	this.month = this.now_m;
		// 	this.callback({
		// 		year: this.year,
		// 		month: this.now_m
		// 	});
		// } else {
		// 	this.callback({
		// 		year: this.year,
		// 		month: 1
		// 	});
		// }
		this.monthAct();

		if (this.now_y === this.year && this.now_m === 12) {
			this.next.disabled = false;
		}
		else if (this.now_y > this.year) {
			this.next.disabled = false;
			this.prev.disabled = false;
		}
		
		if (this.year === 2023) {
			this.prev.disabled = true;
		}
	}
	swiperAct () {
		const monthAct = (e) => {
			this.ing = true;
			const btn = e.currentTarget;
			const wrap = btn.closest('.swiper-slide');
			let n = wrap.getAttribute('aria-label').split('/');
			n = Number(n[0] - 1);
			OcareUI.exe[this.id].slideTo(n);
			
			callback({
				year: this.year,
				month: Number(btn.dataset.month)
			});
		}
		const btns = document.querySelectorAll('.ocr-month .swiper button');
		
		for (let btn of btns) {
			btn.addEventListener('click', monthAct);
		}
		
		const _this = this;
		const callback = this.callback;
		const current = this.year === 2023 ? this.month - 5 : this.month - 1;
		
		OcareUI.exe[this.id] = new Swiper(this.swiper, {
			centeredSlides: true,
			spaceBetween: 0,
			initialSlide: current,
			slidesPerView: 5,
			clickable: true,
			on:{
				slideChangeTransitionStart() {
					if (!_this.ing) {
						callback({
							year: _this.year,
							month: (_this.year <= 2023) ? this.activeIndex + 5 : this.activeIndex + 1
						});
					} 
					_this.ing = false;
				}
			}
		});
	}
}
class HightShow{
	constructor(opt){
		this.id = opt.id;
		this.height = opt.height;
		this.base =  document.querySelector('[data-id="'+ this.id +'"]');
		this.baseHeight = this.base.clientHeight;
		this.basetag = this.base.querySelector('.ocr-hashtag');
		this.btn = this.base.querySelector('.hash-btn');
		this.init();
	}
	init () {
		this.base.removeAttribute('style');
		this.btn.style.display = 'none';
		this.heightCheck();
	}
	heightCheck() {
		this.baseHeight = this.base.clientHeight;

		if (this.baseHeight === 0) {
			setTimeout(()=> {
				this.heightCheck();
			},100);
		} else {
			if(this.baseHeight <= this.height){
				this.btn.style.display = 'none';
				this.base.style.height = 'auto';
			}else{
				this.btn.style.display = '';
				this.base.style.height = this.height + 'px';
			}
		}	
	}
}
class EyesightGameRotation {
	constructor (opt) {
		this.wrap = document.querySelector('.game-eyes-bingle-wrap');
		this.btns = document.querySelectorAll('.game-eyes-bingle-btn');
		this.level = opt.level; 
		this.repeat = 1;
		this.turn = 1;
		this.repeat_limit = 3;
		this.rotate_max = 1000;
		this.rotate_min = 900;
		this.callback_o = opt.callback_o;
		this.callback_x = opt.callback_x;
	}
	init () {
		this.repeat = 1;
		this.turn = 1;
		this.repeat_limit = 3;
		this.rotate_max = 1000;
		this.rotate_min = 900;
		this.wrap.dataset.state = 'play';

		switch (this.level) {
			case 1 : 
				this.rotate_max = 400;
				this.rotate_min = 200;
				this.repeat_limit = 4;
				break;
			case 2 : 
				this.rotate_max = 600;
				this.rotate_min = 400;
				this.repeat_limit = 5;
				break;
			case 3 : 
				this.rotate_max = 800;
				this.rotate_min = 500;
				this.repeat_limit = 6;
				break;
		}
		
		this.act();
		this.wrap.removeEventListener('transitionend', this.actRepeat);
		this.wrap.addEventListener('transitionend', this.actRepeat);
	}
	answer() {
		const act = (event) => {
			if (event.currentTarget.dataset.n === '0') {
				for (let btn of this.btns) {
					btn.removeEventListener('click', act);
				}
				this.callback_o();
				this.wrap.dataset.state = 'complete';
			} else {
				this.callback_x();
			}
		}

		for (let btn of this.btns) {
			btn.addEventListener('click', act);
		}
	}
	actRepeat = (event) => {
		if (this.repeat < this.repeat_limit) {
			this.repeat = this.repeat + 1;
			this.act();
		} else {
			this.answer();
		}
	}
	act = (event) => {
		let rNum = Math.floor(Math.random() * this.rotate_max);
		rNum = rNum + 90;
		this.wrap.style.transition = 'transform 2.2s ease-in'
		this.wrap.style.transform = 'rotate('+ (rNum * this.turn) +'deg)';
		this.turn = this.turn > 0 ? -1 : 1;
	}
}
class EyesightGameSearch {
	constructor (opt) {
		this.wrap = document.querySelector('.game-eyes-search-board');
		this.btns = this.wrap.querySelectorAll('.game-eyes-search-btn');
		this.level = opt.level; 
		this.repeat = 1;
		this.repeat_limit = 10;
		this.speed = 100;
		this.m = 0;
		this.s = 1;
		this.callback_o = opt.callback_o;
		this.callback_x = opt.callback_x;
	}
	init() {

		this.repeat = 1;

		switch (this.level) {
			case 1 : 
				this.speed = 200;
				this.rotate_min = 200;
				this.repeat_limit = 8;
				break;
			case 2 : 
				this.speed = 100;
				this.repeat_limit = 10;
				break;
			case 3 : 
				this.speed = 40;
				this.repeat_limit = 16;
				break;
		}

		this.act();
	}
	act = (event) => {
		let rNum = Math.floor(Math.random() * 9);
		this.m = rNum;

		rNum = Math.floor(Math.random() * 9);
		this.s = rNum;

		this.wrap.dataset.state = 'ready';
		const _m = this.wrap.querySelector('.game-eyes-search-btn[data-target="m"]');
		const _s = this.wrap.querySelector('.game-eyes-search-btn[data-target="s"]');
		_m ? _m.dataset.target = '' : '';
		_s ? _s.dataset.target = '' : '';

		
		this.btns[this.s].dataset.target = 's';
		this.btns[this.m].dataset.target = 'm';

		if (this.repeat < this.repeat_limit) {
			this.repeat = this.repeat + 1;
			setTimeout(this.act, this.speed);
		} else {
			setTimeout(() => {
				this.wrap.dataset.state = 'search';
				this.answer();
			}, this.speed);
		}
	}
	answer() {
		const act = (event) => {
			if (event.currentTarget.dataset.target === 'm') {
				for (let btn of this.btns) {
					btn.removeEventListener('click', act);
				}
				this.callback_o();
				this.wrap.dataset.state = 'complete';
			} else {
				this.callback_x();
			}
		}

		for (let btn of this.btns) {
			btn.addEventListener('click', act);
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
		this.timer;
		this.timer2;
	}
	
	init = (e) => {
		let w = this.el.offsetWidth;
		window.removeEventListener('resize', this.init);
		window.addEventListener('resize', this.init);
		
		let n = 0;

		clearTimeout(this.timer);
		clearTimeout(this.timer2);

		const loop = () => {
			if (this.loop) {
				n = 0;
				this.timer2 = setTimeout(act, this.delay);
			}
		}

		this.el.style.backgroundSize = (w * this.fps) + 'px auto';
		const act = () => {
			this.el.style.backgroundPositionX = (w * n) * -1 + 'px';
			n = n + 1;
			this.fps > n ? this.timer = setTimeout(act, this.speed) : loop();
		}
		act();
	}
}

class GraphCheckup{
	constructor(opt){
		this.id = opt.id + '_a';
		this.title = opt.title;
		this.unit = opt.unit;
		this.data = opt.data;
		this.area = opt.area;
		this.graph = document.querySelector('.mdl-graph[data-id="'+ this.id +'"]');
		this.wrap = this.graph.closest('.mdl-wrap');
		this.txt_title = this.wrap.querySelector('[data-text="title"]');
		this.txt_state = this.wrap.querySelector('[data-text="state"]');
		this.txt_value = this.wrap.querySelector('[data-text="value"]');
		this.txt_unit = this.wrap.querySelector('[data-text="unit"]');
		this.init();
	}
	init() {
		let color = '';
		let html_gauge = '';
		let max_value = -Infinity; //초기 maxMaxValue 값을 -Infinity로 설정한 이유는 배열 내 max 값들보다 작은 값이 초기값으로 설정
		let scaled_standard = '';
		let scaled_item = '';

		if (this.data === null || !this.data.length) {
			this.graph.classList.add('null');
			this.graph.innerHTML = '<div data-icon="none">결과 수치가 없어요.</div>'
			return false;
		}
		html_gauge += '<div class="mdl-graph-wrap">';
		html_gauge += '<div class="mdl-graph-items">';
		html_gauge += '</div>';
		html_gauge += '<div class="mdl-graph-area">'
		html_gauge += '</div>';
		html_gauge += '<div class="mdl-graph-value">';
		html_gauge += '</div>';
		html_gauge += '</div>';

		this.graph.innerHTML = html_gauge;
		
		for(let area of this.area){
			if( area.max > max_value){
				max_value = area.max;
			}
		}

		this.txt_title.textContent = this.title;
		this.txt_unit.textContent = this.unit;
		this.title !== '요단백' ? this.txt_value.textContent = this.data[0].value : '';
		
		for(let i = 0; i < this.area.length; i++){
			if(this.data[0].value >= this.area[i].min && this.data[0].value <= this.area[i].max){
				this.txt_state.textContent = this.area[i].state;

				switch (this.area[i].state) {
					case OcareUI.state.healthStep[0] : this.wrap.dataset.state = 'A'; 
						break;
					case OcareUI.state.healthStep[1]: this.wrap.dataset.state = 'B'; 
						break;
					case OcareUI.state.healthStep[2]: this.wrap.dataset.state = 'C'; 
						break;
				}
			}

			if(this.data[0].value >= max_value){
				scaled_standard = (this.area[i].min / max_value) * 100;
				max_value = this.data[0].value;
				this.area[this.area.length - 1].max = max_value;
			}else{
				scaled_standard = (this.area[i].min / max_value) * 100;
				
			}
			if(this.area.length === 2){
				scaled_item = (100 / this.area.length).toFixed(1);
			}else{
				scaled_item = (this.area[i].max - this.area[i].min) / 2 + this.area[i].min;

			}
			

			const item = '<div class="mdl-graph-item" style="width:'+ scaled_item + '%;"><span>'+ this.area[i].state + '</span></div>';
			const area = '<span style="width:'+ scaled_standard + '%' + '" data-name="'+ this.area[i].min +'"></span>';
			this.graph.querySelector('.mdl-graph-items').insertAdjacentHTML('beforeend', item);
			this.graph.querySelector('.mdl-graph-area').insertAdjacentHTML('beforeend', area);
			
		}
		
		const scaled_average = (this.data[0].average / max_value) * 100;
		const scaled_value = (this.data[0].value / max_value ) * 100;
		const average = '<span class="average" style="left:'+ scaled_average +'%'+'"><span class="mdl-graph-value-name">'+ this.data[0].average +'</span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none"><path d="M6.37963 6.5571L11.2925 0.825396C11.5705 0.501059 11.3401 -2.88466e-08 10.9129 -4.75191e-08L1.08711 -4.77018e-07C0.659933 -4.9569e-07 0.429479 0.501059 0.707481 0.825396L5.62037 6.5571C5.81992 6.78991 6.18008 6.78991 6.37963 6.5571Z" fill="#CCCCCC"/></svg></span>' 
		const value = '<span class="value" style="left:'+ scaled_value +'%;background-color: '+ color + ';"><span class="mdl-graph-value-name">'+ this.data[0].value +'</span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none"><path d="M6.37963 6.5571L11.2925 0.825396C11.5705 0.501059 11.3401 -2.88466e-08 10.9129 -4.75191e-08L1.08711 -4.77018e-07C0.659933 -4.9569e-07 0.429479 0.501059 0.707481 0.825396L5.62037 6.5571C5.81992 6.78991 6.18008 6.78991 6.37963 6.5571Z" fill="' + color +'"/></svg></span>' 
		
		if(scaled_average <= 0){
			this.graph.querySelector('.mdl-graph-value').insertAdjacentHTML('beforeend', '');
		}else{
			this.graph.querySelector('.mdl-graph-value').insertAdjacentHTML('beforeend', average);
		}
		this.graph.querySelector('.mdl-graph-value').insertAdjacentHTML('beforeend', value);
		
	}
}
class GraphStepBar {
	constructor(opt) {
		this.id = opt.id;
		this.data = opt.data;
		this.callback = opt.callback;
		this.graph = document.querySelector('.mdl-graph[data-id="'+ this.id +'"]');
	}
	updata(opt){
		this.id = opt.id;
		this.data = opt.data;
		this.callback = opt.callback;
		this.graph = document.querySelector('.mdl-graph[data-id="'+ this.id +'"]');
		this.init();
	}
	init() {
		let sum = 0;
		let html_bar = '';
		for (let i = 0; i < this.data.length; i++) {
			sum += this.data[i].value;
		}
		for (let i = 0; i < this.data.length; i++) {
			if (this.data[i].value !== 0) {
				html_bar += '<div class="mdl-graph-item n'+ i +'" data-value="'+ this.data[i].value +'" aria-label="' + this.data[i].label + '" style="width: '+ (this.data[i].value / sum * 100) +'%"></div>';	
			}
		}
		this.graph.innerHTML = html_bar;

		!!this.callback && this.callback({
			id: this.id,
			data: this.data
		});


	}
	remove() {
		
	}
}
class GraphY {
	constructor(opt) {
		this.type = !opt.type ? 'score' : opt.type;
		this.id = opt.id;
		this.title = opt.title;
		this.sum = opt.sum;
		this.time = opt.time;
		this.range = opt.range;
		this.unit = opt.unit;
		this.labelY = opt.labelY;
		this.data = opt.data;
		this.callback = opt.callback;
		this.linesum = opt.linesum;
		this.day = opt.day;
		this.graph = document.querySelector('.mdl-graph[data-id="'+ this.id +'"]');
	}
	updata(opt) {
		this.type = !opt.type ? 'score' : opt.type;
		this.id = opt.id;
		this.title = opt.title;
		this.sum = opt.sum;
		this.time = opt.time;
		this.range = opt.range;
		this.unit = opt.unit;
		this.labelY = opt.labelY;
		this.data = opt.data;
		this.callback = opt.callback;
		this.linesum = opt.linesum;
		this.day = opt.day;
		this.graph = document.querySelector('.mdl-graph[data-id="'+ this.id +'"]');
		this.init();
	}
	init() {
		// 최소 최대값 체크하여 최대치 변경
		let minmax = [];
		for (let i = 0; i < this.data.length; i++) {
			minmax.push(this.data[i].value);
		}

		let max = Math.max.apply(null, minmax);
		let n = Number(this.range.slice(-1)[0]);
		(max > n) ? n = max : '';

		let sum = n - Number(this.range[0]);
		const tit = !!this.title ? this.title : '';

		//배경라인 및 그래프 기본 생성
		let html_bar = '';		
			if (!!this.linesum) {
				html_bar += '<div class="mdl-graph-y">';
					for (let i = 0; i <= this.linesum; i++) {
						html_bar += '<div class="mdl-graph-y-n"><span></span></div>';
					}
				html_bar += '</div>';
			}
			
			if ((this.type === 'sleep_step' || this.type === 'breath_step' ) && !!this.time) {
				let s_h = Number(this.time[0][0]);
				let s_m = Number(this.time[0][1]);
				let e_h = Number(this.time[1][0]);
				let e_m = Number(this.time[1][1]);
				let is24Over = false;

				if ((this.day && s_h === e_h && s_m > e_m) || (this.day && s_h > e_h) || (!this.day && s_h <= e_h)) {
					is24Over = false;
				} else {
					is24Over = true;
				}	

				//mm 수면시간 전체 분
				let mm;
				let len = 0;
				
				if (s_h > e_h) {
					len = (24 - s_h + e_h);
					mm = len * 60;
				} else if (s_h === e_h) { 
					if (is24Over) {
						len = (24 + e_h - s_h);
						mm = len * 60;
					} else {
						if (s_m > e_m) {
							len = 24;
							mm = len * 60;
						} else {
							len = (e_h - s_h);
							mm = len * 60;
						}
					}
				} else {
					len = (e_h - s_h);
					mm = len * 60;
				}

				if (s_m !== 0) {
					mm = mm - 60;
					mm = mm + (60 - s_m) + e_m;
				}
				
				//1분단 %, 시작시간에서 다음 정각까지 남은 분
				const m1_per = 100 / mm;
				const add_per = m1_per * (60 - s_m);
				 
				//x축 표시될 레이블 
				let hour = (s_h > e_h) ? (24 - s_h + e_h) : (e_h - e_h);
				hour = s_m !== 0 ? hour - 1 : hour;
			 
				html_bar += '<div class="mdl-graph-label-x">';
				html_bar += '<div class="mdl-graph-label-wrap">';
				html_bar += '<div class="mdl-graph-label-x-n first" style="left:0%"><span>'+ s_h +':'+ s_m +'</span></div>';

				for (let i = 1; i < len; i++) {
					const _m = ((60 * (i - 1)) * m1_per) + add_per;
					let _hidden = true;
					const _t24 = (s_h + i) > 23 ? (s_h + i) - 24 : (s_h + i);

					switch (len) {
						case 1:
						case 2:
						case 3: _hidden = false;
						break; 
						case 4:
							_hidden = (i === 2) ? false : true;
						break;
						case 5:
							_hidden = (i === 2 || i === 3) ? false : true;
						break;
						case 6:
							_hidden = (i === 2 || i === 4) ? false : true;
						break;
						case 7:
							_hidden = (i === 2 || i === 5) ? false : true;
						break;
						case 8:
							_hidden = (i === 3 || i === 5) ? false : true;
						break;
						case 9:
							_hidden = (i === 3 || i === 6) ? false : true;
						break;
						case 10:
							_hidden = (i === 3 || i === 5 || i === 7) ? false : true;
						break;
						case 11:
							_hidden = (i === 4 || i === 7) ? false : true;
						break;
						case 12:
							_hidden = (i === 4 || i === 8) ? false : true;
						break;
						case 13:
							_hidden = (i === 5 || i === 8) ? false : true;
						break;
						case 14:
							_hidden = (i === 5 || i === 9) ? false : true;
						break;
						case 15:
							_hidden = (i === 5 || i === 10) ? false : true;
						break;
						case 16:
							_hidden = (i === 4 || i === 8 || i === 12) ? false : true;
						break;
						case 17:
							_hidden = (i === 6 || i === 11) ? false : true;
						break;
						case 18:
							_hidden = (i === 5 || i === 9 || i === 13) ? false : true;
						break;
						case 19:
							_hidden = (i === 6 || i === 13) ? false : true;
						break;
						case 20:
							_hidden = (i === 6 || i === 10 || i === 14) ? false : true;
						break;
						case 21:
							_hidden = (i === 4 || i === 8 || i === 13 || i === 17) ? false : true;
						break;
						case 22:
							_hidden = (i === 6 || i === 11 || i === 16) ? false : true;
						break;
						case 23:
							_hidden = (i === 5 || i === 9 || i === 14 || i === 18) ? false : true;
						break;
						case 24:
							_hidden = (i === 6 || i === 12 || i === 18) ? false : true;
						break;
						case 25:
							_hidden = (i === 6 || i === 12 || i === 18) ? false : true;
						break;
					}

					if (i === 1) {
						html_bar += '<div class="mdl-graph-label-x-n" aria-hidden="'+_hidden+'" style="left:'+ add_per +'%"><span>'+ _t24 +'</span></div>';
					} else {
						html_bar += '<div class="mdl-graph-label-x-n" aria-hidden="'+_hidden+'" style="left:'+ _m +'%"><span>'+ _t24 +'</span></div>';
					}
				}

				html_bar += '<div class="mdl-graph-label-x-n last" style="left:100%"><span>'+ e_h +':'+ e_m +'</span></div>';

				html_bar += '</div>';
				html_bar += '</div>';
			}
			if (!!this.labelY) {
				html_bar += '<div class="mdl-graph-label-y">';
					for (let i = 0; i < this.linesum; i++) {
						html_bar += '<div class="mdl-graph-label-y-n"><span>'+ this.labelY[i] +'</span></div>';
					}
				html_bar += '</div>';
			}

			html_bar += '<div class="mdl-graph-items">';

			if (this.type !== 'sleep_step' && this.type !== 'breath_step') {
				for (let i = 0; i < this.data.length; i++) {
					html_bar += '<div class="mdl-graph-item n'+ i +'" data-value="'+ this.data[i].value +'" aria-label="' + this.data[i].label + '" style="height:0%">'
					html_bar += '<div class="mdl-graph-item-value"></div>';	
					html_bar += '<div class="mdl-graph-item-name">'+ this.data[i].label +'</div>';	
					html_bar += '</div>';	
				}
			} 
			else if (this.type === 'sleep_step'){
				for (let i = 0; i < this.data.length; i++) {

					let classname = 0;
					switch (this.data[i].value) {
						case 0 : classname = 0; break;
						case 1 : classname = 2; break;
						case 2 : classname = 3; break;
						case 3 : classname = 1; break;
						case 5 : classname = 5; break;
					}

					html_bar += '<div class="mdl-graph-item n'+  classname +'" style="width:'+(this.data[i].sum / this.sum * 100) +'%'+'">'
					html_bar += '</div>';	
				}
			}
			else if (this.type === 'breath_step'){
				for (let i = 0; i < this.data.length; i++) {

					let classname = 0;
					switch (this.data[i].value) {
						case 0 : classname = 0; break;
						case 1 : classname = 2; break;
						case 5 : classname = 5; break;
					}

					html_bar += '<div class="mdl-graph-item n'+  classname +'" style="width:'+(this.data[i].sum / this.sum * 100) +'%'+'">'
					html_bar += '</div>';	
				}
			}
			
			html_bar += '</div>';
			this.graph.innerHTML = html_bar;	


		//그래프 value값 적용
		if (this.type !== 'sleep_step' && this.type !== 'breath_step') {
			setTimeout(() => {
				for (let i = 0; i < this.data.length; i++) {
					let unitTxt = '';
	
					if (this.unit === 'time-hm') {
						//시간분 스타일
						if (!!tit) {
							unitTxt += '<em class="tit">'+ tit +'</em>';
						}
						
						if ((Math.floor(this.data[i].value / 60) > 0)) {
							unitTxt += '<b>'+ Math.floor(this.data[i].value / 60) + '</b><span>시간</span>';
						} else {
							unitTxt += '';
						}
	
						if (!!(Math.floor(this.data[i].value % 60))) {
							unitTxt += '<b>'+ this.data[i].value % 60 + '</b><span>분</span>';
						} else {
							unitTxt += '';
						}
	
	
						if (this.data[i].value === 0) {
							unitTxt += '<b>0</b><span>시간</span>'
						}
					} else {
						//value + 단위
						unitTxt = this.data[i].value + this.unit;
					}
	
					const item = this.graph.querySelector('.n' + i);
	
					item.style.height = (this.data[i].value / sum * 100) +'%';

					if (!this.data[i].text && !!item.querySelector('.mdl-graph-item-value')) {
						item.querySelector('.mdl-graph-item-value').innerHTML = unitTxt;
					} else if (!!item.querySelector('.mdl-graph-item-value')) {
						item.querySelector('.mdl-graph-item-value').innerHTML = this.data[i].text;
					}
					
				}
			}, 100);
		}
		
		//그래프 실행후 콜백
		!!this.callback && this.callback({
			id: this.id,
			data: this.data,
			sum: sum
		});
	}
}

//마이헬스 24-11-27 수정된 부분 28일 배포 이후 적용필요
class GraphDotline {
	constructor(opt, type = 'dot-line', middle = false) {
		this.type = type;
		this.id = opt.id;
		this.target = opt.target ? opt.target : false;
		this.title = opt.title;
		this.middle = middle;
		this.unit = opt.unit;
		this.area = opt.area;
		this.safeArea = [];
		this.riskArea = [];
		this.cautionArea = [];
		this.set_start = 0;
		this.set_end = 0;
		this.scale = opt.scale;
		this.data = opt.data;
		this.callback = opt.callback;
		this.graph = document.querySelector(`.mdl-graph[data-id="${this.id}"][data-type="${this.type}"]`);

		this.target ? this.graph = document.querySelector(`.mdl-graph[data-id="${this.target}"][data-type="${this.type}"]`) : '';
	}
	updata(opt) {
		Object.assign(this, opt);
		this.safeArea = [];
		this.riskArea = [];
		this.cautionArea = [];
		this.set_start = 0;
		this.set_end = 0;
		this.graph = document.querySelector(`.mdl-graph[data-id="${this.id}"][data-type="${this.type}"]`);

		this.target ? this.graph = document.querySelector(`.mdl-graph[data-id="${this.target}"][data-type="${this.type}"]`) : '';

		this.init();
	}
	init() {
		let state = null;
		let html_bar = '';
		let sum_minmax = [];

		//정보값이 없을 경우
		if (this.data === null || !this.data.length) {
			this.graph.classList.add('null');
			this.graph.innerHTML = '<div data-icon="none">결과 수치가 없어요.</div>'
			return false;
		}
		
		const _data = JSON.parse(JSON.stringify(this.data));
		
		this.graph.dataset.name = this.title;

		//요단백
		// if (this.title === '요단백') {
		// 	for (let i = 0; i < this.data.length; i++) {
		// 		const _v = this.data[i].value;
		// 		_data[i].value = _v === '음성' ? -0.5 : _v === '약양성' ? 0.5 : 1.5;
		// 	}
		// }
		let val_minmax = [];
		for (let item of this.data) {
			val_minmax.push(item.value);
		}
		
		//최소 최대값 구하기
		for (let area of this.area) {
			sum_minmax.push(area.min);
			sum_minmax.push(area.max);

			switch (area.state) {
				case OcareUI.state.healthStep[0]: this.safeArea.push(area.min, area.max);
					break;
				case OcareUI.state.healthStep[1]: this.cautionArea.push(area.min, area.max);
					break;
				case OcareUI.state.healthStep[2]: this.riskArea.push(area.min, area.max);
					break;

				case '음성': this.safeArea.push(area.min, area.max);
					break;
				case '약양성': this.cautionArea.push(area.min, area.max);
					break;
				case '양성(+1)이상': this.riskArea.push(area.min, area.max);
				case '양성': this.riskArea.push(area.min, area.max);
					break;
			}
		}
		let max = Math.max.apply(null, sum_minmax);
		let min = 0;
		let max_v = Math.max.apply(null, val_minmax);
		let min_v = Math.min.apply(null, val_minmax);
		const is_maxsafe = this.safeArea[1] === max; //안전영역이 최대값일 경우 true
		let safeArea_max = this.safeArea[1];
		let safeArea_min = this.safeArea[0];
		let current_min = this.data[0].value;
		let current_max = this.data[0].value;
		let is_min = true;
		let is_max = true;

		//스케일 평균크기 수정
		const scale_minmax = [min_v, this.area[0].min, max_v, safeArea_max];
		let max_s = Math.max.apply(null, scale_minmax);
		if (max_s < 10 && !(max_s > 10)) {
			this.scale = Math.round((max_s / 3));
		} else  {
			this.scale = Math.round((max_s / 3) / 10) * 10;
		} 

		//data 값과 안전영역과 비교하여 그래프 scale 조정
		switch (this.type) {
			case 'dot-line' :
				for (let i = 0; i < this.data.length; i++) {
					// min
					const _if_min = this.middle === 'middle' ? 
					current_min >= this.data[i].value : 
					this.safeArea[0] > this.data[i].value && current_min >= this.data[i].value;
					
					if (_if_min) {
						current_min = this.data[i].value;
						is_min = false;
						min = (this.data[i].value - this.scale);
						const rest_v = min % this.scale;
						this.set_start = min <= 0 ? 0 : rest_v === 0 ? min : this.data[i].value - rest_v;
					} else if (is_min) {
						this.set_start = this.safeArea[0] - (this.safeArea[0] % this.scale);  				
					}
					
					//max
					if (this.safeArea[1] <= this.data[i].value && current_max <= this.data[i].value) {
						current_max = this.data[i].value;
						is_max = false;
						const rest_v = this.data[i].value % this.scale;
						this.set_end = max < this.data[i].value ? this.data[i].value - rest_v + this.scale : max;
						is_maxsafe ? safeArea_max = this.set_end : '';
						console.log('sum1', this.set_end);
					} else if (is_max) {
						if (is_maxsafe) {
							if (this.safeArea[1] > (this.safeArea[1] % this.scale)) {
								this.set_end = this.safeArea[1];
							} else {
								this.set_end = this.safeArea[1] - (this.safeArea[1] % this.scale);
							}
						}else {
							this.set_end = this.safeArea[1] - (this.safeArea[1] % this.scale) + (this.scale);
						}
					}
					current_max = current_max < this.data[i].value ? this.data[i].value : current_max;

					if (this.middle === 'middle') {
						if (this.set_end >= current_max) {
							this.set_end = current_max + this.scale
						}
					}
				}
				this.set_start = this.set_start <= 0 ? 0 : this.set_start;	
				break;

			case 'gauge':
				this.set_end = Math.max.apply(null, sum_minmax);
				this.set_start = Math.min.apply(null, sum_minmax);
				this.set_end < _data[0].value ? this.set_end = _data[0].value : '';
				this.set_start > _data[0].value ? this.set_start = _data[0].value : '';
				break;
		}
		
		let sum = this.set_end - this.set_start;

		const nn = Math.ceil(sum / this.scale);
		let isLastState = false;

		console.log('sum4',  sum, this.set_end, this.set_start);
		//소수점 여부 확인 : 소수점이 있을 경우 true
		if (!Number.isInteger(sum / this.scale)) {
			max = max + this.scale;
			sum = this.set_end - this.set_start;
		}
	
		//data 값에 따른 포인트 위치값, 상태 설정
		html_bar += '<div class="mdl-graph-wrap">';

		if (this.type === 'gauge') {
			html_bar += '<div class="mdl-graph-areas">';
			let min_ = '';
			
			for (let i = 0, len = this.area.length; i < len; i++) {
				//min시작점
				min_ = this.set_start;
				const last_area_max = this.area[len-1].max;
				const last_value = this.data[this.data.length-1].value;
				let item_max = this.area[i].max;

				if (last_value > last_area_max) {
					sum = last_value;
					min_ = this.area[i].min;

					if (i === len - 1) {
						item_max = last_value;
					}
				} else {
					min_ = this.area[i].min;
					sum = last_area_max;
				}

				//마지막 영역이 정상이면 true
				isLastState = this.area[len-1].state === '정상' ? true : false;

				//요단백일경우 sum 변경
				if (this.title === '요단백') sum = 3;
				//요단백을 제외한 첫시작이 0이 아닌 양수일 경우 추가 생성
				if (i === 0 && min_ !== 0 && this.title !== '요단백') {
					html_bar += '<div class="mdl-graph-area" style="width:'+ min_ / sum * 100 +'%"><span class="mdl-graph-area-max">'+ min_ +'</span><span class="mdl-graph-area-txt"></span></div>';
				}

				html_bar += '<div class="mdl-graph-area" style="width:'+ (item_max - min_) / sum * 100 +'%"><span class="mdl-graph-area-max">'+ item_max +'</span><span class="mdl-graph-area-txt">'+ this.area[i].state +'</span></div>';
			}

			html_bar += '</div>';
		}

		//graph item
		html_bar += '<div class="mdl-graph-items">';

		switch (this.type) {
			case 'dot-line' : 
				for (let i = 0; i < this.data.length; i++) {
					const n = this.data[i].value;
					// const nn = this.data[i].average;
					const label = this.data[i].label;

					if (n !== null) {
						// 정상 true : 경계 false true : 주의 false false
						if (n === max) {
							state = (this.safeArea[0] <= n && safeArea_max >= n) ? 'A' : 
							(Math.min.apply(null, this.cautionArea) <= n && Math.max.apply(null, this.cautionArea) >= n) ? 'B' : 'C';
						} else {
							state = (this.safeArea[0] <= n && safeArea_max > n) ? 'A' : 
							(Math.min.apply(null, this.cautionArea) <= n && Math.max.apply(null, this.cautionArea) > n) ? 'B' : 'C';
						}

						//감마GTP 11보다 작을 때 정상으로 처리
						console.log('현재값?',n, this.title)
						if (this.title === '감마GTP' && n < 11) state = 'A';

						const max_value_current = this.scale * Math.ceil(sum / this.scale);

						console.log('sum', sum, max_value_current)

						html_bar += '<div class="mdl-graph-item n'+ i +'" data-value="'+ n +'" data-state="'+ state +'" aria-label="' + label + '" style="height:calc(50% - 0.8rem)" data-ps="'+ (((n - this.set_start) / max_value_current * 100) > 50 ? 'bottom' : 'top') +'" data-height="'+ ((n - this.set_start) / max_value_current * 100) +'">'
						html_bar += '<div class="mdl-graph-item-value">'+ n +'</div>';	
						html_bar += '<div class="mdl-graph-item-name">'+ label +'</div>';	
						html_bar += '</div>';	
					}
				}
				break;

			case 'gauge' : 
				const j = _data.length - 1;
				const i = 0;
				const n = _data[j].value;
				const nn = _data[j].average;
				const label = _data[j].label;
				let n_0 = n;
				let _n = n;

				if (!Number.isInteger(n)) {
					_n = n.toFixed(1);
					(_n.split('.')[1] === '0') ? _n = Number(_n).toFixed(0) : '';
				}
				
				let _nn = nn;
				if (!Number.isInteger(nn)) {
					_nn = nn.toFixed(1);
					(_nn.split('.')[1] === '0') ? _nn = Number(_nn).toFixed(0) : '';
				}
				
				let _nnn = nn - n;
				if (!Number.isInteger(_nnn)) {
					_nnn = _nnn.toFixed(1);
					(_nnn.split('.')[1] === '0') ? _nnn = Number(_nnn).toFixed(0) : '';
				}

				if (n >= max) {
					state = (this.safeArea[i] <= n && safeArea_max >= n) ? 'A' : 
					(Math.min.apply(null, this.cautionArea) <= n && Math.max.apply(null, this.cautionArea) >= n) ? 'B' : 'C';
				} else {
					//요단백을 제외한 음수는 무조건 0
					if (this.title !== '요단백') {
						n_0 = n < 0 ? 0 : n;
					} else {
						n_0 = n_0;
					}

					state = (this.safeArea[i] <= n_0 && safeArea_max > n_0) ? 'A' : 
					(Math.min.apply(null, this.cautionArea) <= n_0 && Math.max.apply(null, this.cautionArea) > n_0) ? 'B' : 'C';

					//y_GTP(감마GTP) 11보다 작은 경우에도 정상 색상으로 표시
					if (this.safeArea[i] === 11 && n_0 < 11) state = 'A'; //남자
					if (this.safeArea[i] === 8 && n_0 < 8) state = 'A';	//여자
				}

				if (max >= safeArea_max && isLastState) {
					safeArea_max = max;
					safeArea_min <= n ? state = 'A': '';
				} 

				let _sum = sum < n ? n : sum;

				//요단백인경우 음수 위치값으로 밀리는 현상 해결
				if (this.title === '요단백')  n_0 = n_0 + 1;
				//내결과
				html_bar += '<div class="mdl-graph-item current" data-value="'+ n +'" data-state="'+ state +'" aria-label="' + label + '" style="left:0%" data-left="'+ (n_0 / _sum * 100) +'"><svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="0.7rem" viewBox="0 0 12 7" fill="none"><path d="M6.37963 6.5571L11.2925 0.825396C11.5705 0.501059 11.3401 -2.88466e-08 10.9129 -4.75191e-08L1.08711 -4.77018e-07C0.659933 -4.9569e-07 0.429479 0.501059 0.707481 0.825396L5.62037 6.5571C5.81992 6.78991 6.18008 6.78991 6.37963 6.5571Z" fill=""/></svg></div>';
				//또래평균
				html_bar += '<div class="mdl-graph-item average n'+ i +'" data-value="'+ n +'" data-state="'+ state +'" aria-label="' + label + '" style="left:'+ (nn / _sum * 100) +'%"><svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="0.7rem" viewBox="0 0 12 7" fill="none"><path d="M6.37963 6.5571L11.2925 0.825396C11.5705 0.501059 11.3401 -2.88466e-08 10.9129 -4.75191e-08L1.08711 -4.77018e-07C0.659933 -4.9569e-07 0.429479 0.501059 0.707481 0.825396L5.62037 6.5571C5.81992 6.78991 6.18008 6.78991 6.37963 6.5571Z" fill=""/></svg></div>';

				const wrap = this.graph.closest('.mdl-wrap');
				
				if (!!wrap) {
					let ocrBody = document.querySelector('.ocr-body');
					const txt_title = wrap.querySelectorAll('[data-text="title"]');
					const txt_state = wrap.querySelectorAll('[data-text="state"]');
					const txt_value = wrap.querySelectorAll('[data-text="value"]');
					const txt_unit = wrap.querySelectorAll('[data-text="unit"]');
					const txt_average = wrap.querySelectorAll('[data-text="average"]');
					const txt_result = wrap.querySelectorAll('[data-text="result"]');

					const txt_resultTitle = wrap.querySelector('[data-text="title-result"]');
					const txt_compareResult = wrap.querySelector('[data-text="compare-result"]');
					wrap.dataset.state = state;

					!ocrBody ? ocrBody = document.querySelector('.ocr-checkup-result') : '';
					!ocrBody ? ocrBody = document.querySelector('.wrapper') : '';
					ocrBody.dataset.state = state;

					if (!!txt_title) {
						for (let txt of txt_title) {
							txt.textContent = this.title;
						}
					}
					if (!!txt_unit) {
						for (let txt of txt_unit) {
							txt.textContent = this.unit;
						}
					}
					if (!!txt_state) {
						for (let txt of txt_state) {
							txt.textContent = (state === 'A') ? OcareUI.state.healthStep[0] : (state === 'B') ? OcareUI.state.healthStep[1] : OcareUI.state.healthStep[2];
						}
					}
					if (!!txt_value) {
						for (let txt of txt_value) {
							(this.title !== '요단백') ? txt.textContent = n: '';
						}
					}
					if (!!txt_state) {
						for (let txt of txt_state) {
							(this.title === '요단백') ? txt.textContent = (state === 'A') ? '음성' : (state === 'B') ? '약양성' : '양성' : '';
						}
					}
					
					if (!!txt_compareResult) {
						if (this.title === '요단백') {
							if (n < 0 && nn < 0) {
								txt_compareResult.innerHTML = '또래와 나 모두 <strong>음성</strong>이에요.';
							} else if (n >= 0 && nn >= 0) {
								txt_compareResult.innerHTML = '또래와 나 모두 <strong>양성</strong>이에요.';
							} else if (n < 0 && nn >= 0) {
								txt_compareResult.innerHTML = '또래들은 <strong>양성</strong>이에요.';
							} else if (n >= 0 && nn < 0) {
								txt_compareResult.innerHTML = '또래들은 <strong>음성</strong>이에요.';
							}
						} else {
							if (n === nn) {
								txt_compareResult.innerHTML = '<strong>'+ _n +' '+ this.unit +'</strong> 또래와 똑같아요.';
							} else {
								txt_compareResult.innerHTML = '<strong>'+ _n +' '+ this.unit +(this.unit === '㎜/Hg' || this.unit === 'mm/Hg' || this.unit === '㎜Hg' || this.unit === 'mmHg' ? '으로' : '로') + '</strong>'  +' 또래보다 <strong>'+ Math.abs(_nnn) +' '+ this.unit +'</strong> ' + ((n > nn) ? (this.title !== '허리둘레') ? '높아요' : '커요' : (n < nn) ? (this.title !== '허리둘레') ? '낮아요' : '작아요' : '');
							}
						}
					}

					if (!!txt_resultTitle) {
						if (this.title === '요단백') {
							txt_resultTitle.innerHTML = '<div class="mdl-subject-group"><h2 class="mdl-subject-tit">'+ this.title +'</h2></div><div class="mdl-subject-group ocr-checkup-result-value"><strong>'+ ((state === 'A') ? '음성' : (state === 'B') ? '약양성' : '양성') +'</strong></div>';
						} else {
							txt_resultTitle.innerHTML = '<div class="mdl-subject-group"><h2 class="mdl-subject-tit">'+ this.title +'</h2></div><div class="mdl-subject-group ocr-checkup-result-value"><em><b>'+ n +'</b><span>'+ this.unit +'</span></em><strong>'+ ((state === 'A') ? OcareUI.state.healthStep[0] : (state === 'B') ? OcareUI.state.healthStep[1] : OcareUI.state.healthStep[2]) +'</strong></div>';
						}
					}
				}
			break;
		}
		html_bar += '</div>';
		
		// scale에  따른 그래프 단계
		if (this.type === 'dot-line') {
			html_bar += '<div class="mdl-graph-y">';
			let svg_line = '';

			if (this.title !== '요단백') {
				for (let i = 0; i <= nn; i++) {
					html_bar += '<div class="mdl-graph-y-n"><span>'+ (this.scale * i + this.set_start) +'</span></div>';
					svg_line += '<line x1="0%" y1="0%" x2="0%" y2="0%" class="line-'+ i +'"></line>';
				}
				html_bar += '</div>';
			}

			//안전영역 생성
			const max_value_current = this.scale * Math.ceil(sum / this.scale);
			let safearea_s = ((this.safeArea[0] - this.set_start) / max_value_current * 100);
			let safearea_e = ((safeArea_max - this.set_start) / max_value_current * 100);
			safearea_s = safearea_s < 0 ? 0 : safearea_s > 100 ? 100 : safearea_s;
			safearea_e = safearea_e < 0 ? 0 : safearea_e > 100 ? 100 : safearea_e;
			html_bar += '<div class="mdl-graph-area" style="bottom:'+ safearea_s +'%; height:'+ (safearea_e - safearea_s) +'%">';	
			html_bar += '<div class="mdl-graph-area-max">'+ safeArea_max +'</div>';
			html_bar += '<div class="mdl-graph-area-min">'+ safeArea_min +'</div>';
			html_bar += '</div>'
			html_bar += '<svg class="mdl-graph-svg" style="transition: all 200ms ease; opacity:0">'+ svg_line +'</svg>';
			html_bar += '</div>';
			html_bar += '<ul class="mdl-graph-legend" data-align="right">';

			if (this.area.length === 2) {
				html_bar += '<li class="n0">정상</li>';
				html_bar += '<li class="n2">의심</li>';
				html_bar += '<li class="n3">정상범위</li>';
			} else {
				html_bar += '<li class="n0">정상</li>';
				html_bar += '<li class="n1">경계</li>';
				html_bar += '<li class="n2">의심</li>';
				html_bar += '<li class="n3">정상범위</li>';
			}

			
			html_bar += '</ul>';

			this.graph.innerHTML = html_bar;
			let items;
			setTimeout(() => {
				items = this.graph.querySelectorAll('.mdl-graph-item');
				items.forEach((item, index) => {
					const n = Number(item.dataset.height);

					item.style.transition = 'height 200ms cubic-bezier(.25,.1,.25,1)';
					item.style.transitionDelay = 0 * index + 'ms';
					item.style.height = item.dataset.height + '%';
					
					item.addEventListener('transitionend', () => {
						lineDrawing(item, index)
					});
				});
			},0);

			const lineDrawing = (item, index) => {
				if (index === 0) return false;

				const wrap = this.graph.querySelector('.mdl-graph-wrap');
				const wrap_h = wrap.offsetHeight;
				const wrap_w = wrap.offsetWidth;
				const graph_clientRect = wrap.getBoundingClientRect();
				let svg_x = [];
				let svg_y = [];

				const itemPrev = this.graph.querySelector('.mdl-graph-item.n'+ (index - 1));
				const itemPrev_clientRect = itemPrev.getBoundingClientRect();
				svg_x.push((itemPrev_clientRect.x - graph_clientRect.x) / wrap_w * 100);
				svg_y.push((itemPrev_clientRect.y - graph_clientRect.y) / wrap_h * 100);

				const item_clientRect = item.getBoundingClientRect();
				svg_x.push((item_clientRect.x - graph_clientRect.x) / wrap_w * 100);
				svg_y.push((item_clientRect.y - graph_clientRect.y) / wrap_h * 100);

				const current_line = this.graph.querySelector('.mdl-graph-wrap').querySelector('line.line-'+ index);

				current_line.setAttribute('x1', svg_x[0] +'%');
				current_line.setAttribute('y1', svg_y[0] +'%');
				current_line.setAttribute('x2', svg_x[1] +'%');
				current_line.setAttribute('y2', svg_y[1] +'%');

				if (items.length - 1 === index) {
					this.graph.querySelector('.mdl-graph-svg').style.opacity = 1;
				}
			}

			!!this.callback && this.callback({
				id: this.id,
				data: this.data,
				sum: sum,
				state: state
			});

			//svg 라인 그리기
			const svgMake = () => {
				const wrap = this.graph.querySelector('.mdl-graph-wrap');
				const wrap_h = wrap.offsetHeight;
				const wrap_w = wrap.offsetWidth;
				const graph_clientRect = wrap.getBoundingClientRect();
				let svg_x = [];
				let svg_y = [];

				for (let i = 0; i < this.data.length; i++) {
					const item = this.graph.querySelector('.mdl-graph-item.n'+i);

					if (!!item) {
						const item_clientRect = item.getBoundingClientRect();

						svg_x.push((item_clientRect.x - graph_clientRect.x) / wrap_w * 100);
						svg_y.push((item_clientRect.y - graph_clientRect.y) / wrap_h * 100);
					}
				}
				
				let svg_html = '<svg class="mdl-graph-svg">';
				for (let i = 0; i < (svg_x.length - 1); i++) {
					svg_html += '<line x1="'+ svg_x[i] +'%" y1="'+ svg_y[i] +'%" x2="'+ svg_x[i+1]+'%" y2="'+ svg_y[i+1] +'%"></line>';
				}
				svg_html += '</svg>';
				this.graph.querySelector('.mdl-graph-wrap').insertAdjacentHTML('beforeend', svg_html);

				!!this.callback && this.callback({
					id: this.id,
					data: this.data,
					sum: sum
				});
			}

			// setTimeout(svgMake, 1800);
		} else {
			html_bar += '</div>';

			this.graph.innerHTML = html_bar;

			setTimeout(() => {
				const item = this.graph.querySelector('.mdl-graph-item.current');
				const n = Number(item.dataset.left);
				
				if (n > 60) {
					item.style.transition = 'left 1000ms cubic-bezier(.25,.1,.25,1)';
				} else if (n > 30) {
					item.style.transition = 'left 700ms cubic-bezier(.25,.1,.25,1)';
				} else {
					item.style.transition = 'left 400ms cubic-bezier(.25,.1,.25,1)';
				}
				item.style.left = item.dataset.left + '%';
			},800);
		}
	}
}
class HealthCheckupState {
	constructor (v) {
		this.wrap = document.querySelector('.ocr-checkup-result');
		this.subject = this.wrap.querySelector('.ocr-checkup-result-title');
		this.title = this.subject.querySelector('.mdl-subject-tit');
		this.text = this.subject.querySelector('.mdl-subject-txt');
		this.state = v;
		
		this.datatext = {
			A: ['건강해요', '이대로 꾸준히 유지하는게 좋아요!'],
			B: ['지금은 괜찮아요', '다만 조심해야 할 점이 있어요.'],
			C: ['주의해야 해요!', '지금부터 관리해주세요.'],
			D: ['관리해 주세요!', '병원에서 추가 검사를 받아보세요.'],
		}
	}
	init (v) {
		const state = !!v ? v : this.state;
		this.wrap.dataset.state = state;
		this.title.dataset.sp = state;
		this.title.textContent = this.datatext[state][0];
		this.text.textContent = this.datatext[state][1];
	}
}
class ChartData {
	constructor (v) {
		this.sleepTimePoint = v;
		this.data = this.sleepTimePoint.callback_data.sleep_data;

		this.time_sleep = !!this.data.sleep_time ? this.data.sleep_time : this.data.session_start_time;
		this.time_wake = !!this.data.wake_time ? this.data.wake_time : this.data.session_end_time;

		

		this.sleepValue = this.data.sleep_stages;
		this.breathValue = this.data.osa_stages || [];
		
		this.in_sleep = Number(this.data.time_in_sleep);
		this.in_bed = Number(this.data.time_in_bed);
		this.in_period = Number(this.data.time_in_sleep_period);

		this.sleep_wake = Number(this.data.time_in_wake);
		this.sleep_light = Number(this.data.time_in_light);
		this.sleep_rem = Number(this.data.time_in_rem);
		this.sleep_deep = Number(this.data.time_in_deep);
		this.breath_stable = Number(this.data.time_in_stable_breath);
		this.breath_unstable = Number(this.data.time_in_unstable_breath);

		this.day = false;

		this.time_sleep_hhmm;
		this.time_wake_hhmm;

		this.time_breath_value = [];
		this.time_breath_color = [];

		this.time_sleep24_value = [];
		this.time_sleep24_color = [];

		this.time_sleep_value = [];
		this.time_sleep_color = [];

		this.bar_height = [];
		this.bar_top = [];

		this.sum_sleep = 0;
		this.sum_breath = 0;

		this.init();
	}
	init () {
		//시작 끝
		const sleep_day = this.time_sleep.split('T')[0];
		this.time_sleep_hhmm = this.time_sleep.split('T')[1];
		this.time_sleep_hhmm = this.time_sleep_hhmm.split(':');
		const time_sleep_h = Number(this.time_sleep_hhmm[0]);
		const time_sleep_m = Number(this.time_sleep_hhmm[1]);
		const time_wake_day = this.time_wake.split('T')[0];
		this.time_wake_hhmm = this.time_wake.split('T')[1];
		this.time_wake_hhmm = this.time_wake_hhmm.split(':');
		const time_wake_h = Number(this.time_wake_hhmm[0]);
		const time_wake_m = Number(this.time_wake_hhmm[1]);
		
		this.day = (sleep_day === time_wake_day) ? false : true;
		

		/**
		 * 공통
		 * 
		 * 수면
		 * 0 : wake , 비수면
		 * 1 : light , 일반잠
		 * 2 : deep , 깊은잠
		 * 3 : ram , 램수면
		 * 
		 * 호흡
		 * 0 : 안정
		 * 1 : 불안정
		 */
		const act = () => {
			let aa = 0;
			let aa_0 = 0;
			let aa_1 = 0;
			let aa_2 = 0;
			let aa_3 = 0;
			let aa_5 = 0;
			let n = 1;
			let nn = 1;
			let breath_period = this.time_breath_value.concat(this.breathValue);
			let s_add = time_sleep_m !== 0 ? time_sleep_m * 2 : 0;
			let e_add = time_wake_m !== 0 ? (60 - time_wake_m) * 2 : 0;
			let s_add_array = [];
			let e_add_array = [];

			if (!!s_add) {
				s_add_array.push({sum:s_add, value:5});
				aa = aa + s_add;
			}
			if (!!e_add) {
				e_add_array.push({sum:e_add, value:5});
				aa = aa + e_add;
			}

			for (let i = 0; i <= this.sleepValue.length; i++) {
				this.bar_height.push(0);
				this.bar_top.push(Number(this.sleepValue[i]) - 1);

				aa = aa + 1;

				switch (this.sleepValue[i]) {
					case 0 : aa_0 = aa_0 + 1; break;
					case 1 : aa_1 = aa_1 + 1; break;
					case 2 : aa_2 = aa_2 + 1; break;
					case 3 : aa_3 = aa_3 + 1; break;
					case 5 : aa_5 = aa_5 + 1; break;
				}
				
				//수면,호흡
				if (i === this.sleepValue.length) {					
					aa = aa + 1;
					this.time_sleep_value.push({sum:n, value:this.sleepValue[i - 1]});
					this.time_breath_value.push({sum:nn, value:breath_period[i - 1]});
				} else if (i !== 0) {
					if (Number(this.sleepValue[i - 1]) === Number(this.sleepValue[i])) {
						n = n + 1;
					} else {
						this.time_sleep_value.push({sum:n, value:this.sleepValue[i - 1]});
						n = 1;
					}

					if (Number(breath_period[i - 1]) === Number(breath_period[i])) {
						nn = nn + 1;
					} else {
						this.time_breath_value.push({sum:nn, value:breath_period[i - 1]});;
						nn = 1;
					}
				} else {
					n = 1;
					nn = 1;
				}
			}

			//30초 1, 1분에 2개의 데이터

			// this.time_breath_value = s_add_array.concat(this.time_breath_value, e_add_array);
			// this.time_sleep_value = s_add_array.concat(this.time_sleep_value, e_add_array);
			// this.sum_sleep = this.sleepValue.length + s_add + e_add;
			// this.sum_breath = this.breathValue.length + s_add + e_add;

			this.sum_sleep = this.sleepValue.length;
			this.sum_breath = this.breathValue.length;
		}
		act();
	}
}
class ChartBarTime {
	constructor(v) {
		this.id = v.id;
		this.value = v.value;
		this.color = v.color;
		this.data = v.data;
		this.stable = Number(this.data[0].value);
		this.unstable = Number(this.data[1].value);
	}
	updata(v){
		this.id = v.id;
		this.value = v.value;
		this.color = v.color;
		this.data = v.data;
		this.stable = Number(this.data[0].value);
		this.unstable = Number(this.data[1].value);
		this.init();
	}
	init() {
		const target = document.querySelector('[data-id="'+ this.id +'"]');
		let sum = (this.stable + this.unstable) / 60 * 2;
		let sum2 = (this.stable + this.unstable)
		let per = [];
		let html = '';
		html += '<div class="mdl-graph-wrap">';

		for (let i = 0; i < this.value.length; i++) {
			per.push(this.value[i].sum / sum * 100);
			html += '<div class="mdl-graph-item n'+ this.value[i].value +'" style="width:'+ (this.value[i].sum / sum * 100) +'%;" ></div>'
		}

		for (let i = 0; i < this.data.length; i++) {
			let per = Math.round(this.data[i].value  / sum2 * 100);

			if  (!!document.querySelector('[data-id="'+ this.id +'_'+ i +'"]')) {
				document.querySelector('[data-id="'+ this.id +'_'+ i +'"]').textContent = per + '%';
			}
		}
		html += '</div>';
		target.innerHTML = html;
	}
}
class ChartDoughnuts {     
	constructor(v) {
		this.id = v.id;
		this.data = v.data;
		this.size = v.size;
		this.time = v.time;
		this.callback = v.callback;
		this.deg = v.deg;
		this.setTime = v.setTime;
		this.timer;
	}
	updata(v) {
		this.id = v.id;
		this.data = v.data;
		this.size = v.size;
		this.time = v.time;
		this.callback = v.callback;
		this.deg = v.deg;
		this.setTime = v.setTime;

		(this.setTime === null) && clearTimeout(this.timer);

		this.init();
	}
	init() {
		const wrap = document.querySelector('.mdl-graph[data-id="'+ this.id +'"]')
		const canvas = wrap.querySelector('canvas');
		const ctx = canvas.getContext("2d");
		const pointer = document.querySelector('.mdl-pointer');
		const pointer_start = !!pointer ? pointer.querySelector('.mdl-pointer-start') : null;
		const pointer_end = !!pointer ? pointer.querySelector('.mdl-pointer-end') : null;
		const w = this.size[0];
		const h = this.size[1];
		const w_half = w/2;
		const h_half = h/2;
		const m1 = this.deg;
		let tc_radius = 0;

		canvas.width = w;
		canvas.height = h;

		let start;
		let end;

		const imgElem = document.createElement('img');
		imgElem.src = '../../../local/assets/img/asleep/pointer_bg.png';

		const act = () => {
			ctx.clearRect(0, 0, w, h);

			for (let i = 0; i < this.data.length; i++) {
				if (!!this.data[i].start) {
					start = this.data[i].start.split(':');
					start = Number(start[0]) * 60 + Number(start[1]);
					end = this.data[i].end.split(':');
					end = Number(end[0]) * 60 + Number(end[1]);
				}
				const m24 = (24 * 60);
				let start_deg = end < start ? m24 - start : start;
				let end_deg = start < end  ? m24 - end : end;

				const degMake = (v) => {
					return (v * (360 / m24));
				}

				const t_value = !!this.data[i].value ? this.data[i].value : end < start ? end + start_deg : end - start_deg;
				
				if ( end < start ) {
					canvas.style.transform ='rotate('+ (90 - degMake(start_deg)) +'deg)';
					!!pointer ? pointer_start.style.transform = 'rotate('+ (90 - degMake(start_deg)) +'deg)' : '';
					!!pointer ? pointer_start.querySelector('span').style.transform = 'rotate('+ - (90 + degMake(start_deg)) +'deg)' : '';
				} else {
					canvas.style.transform ='rotate('+ (90 + degMake(start_deg)) +'deg)';
					!!pointer ? pointer_start.style.transform = 'rotate('+ (90 + degMake(start_deg)) +'deg)' : '';
					!!pointer ? pointer_start.querySelector('span').style.transform = 'rotate('+ - (90 + degMake(start_deg)) +'deg)' : '';
				}

				if ( end <= start ) {
					!!pointer ? pointer_end.style.transform = 'rotate('+ (90 + degMake(end_deg)) +'deg)' : '';
					!!pointer ? pointer_end.querySelector('span').style.transform = 'rotate('+ ((90 + degMake(end_deg)) * -1) +'deg)' : '';
				} else {
					!!pointer ? pointer_end.style.transform = 'rotate('+ (90 - degMake(end_deg)) +'deg)' : '';
					!!pointer ? pointer_end.querySelector('span').style.transform = 'rotate('+ ((90 - degMake(end_deg)) * -1) +'deg)' : '';
				}
			
				if (!!i) {
					tc_radius = (this.data[i].thickness/2) + (tc_radius) + ((this.data[i - 1].thickness / 2));
				} else {
					tc_radius = (this.data[i].thickness/2);
				}
				// 

				ctx.beginPath();
				ctx.arc(w_half, h_half, (w_half - tc_radius), Math.PI, Math.PI * 3 , false);
				ctx.lineWidth = this.data[i].thickness;
				ctx.strokeStyle = this.data[i].color[0];
				ctx.stroke();
				
				(!!this.data[i].start) && ctx.drawImage(imgElem, 10, 10, 210, 210);
				
				ctx.beginPath();
				ctx.arc(w_half, h_half, (w_half - tc_radius), Math.PI, Math.PI * (1 + (m1 * t_value)) , false);
				ctx.lineWidth = this.data[i].thickness;
				ctx.strokeStyle = this.data[i].color[1];
				ctx.lineCap = 'round';
				ctx.stroke();
			}

			if (!!this.setTime) {
				this.timer = setTimeout(() => {
					this.data[0].end = OcareUI.state.time.value();
					!!this.callback && this.callback({
						start: this.data[0].start,
						end : this.data[0].end
					});
					act();
				},this.setTime);
			} else {
				!!this.callback && this.callback({
					start: this.data[0].start,
					end : this.data[0].end
				});
			}
		}
		act();
	}
}
class CountSlide {
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
class ChartUI {
	constructor(opt, id) {
		this.data1 = opt[0],
		this.data2 = opt[1],
		this.id = id;
		this.severityType = opt.severity_type

		this.data1.info = {
			align: 'left',
			scale: opt[0].scale,
			areaSafe: [],
			set_start: 0,
			set_end: 0,
			target:0,
		}
		if (this.data2) {
			this.data2.info = {
				scale: opt[1].scale,
				align: 'right',
				areaSafe: [],
				set_start: 0,
				set_end: 0,
				target:0,
			}
		} else {
			this.data2 = null;
		}

		this.el_chart = document.querySelector('.mdl-chart[data-id="'+ this.id +'"]');
		this.el_chart_wrap;

		

		switch (this.data1.severity_type) {
			case '예외':
				this.el_chart.dataset.severity = '예외';
				break;
			case '중증도+예외':
				this.el_chart.dataset.severity = '중증도+예외';
				break;
		}

		this.init();
	}
	remove() {
		this.el_chart = document.querySelector('.mdl-chart[data-id="'+ this.id +'"]');
		const el_wraps = this.el_chart.querySelectorAll('.mdl-chart-wrap');
		const el_btns = this.el_chart.querySelectorAll('.mdl-chart-btns');
		const el_legend = this.el_chart.querySelector('.mdl-chart-legend[data-id="'+ this.id +'"]');
		this.el_chart.classList.remove('null');

		//reset
		for(let item of el_wraps) { item.remove(); }
		for(let item of el_btns) { item.remove(); }
		el_legend && el_legend.remove();
	}
	updata(opt) {
		this.data1 = opt[0],
		this.data2 = opt[1],
		this.data1.info = {
			align: 'left',
			scale: opt[0].scale,
			areaSafe: [],
			set_start: 0,
			set_end: 0,
			target:0,
		}
		if (this.data2) {
			this.data2.info = {
				scale: opt[1].scale,
				align: 'right',
				areaSafe: [],
				set_start: 0,
				set_end: 0,
				target:0,
			}
		}
		
		this.el_chart = document.querySelector('.mdl-chart[data-id="'+ this.id +'"]');
		const el_wraps = this.el_chart.querySelectorAll('.mdl-chart-wrap');
		const el_btns = this.el_chart.querySelectorAll('.mdl-chart-btns');
		const el_legend = this.el_chart.querySelector('.mdl-chart-legend[data-id="'+ this.id +'"]');
		this.el_chart.classList.remove('null');

		//reset
		for(let item of el_wraps) { item.remove(); }
		for(let item of el_btns) { item.remove(); }
		el_legend && el_legend.remove();

		this.init();
	}
	init() {
		//정보값이 없을 경우
		if (this.data1.data === null && this.data2.data === null) {
			this.el_chart.classList.add('null');
			// this.el_chart.innerHTML = '<div data-icon="none"><p>식사/복약/물/음주 건강기록으로 주간 섭취 건강 추이를 살펴보세요.</p></div>'
			return false;
		}

		let once = true;

		//최소 최대값 구하기
		let second = 1;
		const actChart = (v) => {
			const _data = v;
			const len = _data.data.length;
			let html_chart = '';
			let area = _data.area();

			switch (this.data1.severity_type) {
				case '예외':
					console.log(this.data1.severity_type)
					area = [0,2];
					break;
				case '중증도':
					break;
				case '중증도+예외':
					break;
			}

			this.el_chart.dataset.length = area[1]

			let max = area[1];
			let min = area[0];
			let is_maxsafe = null;


			let ary_min = min;
			let ary_max = max;

			//value 값이 여러개일때 작업 필요
			let current_min = min;
			let current_max = max;
			let current_max2 = 0;
			let current_sam = _data.target;

			// let ary_value = [];
			let ary_range = [];
			let item_n;
			let item_m = null;
			
			is_maxsafe = _data.info.areaSafe[1] === max;

			for (let i = 0; i < len; i++) {
				let _v = _data.data[i].value;
				
				if (_data.title !== '체중') {
					_v = _v !== null ? Math.round(_v) : null;
				} else {
					//체중일때 소숫점 한자리까지 허용
					if (!Number.isInteger(_v) && _v !== null) _v = Number(_v.toFixed(1));
				}

				let _v2 = null;
				if (_data.data2) {
					_v2 = _data.data2[i].value;

					if (_data.title !== '체중') {
						_v2 = _v2 !== null ? Math.round(_v2) : null;
					} else {
						//체중일때 소숫점 한자리까지 허용
						if (!Number.isInteger(_v2) && _v2 !== null)  _v2 = Number(_v2.toFixed(1));
					}
				}
				 
				if (_data.type === 'range') {
					_v = _v.filter((v, i) => v != null)

					const r_max = Math.max.apply(null, _v);
					const r_min = Math.min.apply(null, _v);
					let _ary_range = [];

					// 기본 최소값 보다 value가 낮다면 현재 최소값(current_min) 재설정
					if (current_min > r_min) {
						current_min = r_min;
					} 
					// 기본 최대값 보다 value가 높다면 현재 최소값(current_max) 재설정
					if (current_max <= r_max) {
						current_max = r_max;
						item_n = i;
					} 
					if (_v.length !== 0) {
						_ary_range.push(r_min);
						_ary_range.push(r_max);
					}
					ary_range.push(_ary_range);
					
				} else {
					// 기본 최소값 보다 value가 낮다면 현재 최소값(current_min) 재설정
					const min__v = _v2 !== null ? _v > _v2 ? _v2 : _v : _v;
					const max__v = _v2 !== null ? _v > _v2 ? _v : _v2 : _v;

					if (current_min > min__v && min__v !== null) {
						current_min = min__v;
						ary_min = current_min;
					} 
					// 기본 최대값 보다 value가 높다면 현재 최소값(current_max) 재설정
					else if (current_max <= max__v && max__v !== null) {
						current_max = max__v;
						ary_max = current_max;
					} 

					switch (_data.target_type) {
						case 'max-last' :
						if (current_max2 <= max__v && max__v !== null) {
							current_max2 = max__v;
							item_n = i;
						} 
						break;
						
						case 'same-last' :
						if ((_data.safe[0] <= _v && _data.safe[1] >= _v) && _v !== null) {
							current_sam = _v;
							item_n = i;
						} 
						break;
					}
				}
			}
			if (ary_max % this.data1.info.scale > 0) {
				ary_max = ary_max + this.data1.info.scale - (ary_max % this.data1.info.scale)
			}
			if (ary_min % this.data1.info.scale > 0) {
				ary_min = ary_min - this.data1.info.scale + (this.data1.info.scale - (ary_min % this.data1.info.scale))
			}

			_data.info.set_start = ary_min;
			_data.info.set_end = ary_max;

			//data 값과 안전영역과 비교하여 그래프 scale 조정
			let sum = _data.info.set_end - _data.info.set_start;

			const nn = Math.ceil(sum / _data.scale);
			(nn * _data.scale > sum) ? _data.info.set_end = nn * _data.scale : '';

			//소수점 여부 확인 : 소수점이 있을 경우 true
			if (!Number.isInteger(sum / _data.scale)) {
				_data.info.set_end < (max + _data.scale) ? _data.info.set_end = max + _data.scale : '';
			} 

			sum = _data.info.set_end - _data.info.set_start

			//data 값에 따른 포인트 위치값, 상태 설정
			const _align = _data.info.align;
			html_chart += '<div class="mdl-chart-wrap" data-type="'+ _data.type +'" data-align="'+ _align +'" aria-label="'+ _data.title +'">';
			//graph item
			html_chart += '<div class="mdl-chart-items">';
			let last_n = 0;
			//item
			switch (_data.type) {
				case 'dot-line':
				case 'bar': 
					for (let i = 0; i < len; i++) {
						const label = _data.data[i].label;
						let n = _data.data[i].value;
						let is_current_day = false;
						let state_target;
						let state_range = null;

						if (n) last_n = i;
						if (_data.dayWeek === label) is_current_day = true;

						if (_data.title !== '체중') {
							n = n !== null ? Math.round(n) : null;
						} else {
							if (!Number.isInteger(n) && n !== null)  n = Number(n.toFixed(1));
						}

						let v = ((n - _data.info.set_start) / sum * 100);
						v = Number(v.toFixed(3));
						
						if (_data.title !== '체중') {
							state_target = _data.target <= n ? _data.target === n ? 'same' : 'success' : 'failure;';
						} else {
							state_target = _data.safe[0] <= n && _data.safe[1] >= n ? 'same' : 'failure;';
						}

						let btn_txt = `${_data.title} ${label}요일 ${n}${_data.unit}`;

						if (_data.state) {
							for (let j = 0; j < _data.state.length; j++) {
								if (_data.state[j].min <= n && n < _data.state[j].max) {
									state_range = _data.state[j].name;
									break;
								}
							}
						}
       
						//두번째 데이터가 있다면
						let _label, _n, _v, _state_target, _state_range, _btn_txt;
						if (_data.data2) {
							_label = _data.data2[i].label;
							_n = _data.data2[i].value;

							if (_data.title !== '체중') {
								_n = _n !== null ? Math.round(_n) : null;
							} else {
								if (!Number.isInteger(_n) && _n !== null) _n = Number(_n.toFixed(1));
							}
							
							_v = ((_n - _data.info.set_start) / sum * 100);
							_v = Number(_v.toFixed(3));
							_state_target = _data.target <= _data.data2[i].value ? 'success' : 'failure;';
							_state_range = null;
							_btn_txt = `${_data.title} ${_label}요일 ${_n}${_data.unit}`;

							if (_data.state) {
								for (let j = 0; j < _data.state.length; j++) {
									if (_data.state[j].min <= _n && _n < _data.state[j].max) {
										_state_range = _data.state[j].name;
										break;
									}
								}
							}
						}

						//최대치 마지막인
						if (_data.target_type === 'max-last' && i === item_n) {
							html_chart += '<div class="mdl-chart-item n'+ i +'" data-value="'+ n +'" data-target="'+ state_target +'" data-state="'+ (state_range ? state_range : null) + '" data-tooltip="true">';
						} else {
							console.log(i, len)
							html_chart += '<div class="mdl-chart-item n'+ i +'" data-value="'+ n +'" data-target="'+ state_target +'" data-state="'+ (state_range ? state_range : null) + '" >';
						}
						 
						html_chart += '<div class="mdl-chart-item-wrap first" style="height:0%" data-height="'+ v +'" data-value="'+ n +'" data-n="first">';
						html_chart += '<button type="button" class="mdl-chart-item-btn" aria-label="'+ btn_txt +'" data-n="'+ i +'" data-selected="'+ (i === len - 1 ? true : false )+'">';

						const tooltipCont = (v) => {
							switch (v) {
								case '수면':
								html_chart += `<span class="mdl-chart-tooltip" data-view="false">`;
								html_chart += `<strong>${OcareUI.parts.calc_hm(n)}</strong>`;
								html_chart += `</span>`;
								break;

								case '체중':
								html_chart += `<span class="mdl-chart-tooltip" data-view="false">`;
								html_chart += `<strong>${n}${this.data1.unit}</strong>`;	
								html_chart += `</span>`;
								break;

								case '음주':
								html_chart += `<span class="mdl-chart-tooltip" data-view="false">`;
								html_chart += `<strong>${OcareUI.parts.comma(Number(_data.data[i].ml))}${this.data1.unit}</strong>`;
								html_chart += `</span>`;
								break;

								case '혈당':
								case '혈압':
								case '심박수':
								html_chart += `<span class="mdl-chart-tooltip" data-view="false">`;
								
								if (_data.data2 && _n !== null) {
									html_chart += `<strong class="legend1">${this.data1.category[1]} <b>${OcareUI.parts.comma(Math.round(_n))}${this.data1.unit}</b></strong>`;
								}
								if (_data.data2 && n !== null) {
									html_chart += `<strong class="legend2">${this.data1.category[0]} <b>${OcareUI.parts.comma(Math.round(n))}${this.data1.unit}</b></strong>`;
								}
								html_chart += `</span>`;
								break;

								default:
									html_chart += 
									`<span class="mdl-chart-tooltip" data-view="false">
										<strong>${OcareUI.parts.comma(Math.round(n))}${this.data1.unit}</strong>
									</span>`;
								break
							}
						}
						
						//max-last:마지막 최대치, same-last:마지막 동일수치, 기본툴팁
						if (_data.target_type === 'max-last' && i === item_n) {
							html_chart += `<span class="mdl-chart-tooltip" data-view="true">
								${this.data1.target_msg()}
							</span>`;	
						} 
						else if (_data.target_type === 'same-last' && i === item_n) {
							html_chart += `<span class="mdl-chart-tooltip" data-view="true">${this.data1.target_msg()}</span>`;	
						} 
						else {
							tooltipCont(_data.title);
						}

						html_chart += '</button>';	
						html_chart += '<div class="mdl-chart-item-value">'+ n +'</div>';	
						html_chart += '<div class="mdl-chart-item-name" '+ (is_current_day ? 'data-current="true"' : '') +'>'+ label +'</div>';	
						html_chart += '</div>';	

						//second item 
						if (_data.data2) {
							html_chart += '<div class="mdl-chart-item-wrap second" style="height:0%" data-height="'+ _v +'" data-value="'+ _n +'" data-n="second">';
							html_chart += '<button type="button" class="mdl-chart-item-btn" aria-label="'+ _btn_txt +'" data-n="'+ i +'">';
							
							tooltipCont(_data.title);

							html_chart += '</button>';	
							html_chart += '<div class="mdl-chart-item-value">'+ _n +'</div>';	
							html_chart += '<div class="mdl-chart-item-name">'+ _label +'</div>';	
							html_chart += '</div>';	
						} else {
							
						}

						html_chart += '</div>';	
					}
					break;
				case 'range':
					for (let i = 0; i < len; i++) {
						const n_min = ary_range[i][0];
						let n_max = ary_range[i][1];
						let n = n_max - n_min;
						let is_none = false;

						if (isNaN(n)) {
							n = 0;
							n_max = 0;
							is_none = true;
						}

						// const n = _data.data[i].value;
						const label = _data.data[i].label;
						let v = ((n - _data.info.set_start) / sum * 100);
						let v2 = ((n_min - _data.info.set_start) / sum * 100);
						v = Number(v.toFixed(3));
						v2 = Number(v2.toFixed(3));

						const btn_txt = `${_data.title} ${label}요일 ${n_min}${_data.unit}부터 ${n_max}${_data.unit}까지 `;

						html_chart += '<div class="mdl-chart-item n'+ i +'" data-value="'+ n +'" aria-label="' + label + '">';

						if (!is_none) {
							html_chart += '<button type="button"class="mdl-chart-item-bar" style="height:0%; bottom:'+ v2 +'%" data-height="'+ v +'"  aria-label="'+ btn_txt +'" data-n="'+ i +'"></button>';	
						}
						
						html_chart += '<div class="mdl-chart-item-value">'+ n +'</div>';	
						html_chart += '<div class="mdl-chart-item-name">'+ label +'</div>';	
						html_chart += '</div>';	
					}
					break;
			}
			html_chart += '</div>';

			//chart Y line
			const isViewY = _data.label_xy[1];
			html_chart += '<div class="mdl-chart-y" data-n="'+ (nn + 1) +'" data-view="'+ isViewY +'">';
			html_chart += '<div class="mdl-chart-unit">'+ _data.unit +'</div>';
			const cls_hidden = '';

			if (_data.title === '음주' || this.data1.label_y_show) {
				for (let i = 0; i <= nn; i++) {
					if (i === 0) {
						html_chart += '<div class="mdl-chart-y-n '+ cls_hidden+'"><span>'+ OcareUI.parts.comma(_data.scale * i + _data.info.set_start) +'</span></div>';
					} else {
						html_chart += '<div class="mdl-chart-y-n '+ cls_hidden+'"><span>'+ OcareUI.parts.comma(_data.scale * i + _data.info.set_start) +'</span></div>';
					}
				}
			}
			
			html_chart += '</div>';
			this.el_chart.insertAdjacentHTML('afterbegin',html_chart);
			html_chart = '';
			this.el_chart_wrap = this.el_chart.querySelector('.mdl-chart-wrap[data-align="'+ _align +'"]');
			this.el_chart_wrap.dataset.lastN = last_n;
			 
			setTimeout(() => {
				//safe area
				const _el_wrap = this.el_chart.querySelector('.mdl-chart-wrap[data-type="'+ _data.type +'"]');
				
				if (_data.safe) {
					const per1 = (_data.safe[0] - _data.info.set_start) / (_data.info.set_end - _data.info.set_start) * 100;
					const per2 = (_data.safe[1] - _data.info.set_start) / (_data.info.set_end - _data.info.set_start) * 100;

					html_chart += '<div class="mdl-chart-safe">';
					html_chart += '<div class="mdl-chart-safe-n" style="bottom:'+ per1 +'%; height:'+OcareUI.parts.comma(per2 - per1)+'%"><span>'+ OcareUI.parts.comma(_data.safe[0]) +'</span></div>';
					html_chart += '<div class="mdl-chart-safe-n" style="bottom:'+ per2 +'%"><span>'+ OcareUI.parts.comma(_data.safe[1]) +'</span></div>';
					html_chart += '</div>';
				}

				//target 수치
				if (_data.target) {
					const per1 = (_data.target - _data.info.set_start) / (_data.info.set_end - _data.info.set_start) * 100;

					html_chart += '<div class="mdl-chart-target">';
					html_chart += '<div class="mdl-chart-target-n" style="bottom:'+ per1 +'%;"><span>'+ OcareUI.parts.comma(_data.target) +'</span></div>';
					html_chart += '</div>';
				}
				_el_wrap.insertAdjacentHTML('afterbegin', html_chart);
				html_chart = '';
				
				//tooltip click event
				if (once && _data.tooltip) {
					const el_tooltip_btns = this.el_chart.querySelectorAll('.mdl-chart-item-btn, .mdl-chart-item-bar');
					const actTooltip = (e) => {
						const _btn = e.currentTarget;
						const _wrap = _btn.closest('.mdl-chart-item-wrap');
						const _btn_n = Number(_btn.dataset.n);
						
						_btn.classList.add('on');
						const act = (d,n) => {
							let html = '';

							if (typeof this[d].data[n].value === 'object' && this[d].data[n].value !== null) {
								
								if (this[d].catagory !== null) {
									html += '<span class="group"><span>'+ this[d].catagory[0] +': </span><span>';
								} else {
									html += '<span class="group"><span>'+ this[d].title  +': </span><span>';
								}
								
								for (let j = 0; j < this[d].data[n].value.length; j++ ) {
									if (this[d].data[n].value[j]) {
										html += '<span>'+ this[d].catagory[j]  +': '+ OcareUI.parts.comma(this[d].data[n].value[j]) +' '+ this[d].unit +'</span>';
									}
								}
								html += '</span></span>';
							} else {
								//소분류가 있는 경우
								if (this[d].catagory !== null) {
									const first = _wrap.dataset.n === 'first' ? true : false;

									if (first) {
										html += '<span>'+ this[d].catagory[0] +': '+ OcareUI.parts.comma(this[d].data[n].value) +' '+ this[d].unit +'</span>';
									} else {
										html += '<span>'+ this[d].catagory[1] +': '+ OcareUI.parts.comma(this[d].data2[n].value) +' '+ this[d].unit +'</span>';
									}
								} else {
									if (this[d].data[n].value) {
										html += '<span>'+ this[d].title +': '+ OcareUI.parts.comma(this[d].data[n].value) +' '+ this[d].unit +'</span>';
									}
								}
							}
							return html;
						}
						let html_tooltip = ``;

						if (!_btn.querySelector('.mdl-chart-tooltip')) {
							html_tooltip += `<div class="mdl-chart-tooltip">
								<strong>${this.data1.data[_btn_n].date}</strong>
								${this.data1 && act('data1', _btn_n)}
								${this.data2 ? act('data2', _btn_n) : '' }
							</div>`;
							_btn.insertAdjacentHTML('afterbegin', html_tooltip);
						}
					}
					
					for (let item of el_tooltip_btns) {
						// item.addEventListener('click', actTooltip);
					}
					once = false;
				}

				this.play(this.el_chart_wrap)
			}, 100);
			second = second + 1;
		}
		this.data1 && actChart(this.data1);
		
		// this.data2 && setTimeout(() => {
		// 	actChart(this.data2)
		// }, 200);
	}
	dotlineDraw(v) {
		console.log('dotlineDraw')
		const base = v;
		const _items = base.querySelectorAll('.mdl-chart-item');
		const itemsNots = base.querySelectorAll('.mdl-chart-item:not([data-value="null"]) .mdl-chart-item-btn');
		const items = base.querySelectorAll('.mdl-chart-item-btn:not([data-value="null"])');
		const svgMake = () => {
			console.log('svg')
			setTimeout(() => {
				const _el_wrap = base;
				const wrap_h = _el_wrap.offsetHeight;
				const wrap_w = _el_wrap.offsetWidth;
				const graph_clientRect = _el_wrap.getBoundingClientRect();
				let svg_x = [];
				let svg_y = [];
				let svg_x2 = [];
				let svg_y2 = [];
				
				for (let i = 0; i < _items.length; i++) {
					const item = base.querySelector('.mdl-chart-item.n'+i);
					const item_wrap = item.querySelector('.mdl-chart-item-wrap.first');
					const item_wrap2 = item.querySelector('.mdl-chart-item-wrap.second');
					const isNull = item_wrap.dataset.value === 'null';
					
					if (!!item) {
						const item_clientRect = item_wrap.getBoundingClientRect();
						console.log(this.data1.severity_type, this.data1.data[i].value);

						if (this.data1.severity_type === '중증도+예외') {
							if (!isNull && this.data1.data[i].value !== 1) {
								svg_x.push((item_clientRect.x - graph_clientRect.x) / wrap_w * 100);
								svg_y.push((item_clientRect.y - graph_clientRect.y) / wrap_h * 100);
							}
						} else {
							if (!isNull) {
								svg_x.push((item_clientRect.x - graph_clientRect.x) / wrap_w * 100);
								svg_y.push((item_clientRect.y - graph_clientRect.y) / wrap_h * 100);
							} 
	
							if (item_wrap2) {
								const isNull2 = item_wrap2.dataset.value === 'null';
								const item_clientRect2 = item_wrap2.getBoundingClientRect();
								
								if (!isNull2) {
									svg_x2.push((item_clientRect2.x - graph_clientRect.x) / wrap_w * 100);
									svg_y2.push((item_clientRect2.y - graph_clientRect.y) / wrap_h * 100);
								} 
							}
						}
					}
				}
				
				let html_svg = '<svg class="mdl-chart-svg">';
				for (let i = 0; i < (svg_x.length - 1); i++) {
					html_svg += '<line x1="'+ svg_x[i] +'%" y1="'+ svg_y[i] +'%" x2="'+ svg_x[i+1]+'%" y2="'+ svg_y[i+1] +'%"></line>';
				}
				html_svg += '</svg>';
				base.insertAdjacentHTML('beforeend', html_svg);


				if (svg_x2.length) {
					let html_svg2 = '<svg class="mdl-chart-svg">';
					for (let i = 0; i < (svg_x2.length - 1); i++) {
						html_svg2 += '<line x1="'+ svg_x2[i] +'%" y1="'+ svg_y2[i] +'%" x2="'+ svg_x2[i+1]+'%" y2="'+ svg_y2[i+1] +'%"></line>';
					}
					html_svg2 += '</svg>';
					base.insertAdjacentHTML('beforeend', html_svg2);
				}
				itemsNots[0].removeEventListener('transitionend',svgMake);
			},30);
		}
		// setTimeout(svgMake, 400);
		itemsNots[0].addEventListener('transitionend', svgMake);
	}
	play(v) {
		const items = this.el_chart.querySelectorAll('.mdl-chart-item, .mdl-chart-item-bar');
		const wrap = this.el_chart.querySelector('.mdl-chart-wrap')
		for (const item of items) {
			const item_wraps = item.querySelectorAll('.mdl-chart-item-wrap');

			for (let i = 0; i < item_wraps.length; i++) {
				item_wraps[i].style.height = item_wraps[i].dataset.height + '%';

				const btn = item_wraps[i].querySelector('.mdl-chart-item-btn');
				if (btn) btn.style.opacity = 1;
			}
			
			item.style.opacity = 1;
		}
		if (wrap.dataset.type === 'dot-line') {
			this.dotlineDraw(v);
		}
	}
}
class ChartRadar {
	constructor(opt) {
		this.opt = opt;
		this.chart = document.querySelector(`[data-rader-id="${this.opt.id}"]`);
		this.sum = this.opt.data.length;
		this.scale = this.opt.scale;
	}
	init() {
		const act = () => {
			let html = `<div class="chart-rader--wrap" data-sum="${this.sum}">`;
			let html_bg = `<div class="chart-rader--bg" aria-hidden="true">`;
			
			for(let i = 0; i < this.sum; i++) {
				const _item = this.opt.data[i];
				html_bg += `<div class="chart-rader--line">
					<div class="chart-rader--bg-1"></div>
					<div class="chart-rader--bg-2"></div>
					<div class="chart-rader--bg-3"></div>
					<div class="chart-rader--bg-4"></div>
					<div class="chart-rader--name" data-disabled="${_item.value ? false : true}"><b>${_item.name}</b></div>
				</div>`;

				html += `<div class="chart-rader--item" data-state="${_item.value}">
					<div class="chart-rader--dot"></div>
					<span class="a11y-hidden">${_item.name + ' ' + _item.value} 단계입니다.</span>
				</div>`;
			}
			html_bg += `<div class="chart-rader--bg-tit n1">${this.opt.step[0]}</div>
				<div class="chart-rader--bg-tit n2">${this.opt.step[1]}</div>
				<div class="chart-rader--bg-tit n3">${this.opt.step[2]}</div>
				<div class="chart-rader--bg-tit n4">${this.opt.step[3]}</div>
				</div>`
			html += `</div>`;

			this.chart.insertAdjacentHTML('afterbegin', html);
			const _wrap = this.chart.querySelector('.chart-rader--wrap');
			_wrap.insertAdjacentHTML('beforeend', html_bg);
		}
		const actSvg = () => {
			const bgline = this.chart.querySelectorAll('.chart-rader--line');
			const items = this.chart.querySelectorAll('.chart-rader--item');
			const wrap = this.chart.querySelector('.chart-rader--wrap');
			const wrap_rect = wrap.getBoundingClientRect();
			let html_svg = `<svg class="value">`;
			let html_svg2 = `<svg class="bg">`;
			let html_svg3 = `<svg class="bg2">`;
			let points = '';
			let points1 = '';
			let points2 = '';
			let points3 = '';
			let points4 = '';
			for (let j = 0, len = items.length; j < len; j++ ) {
				const item = items[j];
				const item_line = bgline[j];

				const line1 = item_line.querySelector('.chart-rader--bg-1');
				const line2 = item_line.querySelector('.chart-rader--bg-2');
				const line3 = item_line.querySelector('.chart-rader--bg-3');
				const line4 = item_line.querySelector('.chart-rader--bg-4');
				const dot = item.querySelector('.chart-rader--dot');
				const rect = dot.getBoundingClientRect();

				const rect_line1 = line1.getBoundingClientRect();
				const rect_line2 = line2.getBoundingClientRect();
				const rect_line3 = line3.getBoundingClientRect();
				const rect_line4 = line4.getBoundingClientRect();

				points += `${rect.x - wrap_rect.x},${rect.y - wrap_rect.y} `;

				points1 += `${rect_line1.x - wrap_rect.x},${rect_line1.y - wrap_rect.y} `;
				points2 += `${rect_line2.x - wrap_rect.x},${rect_line2.y - wrap_rect.y} `;
				points3 += `${rect_line3.x - wrap_rect.x},${rect_line3.y - wrap_rect.y} `;
				points4 += `${rect_line4.x - wrap_rect.x},${rect_line4.y - wrap_rect.y} `;
			}
			html_svg += `<polygon points="${points}""></polygon>;`;

			html_svg2 += `<polygon class="line1" points="${points1}"></polygon>;`;
			html_svg2 += `<polygon class="line2" points="${points2}"></polygon>;`;
			html_svg2 += `<polygon class="line3" points="${points3}"></polygon>;`;
			html_svg3 += `<polygon class="line4" points="${points4}"></polygon>;`;

			html_svg += `</svg>`;
			html_svg2 += `</svg>`;
			html_svg3 += `</svg>`;
			wrap.insertAdjacentHTML('beforeend', html_svg);
			wrap.insertAdjacentHTML('beforeend', html_svg2);
			wrap.querySelector('.chart-rader--bg').insertAdjacentHTML('beforeend', html_svg3);

			setTimeout(() => {
				wrap.querySelector('svg.value').classList.add('on')
			},10);
		}

		act();
		actSvg();

		const reset = () => {
			const _wrap = this.chart.querySelector('.chart-rader--wrap');
			_wrap.remove();
			act();
			actSvg();
		}

		const resizeObserver = new ResizeObserver(() => {
			clearTimeout(this.timer);
			// this.reset();
			this.timer = setTimeout(() => {
				reset();
			}, 0);
		});
		resizeObserver.observe(this.chart);
	}
}
class ChartCircleOver {
	constructor(canvasId, percent, ctg, onComplete) {
		this.canvas = document.querySelector('[data-id="'+ canvasId +'"]');
		this.dpr = window.devicePixelRatio;
		this.ctx = this.canvas.getContext("2d");
		this.percent = percent; // 목표 퍼센트 값
		this.lineWidth = 14 * this.dpr; // 선 굵기
		this.currentPercent = 0; // 현재 그려진 퍼센트 (애니메이션용)'
		this.ctg = ctg;
		this.onComplete = onComplete; // 애니메이션이 끝날 때 실행할 콜백
		this.rect = this.canvas.getBoundingClientRect();
		this.canvas.width = this.rect.width * this.dpr;
		this.canvas.height = this.rect.height * this.dpr;
	}

	drawBackgroundCircle() {
		const centerX = this.canvas.width / 2;
		const centerY = this.canvas.height / 2;
		const radius = Math.min(centerX, centerY) - this.lineWidth;

		// 배경 원 그리기
		this.ctx.beginPath();
		this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.34)'; // 배경 원 색상
		this.ctx.lineWidth = this.lineWidth;
		this.ctx.stroke();
	}

	drawChart(percent) {
		const centerX = this.canvas.width / 2;
		const centerY = this.canvas.height / 2;
		const radius = Math.min(centerX, centerY) - this.lineWidth;

		const totalRotations = Math.floor(percent / 100); // 100% 단위로 몇 번 회전할지 계산
		const remainingPercent = percent % 100; // 마지막 남은 부분 퍼센트

		// 100% 이하 부분과 100% 초과 부분을 나누어 처리
		const overPercent = Math.max(percent - 100, 0); // 100% 이상
		const nn = 4.71235;
		// 그라데이션 적용
		const gradient = this.ctx.createConicGradient(nn, this.canvas.width / 2, this.canvas.height / 2);
		gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
		gradient.addColorStop(0.05, 'rgba(255, 255, 255, 1)');
		gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');

		const gradient2 = this.ctx.createConicGradient(nn, this.canvas.width / 2, this.canvas.height / 2);
		gradient2.addColorStop(0, 'rgba(255, 255, 255, 1)');
		gradient2.addColorStop(0.05, 'rgba(255, 215, 0, 1)');
		gradient2.addColorStop(0.25, 'rgba(255, 153, 0, 1)');
		gradient2.addColorStop(1, 'rgba(244, 51, 122, 1)');

		const gradient3 = this.ctx.createConicGradient(nn, this.canvas.width / 2, this.canvas.height / 2);
		gradient3.addColorStop(0, 'rgba(244, 51, 122, 1)');
		gradient3.addColorStop(0.05, 'rgba(171, 51, 244, 1)');
		gradient3.addColorStop(1, 'rgba(59, 15, 187, 1)');

		const gradient4 = this.ctx.createConicGradient(nn, this.canvas.width / 2, this.canvas.height / 2);
		gradient4.addColorStop(0, 'rgba(59, 15, 187, 1)');
		gradient4.addColorStop(0.05, 'rgba(0, 0, 0, 1)');
		gradient4.addColorStop(1, 'rgba(0, 0, 0, 1)');

		// 각 회전마다 100% 그리기
		let gColor = null;

		for (let i = 0; i < totalRotations; i++) {
			this.ctx.beginPath();
			this.ctx.arc(centerX, centerY, radius, -Math.PI / 2, 2 * Math.PI - Math.PI / 2); // 12시 방향에서 시작
			switch (i) {
				case 0 : this.ctx.strokeStyle = gradient; break; // 100% 그라데이션
				case 1 : this.ctx.strokeStyle = gradient2; break; // 100% 그라데이션
				case 2 : this.ctx.strokeStyle = gradient3; break; // 100% 그라데이션
				case 3 : this.ctx.strokeStyle = gradient4; break; // 100% 그라데이션
				default : this.ctx.strokeStyle = gradient;
			}
			gColor = i;
			this.ctx.lineWidth = this.lineWidth;
			this.ctx.lineCap = 'butt'; // 끝을 둥글게
			this.ctx.stroke();
		}

		// 남은 퍼센트 부분 그리기
		if (remainingPercent > 0) {
			const endAngle = (remainingPercent / 100) * 2 * Math.PI;

			this.ctx.beginPath();
			this.ctx.arc(centerX, centerY, radius, -Math.PI / 2, endAngle - Math.PI / 2); // 12시 방향에서 시작
			this.ctx.strokeStyle = gradient;
			if (gColor !== null) {
				switch (gColor) {
					case 0 : this.ctx.strokeStyle = gradient2; break; // 100% 그라데이션
					case 1 : this.ctx.strokeStyle = gradient3; break; // 100% 그라데이션
					case 2 : this.ctx.strokeStyle = gradient4; break; // 100% 그라데이션
					default : this.ctx.strokeStyle = gradient;
				}
			}
			this.ctx.lineWidth = this.lineWidth;
			this.ctx.lineCap = 'butt'; // 끝을 둥글게
			this.ctx.stroke();
		}
		
		// 퍼센트에 따른 끝점 좌표 계산 (최대 200%)
		const totalPercent = Math.min(percent, 800);
		const endAngle = (totalPercent / 100) * 2 * Math.PI;
		const endX = centerX + radius * Math.cos(endAngle - Math.PI / 2);
		const endY = centerY + radius * Math.sin(endAngle - Math.PI / 2);

		const endAngle2 = ((totalPercent + 3) / 100) * 2 * Math.PI;
		const endX2 = centerX + radius * Math.cos(endAngle2 - Math.PI / 2);
		const endY2 = centerY + radius * Math.sin(endAngle2 - Math.PI / 2);

		const endAngle3 = ((totalPercent + 1) / 100) * 2 * Math.PI;
		const endX3 = centerX + radius * Math.cos(endAngle3 - Math.PI / 2);
		const endY3 = centerY + radius * Math.sin(endAngle3 - Math.PI / 2);

		const colorsystem = {
			'walking' : ['rgba(255, 138, 0, 1)','rgba(255, 138, 0, .5)','rgba(255, 138, 0, 0)'],
			'exercise' : ['rgba(37, 195, 143, 1)','rgba(37, 195, 143, .5)','rgba(37, 195, 143, 0)'],
			'meal' : ['rgba(155, 141, 252, 1)','rgba(155, 141, 252, .5)','rgba(155, 141, 252, 0)'],
			'water' : ['rgba(82, 154, 252, 1)','rgba(82, 154, 252, .5)','rgba(82, 154, 252, 0)'],
			'medicine' : ['rgba(157, 214, 21, 1)','rgba(157, 214, 21, .5)','rgba(157, 214, 21, 0)'],
			'weight' : ['rgba(179, 116, 204, 1)','rgba(179, 116, 204, .5)','rgba(179, 116, 204, 0)'],
		} 
 		// 끝점에 원형 오브젝트 그리기
		this.ctx.beginPath();
		const gra2 = this.ctx.createRadialGradient(endX3, endY3, 0,endX3, endY3, this.lineWidth / 1.4)
		gra2.addColorStop(0, colorsystem[this.ctg][0]);
		gra2.addColorStop(1, colorsystem[this.ctg][2]);
		this.ctx.arc(endX3, endY3, (this.lineWidth / 1.4), 0, 2 * Math.PI); // 작은 원 그리기
		this.ctx.fillStyle = gra2;
		this.ctx.fill();

		this.ctx.beginPath();
		const gra = this.ctx.createRadialGradient(endX2, endY2, 0,endX2, endY2, this.lineWidth * 1.5)
		gra.addColorStop(0, colorsystem[this.ctg][1]);
		gra.addColorStop(1, colorsystem[this.ctg][2]);
		this.ctx.arc(endX2, endY2, (this.lineWidth * 1.5), 0, 2 * Math.PI); // 작은 원 그리기
		this.ctx.fillStyle = gra;
		this.ctx.fill();

		// 끝점에 원형 오브젝트 그리기
		this.ctx.beginPath();
		this.ctx.arc(endX, endY, this.lineWidth / 2, 0, 2 * Math.PI); // 작은 원 그리기
		this.ctx.fillStyle = gradient;
		if (gColor !== null) {
			switch (gColor) {
				case 0 : 
					this.ctx.fillStyle = (remainingPercent < 5) ? 'rgba(255, 255, 255, 1)': (remainingPercent > 95) ? 'rgba(244, 51, 122, 1)' : gradient2; 
					break; // 100% 그라데이션
				case 1 : 
					this.ctx.fillStyle = (remainingPercent < 5) ? 'rgba(244, 51, 122, 1)' : (remainingPercent > 95) ? 'rgba(61, 16, 188, 1)' : gradient3; 
					break; // 100% 그라데이션
				case 2 : 
					this.ctx.fillStyle = (remainingPercent < 5) ? 'rgba(61, 16, 188, 1)' : (remainingPercent > 95) ? 'rgba(0, 0, 0, 1)' : gradient4; 
					break; // 100% 그라데이션
				default : this.ctx.fillStyle = gradient;
			}
		}
		this.ctx.fill();
		
		// // 시작점에 원형 오브젝트 그리기
		// const startX = centerX + radius * Math.cos(-Math.PI / 2); // 시작점 좌표 계산
		// const startY = centerY + radius * Math.sin(-Math.PI / 2);
		// this.ctx.beginPath();
		// this.ctx.arc(startX, startY, this.lineWidth / 2, 0, 2 * Math.PI); // 시작점에 작은 원 그리기
		// this.ctx.fillStyle = gradient;
		// this.ctx.fill();
	}

	animateChart() {
		const animationSpeed = 1.5; // 애니메이션 속도 조절
		if (this.currentPercent < this.percent) {
			this.currentPercent += animationSpeed;
			if (this.currentPercent > this.percent) {
				this.currentPercent = this.percent;
			}
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // 캔버스 초기화
			this.drawBackgroundCircle(); // 배경 원 다시 그리기
			this.drawChart(this.currentPercent); // 업데이트된 퍼센트로 차트 그리기
			requestAnimationFrame(this.animateChart.bind(this)); // 애니메이션 반복
		} else {
			if (typeof this.onComplete === "function") {
				this.onComplete(); // 애니메이션 완료 시 콜백 호출
			}
		}
	}

	startAnimation() {
		this.drawBackgroundCircle();
		this.animateChart(); // 애니메이션 시작
	}
}
class PageScroll {
	constructor(opt) {
			this.scrollPage = document.querySelector(`.page-scroll[data-page-id="${opt.id}"]`);
			this.isInner = this.scrollPage.classList.contains('inner');
			this.scrollPageItems = this.scrollPage.querySelectorAll(`.page-scroll--item[data-page-id="${opt.id}"]`);
			this.top = this.isInner ? window.scrollTop : this.scrollPage.scrollTop;
			this.baseTop = 0;
			this.wrapHeight = this.isInner ? window.innerHeight : this.scrollPage.offsetHeight
			this.itemRects = [];
			this.callback;
			this.cutline = 100;
			this.init();
	}
	init() {
		this.attachScrollListener();

		this.scrollPageItems.forEach((item, index) => {
			const rect = item.getBoundingClientRect();
			this.itemRects.push(rect);

			if (index === 0)  this.baseTop = rect.top;

			//초기상태에 따른 cutline 설정
			if (this.wrapHeight > rect.top + rect.height - document.documentElement.scrollTop || index === 0) {
				item.dataset.cutline = 'on';
			}
		});

		this.act();
	}
	attachScrollListener() {
		const scrollTarget = this.isInner ? window : this.scrollPage;

		scrollTarget.removeEventListener('scroll', this.onScroll);
		scrollTarget.addEventListener('scroll', this.onScroll, { passive: true });
	}
	onScroll = () => {
		this.act();
	}
	act = () => {
		this.updateScrollTop();
		this.updateItemsState();
	}
	//현재 스크롤 위치 업데이트
	updateScrollTop() {
		const scrollTarget = this.isInner ? document.documentElement : this.scrollPage;
		this.top = scrollTarget.scrollTop;
	}
	//각 항목의 상태 업데이트
	updateItemsState() {
		this.scrollPageItems.forEach((item, index) => {
			const rect = this.itemRects[index];
			const _start = rect.top - this.baseTop;
			const _end = _start + rect.height;
			const _top = this.top + this.wrapHeight;

			//페이지 스크롤 비율 계산 및 업데이트
			if (this.isInRange(_start, _end, _top)) {
				this.updatePagePercent(item, _top, _start, _end);
				this.updateCutlineState(item, _top, _start, index);

				if (item.dataset.cutline === 'on') {
					item.dataset.callback && OcareUI.callback[item.dataset.callback](item);
				}
			}

			//스크롤 중간일 때도 처리
			if (this.isInRange(_start, _end, this.top)) {
				this.updateScrollPercent(item, _start, _end, index);
			}
		})
	}
	isInRange(start, end, top) {
		return start < top && top < end;
	}
	updatePagePercent(item, top, start, end) {
		item.dataset.pagePercent = ((top - start) / (end - start) * 10).toFixed(0);
	}
	updateCutlineState(item, top, start, index) {
		if ((top - start) > this.cutline) {
			item.dataset.cutline = "on";
		} else {
			item.dataset.cutline = "off";
		}

		//이전 항목 상태도 업데이트
		this.updateSiblingItems(index, 'on', 10, -1);
		this.updateSiblingItems(index, 'off', 0, 1);
	}
	updateScrollPercent(item, start, end, index) {
		const percent = ((this.top - start) / (end - start) * 10).toFixed(0);
		const itemPrev = this.scrollPageItems[index - 1];
		const itemNext = this.scrollPageItems[index + 1];

		item.dataset.pageInPercent = percent;
		if (itemPrev) itemPrev.dataset.pageInPercent = 10;
		if (itemNext) itemNext.dataset.pageInPercent = 0;
	}
	updateSiblingItems(currentIndex, cutlineState, pagePercent, step) {
		for (let i = 1; i < this.scrollPageItems.length; i++) {
			const siblingIndex = currentIndex + i * step;
			const currentItem = this.scrollPageItems[siblingIndex];

			if (currentItem) {
				currentItem.dataset.cutline = cutlineState;
				currentItem.dataset.pagePercent = pagePercent;
			} else {
				break;
			}
		}
	}
}

setTimeout(()=> {
	if (!document.querySelector('.capture-style')) {
		const href = window.location.href;
		const isCapture = href.split('?capture');
		let a = href.split(':');
		if (a[1] === '//localhost' || isCapture.length > 1) {
			document.body.classList.add('capture-style');
		}
	}
},500);
