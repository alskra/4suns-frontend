import {Controller} from 'stimulus';
import Swiper, {Navigation, Pagination} from 'swiper';

Swiper.use([Navigation, Pagination]);

export default class extends Controller {
	static targets = [
		'swiper',
		'buttonPrev',
		'buttonNext',
		'pagination',
	];

	initialize() {
		this.swiper = new Swiper(this.swiperTarget, {
			navigation: {
				prevEl: this.buttonPrevTarget,
				nextEl: this.buttonNextTarget,
				disabledClass: 'is-disabled',
			},
			pagination: {
				el: this.paginationTarget,
				bulletClass: 'slider-main__pagination-bullet',
				bulletActiveClass: 'is-active',
			},
		});
	}
}
