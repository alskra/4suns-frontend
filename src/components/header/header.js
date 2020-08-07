import {Controller} from 'stimulus';
import cssVars from 'css-vars-ponyfill';
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
		if (this.transparent) {
			this.enableTransparent();
		}
	}

	enableTransparent() {
		this.element.classList.add('header--transparent');
	}

	disableTransparent() {
		this.element.classList.remove('header--transparent');
	}

	toggleMenuMobile() {
		this.menuMobileOpened = !this.menuMobileOpened;
	}

	checkViewport() {
		if (window.innerWidth >= 1025 && this.menuMobileOpened) {
			this.toggleMenuMobile();
		}
	}

	get render() {
		return {
			menuMobileOpened: () => {
				this.buttonMenuTarget.classList.toggle('is-opened', this.menuMobileOpened);
				this.transitionShowMenuMobile(this.menuMobileOpened);

				if (this.menuMobileOpened) {
					window.scrollTo(0, 0);
					disableBodyScroll(this.element, {
						reserveScrollBarGap: true,
					});

					if (this.transparent) {
						this.disableTransparent();
					}
				} else {
					enableBodyScroll(this.element);

					if (this.transparent) {
						this.enableTransparent();
					}
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
