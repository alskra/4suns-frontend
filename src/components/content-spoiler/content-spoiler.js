import {Controller} from 'stimulus';
import transitionShow from '../../js/vendor/transition-show';

export default class extends Controller {
	static targets = ['main'];

	initialize() {
		this.transitionShow = transitionShow(this.mainTarget);
	}

	toggle() {
		this.opened = !this.opened;
	}

	get render() {
		return {
			opened: () => {
				this.element.classList.toggle('is-opened', this.opened);
				this.transitionShow(this.opened, true);
			},
		};
	}

	get opened() {
		return JSON.parse(this.data.get('opened'));
	}

	set opened(val) {
		if (val !== this.opened) {
			this.data.set('opened', val);
			this.render.opened();
		}
	}
}
