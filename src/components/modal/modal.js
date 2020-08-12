import {Controller} from 'stimulus';
import transition from '../../js/vendor/transition-show';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

document.addEventListener('click', (evt) => {
	const elt = evt.target.closest('[data-modal-show]');

	if (elt) {
		let modalId = elt.dataset.dataModalShow || elt.hash;

		if (modalId) {
			modalId = modalId.replace(/^#/, '');

			// eslint-disable-next-line no-undef
			const modalController = app.getControllerForElementAndIdentifier(document.getElementById(modalId), 'modal');

			if (modalController) {
				evt.preventDefault();
				modalController.show();
			}
		}
	}
});

export default class extends Controller {
	initialize() {
		this.showModal = transition(this.element);
	}

	show() {
		this.shown = true;
	}

	hide() {
		this.shown = false;
	}

	get render() {
		return {
			shown: () => {
				this.showModal(this.shown);

				if (this.shown) {
					disableBodyScroll(this.element, {
						reserveScrollBarGap: true,
					});
				} else {
					enableBodyScroll(this.element);
				}
			},
		};
	}

	get shown() {
		return JSON.parse(this.data.get('shown'));
	}

	set shown(val) {
		if (val !== this.shown) {
			this.data.set('shown', val);
			this.render.shown();
		}
	}
}
