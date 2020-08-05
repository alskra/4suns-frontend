import {Controller} from 'stimulus';

export default class extends Controller {
	static targets = [
		'menu',
		'buttonMenu',
	];

	toggleMenu() {
		this.menuTarget.classList.toggle('is-opened');
		this.buttonMenuTarget.classList.toggle('is-active');
	}

	closeMenu() {
		this.menuTarget.classList.remove('is-opened');
		this.buttonMenuTarget.classList.remove('is-active');
	}
}
