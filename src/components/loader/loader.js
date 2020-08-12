import {Controller} from 'stimulus';

export default class extends Controller {
	static targets = ['item'];

	initialize() {
		this.loaderSpin = document.createElement('div');
		this.loaderSpin.classList.add('loader-spin');
		this.loaderSpin.innerHTML = `
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		`;

		this.loaderError = document.createElement('div');
		this.loaderError.classList.add('loader-error', 'container');

		this.observer = new IntersectionObserver((entries, observer) => {
			const entry = entries[0];

			if (entry.isIntersecting) {
				observer.unobserve(entry.target);
				this.load();
			}
		});
	}

	connect() {
		if (this.lastItem) {
			this.observer.observe(this.lastItem);
		}
	}

	disconnect() {
		this.observer.disconnect();
	}

	showSpin() {
		this.element.appendChild(this.loaderSpin);
	}

	hideSpin() {
		this.loaderSpin.remove();
	}

	showError(err) {
		this.loaderError.innerHTML = err;
		this.element.appendChild(this.loaderError);
	}

	hideError() {
		this.loaderError.remove();
	}

	async load() {
		this.hideError();
		this.showSpin();

		try {
			const response = await fetch(this.url);

			if (response.ok) {
				let html = (await response.text()).trim();

				if (html !== '') {
					this.lastItem.insertAdjacentHTML('afterend', html);
					this.observer.observe(this.lastItem);
				}
			} else {
				this.showError(`HTTP Error: ${response.status}`);
			}
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
			this.showError(err);
		}

		this.hideSpin();
	}

	get lastItem() {
		return this.itemTargets[this.itemTargets.length - 1];
	}

	get url() {
		return this.data.get('url');
	}

	set url(val) {
		this.data.set('url', val);
	}
}
