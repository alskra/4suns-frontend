import {Controller} from 'stimulus';
import Swiper, {Navigation, Autoplay, Lazy} from 'swiper';

Swiper.use([Navigation, Autoplay, Lazy]);

export default class extends Controller {
	static targets = [
		'swiper',
		'item',
		'buttonPrev',
		'buttonNext',
	];

	initialize() {
		if (this.itemTargets.length > 1) {
			this.swiper = new Swiper(this.swiperTarget, {
				speed: this.speed,
				loop: true,
				lazy: {
					loadPrevNext: true,
				},
				navigation: {
					prevEl: this.buttonPrevTarget,
					nextEl: this.buttonNextTarget,
					disabledClass: 'is-disabled',
				},
				autoplay: {
					delay: this.autoplayDelay,
				},
			});
		}
	}

	get speed() {
		return JSON.parse(this.data.get('speed')) || 300;
	}

	get autoplayDelay() {
		return JSON.parse(this.data.get('autoplayDelay')) || 3000;
	}
}
