import {Controller} from 'stimulus';

export default class extends Controller {
	initialize() {
		// eslint-disable-next-line no-undef
		ymaps.ready(() => {
			// eslint-disable-next-line no-undef
			this.map = new ymaps.Map(this.element, {
				center: this.center,
				zoom: 15,
			});

			this.map.behaviors.disable('scrollZoom');
			this.setMarkers();
		});
	}

	setMarkers() {
		this.markers.forEach(([title, lat, lng]) => {
			// eslint-disable-next-line no-undef
			this.map.geoObjects.add(new ymaps.Placemark([lat, lng], {
				hintContent: title,
			}));
		});
	}

	get center() {
		return JSON.parse(this.data.get('center'));
	}

	get markers() {
		return JSON.parse(this.data.get('markers'));
	}
}
