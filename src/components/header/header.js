import {Controller} from 'stimulus';
import cssVars from 'css-vars-ponyfill';
import transitionShow from '../../js/vendor/transition-show';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

export default class extends Controller {
	static targets = [
	];

	initialize() {
	}

	connect() {
		if (this.element.classList.contains('header--transparent')) {
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
	}
}
