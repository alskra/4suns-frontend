import {Controller} from 'stimulus';

export default class extends Controller {
	initialize() {
		// eslint-disable-next-line no-undef
		this.map = new google.maps.Map(this.element, {
			zoom: 15,
			center: {
				lat: this.center[0],
				lng: this.center[1],
			},
		});

		this.setMarkers();
	}

	setMarkers() {
		this.markers.forEach(([title, lat, lng]) => {
			// eslint-disable-next-line no-new,no-undef
			new google.maps.Marker({
				position: {
					lat,
					lng,
				},
				map: this.map,
				title,
			});
		});
	}

	get center() {
		return JSON.parse(this.data.get('center'));
	}

	get markers() {
		return JSON.parse(this.data.get('markers'));
	}
}
