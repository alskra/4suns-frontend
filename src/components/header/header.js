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
		this.render.transparent();
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
			transparent: () => {
				this.element.classList.toggle('header--transparent', this.transparent);

				if (this.transparent) {
					cssVars({
						variables: {
							'--header_-_background-color': 'transparent',
							'--header_-_color': 'var(--color-alabaster)',
							'--header-button-login_-_border-color': 'transparent',
						},
					});
				} else {
					cssVars({
						variables: {
							'--header_-_background-color': 'var(--color-white)',
							'--header_-_color': 'var(--color-tundora)',
							'--header-button-login_-_border-color': '#DDDDDD',
						},
					});
				}
			},

			menuMobileOpened: () => {
				this.buttonMenuTarget.classList.toggle('is-opened', this.menuMobileOpened);
				this.transitionShowMenuMobile(this.menuMobileOpened);
				this.transparent = !this.menuMobileOpened;

				if (this.menuMobileOpened) {
					window.scrollTo(0, 0);
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
		return JSON.parse(this.data.get('transparent'));
	}

	set transparent(val) {
		if (val !== this.transparent) {
			this.data.set('transparent', val);
			this.render.transparent();
		}
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
