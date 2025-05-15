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

		console.log(this.btns)
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
				this.repeat_limit = 6;
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
				alert('맞습니다.');
				this.wrap.dataset.state = 'complete';
			} else {
				alert('틀렸어요');
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
				this.speed = 50;
				this.repeat_limit = 16;
				break;
		}

		this.act();
	}
	act = (event) => {
		let rNum = Math.floor(Math.random() * 9);
		console.log(rNum);
		this.m = rNum;

		rNum = Math.floor(Math.random() * 9);
		this.s = rNum;
		console.log(rNum);

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
			console.log('완료', this.m);
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
				alert('맞습니다.');
				this.wrap.dataset.state = 'complete';
			} else {
				alert('틀렸어요');
			}
		}

		for (let btn of this.btns) {
			btn.addEventListener('click', act);
		}
	}
}

class randomText {
	constructor(opt) {
		this.wrap = document.querySelector('.game-text-rendom');
		this.view = this.wrap.querySelector('.game-text-rendom-view');
		this.btnbox = this.wrap.querySelector('.game-text-rendom-btns');
		this.btns = this.btnbox.querySelectorAll('.game-text-rendom-btn');
		this.level = opt.level;
		this.words = opt.words;
		this.len = 0;
	}
	init() {
		this.act();
	}
	act = (event) => {
		let len = this.words.length;
		let tNum = Math.floor(Math.random() * len);
		let rendomTxt = this.words[tNum];
		this.view.textContent = rendomTxt;

		this.btnbox.innerHTML = '';

		for (let i = 0; i < len; i++) {
			const newbt = document.createElement('button');
			newbt.className = 'game-text-rendom-btn';
			newbt.innerText = this.words[i];
			newbt.dataset.value = this.words[i];

			newbt.addEventListener('click', this.answer);
			this.btnbox.appendChild(newbt);
		}

	}
	answer= (event) =>  {
		event.currentTarget.dataset.value === this.view.textContent ? alert('정답') : alert('오답');
	}
}