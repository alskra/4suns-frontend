import {Controller} from 'stimulus';
import transitionShow from '../../js/vendor/transition-show';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

export default class extends Controller {
	static targets = [
		'buttonMenu',
		'menuMobile',
	];

	initialize() {
		this.transitionShowMenuMobile = transitionShow(this.menuMobileTarget);
	}

	connect() {
		this.render.transparent();
	}

	checkViewport() {
		if (window.innerWidth >= 1025 && this.menuMobileOpened) {
			this.toggleMenuMobile();
		}
	}

	checkScroll() {
		this.render.transparent();
	}

	toggleMenuMobile() {
		this.menuMobileOpened = !this.menuMobileOpened;
	}

	get render() {
		return {
			transparent: () => {
				if (this.transparent) {
					if (window.pageYOffset > 0 || this.menuMobileOpened) {
						this.element.classList.remove('header--transparent');
					} else {
						this.element.classList.add('header--transparent');
					}
				}
			},
			menuMobileOpened: () => {
				this.render.transparent();
				this.buttonMenuTarget.classList.toggle('is-opened', this.menuMobileOpened);
				this.transitionShowMenuMobile(this.menuMobileOpened);

				if (this.menuMobileOpened) {
					disableBodyScroll(this.element, {
						reserveScrollBarGap: true,
					});
				} else {
					enableBodyScroll(this.element);
				}
			},
		};
	}

	get transparent() {
		return this.data.has('transparent');
	}

	get menuMobileOpened() {
		return JSON.parse(this.data.get('menuMobileOpened'));
	}

	set menuMobileOpened(val) {
		if (val !== this.menuMobileOpened) {
			this.data.set('menuMobileOpened', val);
			this.render.menuMobileOpened();
		}
	}
}
