import isVisible from './is-visible';

export default function (elt) {
	let transitionDirection = null;
	let animationFrame;

	function hasCSSTransition() {
		const {
			transitionProperty,
			transitionDuration,
			transitionDelay
		} = getComputedStyle(elt);

		const hasTime = str => str
			.split(', ')
			.slice(0, transitionProperty.split(', ').length)
			.find(val => val !== '0s');

		return transitionProperty !== 'none' && (hasTime(transitionDuration) || hasTime(transitionDelay));
	}

	function emit(type) {
		elt.dispatchEvent(new CustomEvent(type));
	}

	function endTransition(evt) {
		if (!evt || evt.target === evt.currentTarget) {
			elt.removeEventListener('transitioncancel', endTransition);
			elt.removeEventListener('transitionend', endTransition);
			elt.classList.remove(transitionDirection, transitionDirection + '-active', transitionDirection + '-to');

			if (elt.dataset.collapsible === '') {
				elt.style.height = '';
				delete elt.dataset.collapsible;
			}

			if (transitionDirection === 'leave') {
				elt.hidden = true;
			}

			emit('after-' + transitionDirection);
			transitionDirection = null;
		}
	}

	function onTransitionRun(evt) {
		if (evt.target === evt.currentTarget) {
			elt.addEventListener('transitioncancel', endTransition);
			elt.addEventListener('transitionend', endTransition);
		}
	}

	function cancelTransition() {
		if (transitionDirection !== null) {
			cancelAnimationFrame(animationFrame);
			elt.removeEventListener('transitionrun', onTransitionRun);
			elt.removeEventListener('transitioncancel', endTransition);
			elt.removeEventListener('transitionend', endTransition);
			elt.classList.remove(transitionDirection, transitionDirection + '-active', transitionDirection + '-to');
			emit(transitionDirection + '-cancelled');
		}
	}

	function runTransition(direction) {
		transitionDirection = direction;
		emit('before-' + transitionDirection);
		elt.classList.add(transitionDirection, transitionDirection + '-active');

		if (elt.dataset.collapsible === '') {
			elt.style.height = transitionDirection === 'enter' ? 0 : elt.scrollHeight + 'px';
		}

		elt.hidden = false;

		if (!isVisible(elt)) {
			emit(transitionDirection);
			endTransition();
		} else {
			animationFrame = requestAnimationFrame(() => {
				animationFrame = requestAnimationFrame(() => {
					elt.classList.remove(transitionDirection);
					elt.classList.add(transitionDirection + '-to');

					if (elt.dataset.collapsible === '') {
						elt.style.height = transitionDirection === 'enter' ? elt.scrollHeight + 'px' : 0;
					}

					emit(transitionDirection);

					if (!hasCSSTransition()) {
						endTransition();
					} else {
						elt.addEventListener('transitionrun', onTransitionRun);
					}
				});
			});
		}
	}

	return function (show = true, collapsible = false) {
		cancelTransition();

		if (collapsible) {
			elt.dataset.collapsible = '';
		} else {
			delete elt.dataset.collapsible;
		}

		if (show && (elt.hidden || transitionDirection === 'leave')) {
			runTransition('enter');
		} else if (!show && !elt.hidden && (transitionDirection === null || transitionDirection === 'enter')) {
			runTransition('leave');
		}
	};
}
