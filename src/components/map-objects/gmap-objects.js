import {Controller} from 'stimulus';

// eslint-disable-next-line no-undef
/*class Popup extends google.maps.OverlayView {
	constructor(position, content) {
		super();
		this.position = position;

		// This zero-height div is positioned at the bottom of the bubble.
		const bubbleAnchor = document.createElement('div');

		bubbleAnchor.classList.add('map-objects__popup-anchor');
		bubbleAnchor.appendChild(content);

		// This zero-height div is positioned at the bottom of the tip.
		this.containerDiv = document.createElement('div');
		this.containerDiv.classList.add('map-objects__popup-container');
		this.containerDiv.appendChild(bubbleAnchor);

		// Optionally stop clicks, etc., from bubbling up to the map.
		Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
	}

	/!** Called when the popup is added to the map. *!/
	onAdd() {
		this.getPanes().floatPane.appendChild(this.containerDiv);
	}

	/!** Called when the popup is removed from the map. *!/
	onRemove() {
		if (this.containerDiv.parentElement) {
			this.containerDiv.parentElement.removeChild(this.containerDiv);
		}
	}

	/!** Called each frame when the popup needs to draw itself. *!/
	draw() {
		const divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

		// Hide the popup when it is far out of view.
		const display =
			Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
				? 'block'
				: 'none';

		if (display === 'block') {
			this.containerDiv.style.left = `${divPosition.x}px`;
			this.containerDiv.style.top = `${divPosition.y}px`;
		}

		if (this.containerDiv.style.display !== display) {
			this.containerDiv.style.display = display;
		}
	}
}*/

export default class extends Controller {
	initialize() {
		// eslint-disable-next-line no-undef
		this.map = new google.maps.Map(this.element, {
			center: {
				lat: this.center[0],
				lng: this.center[1],
			},
			zoom: window.innerWidth >= 1025 ? 11 : 9,
		});

		this.setObjects();
	}

	setObjects() {
		this.objects.forEach(([title, image, lat, lng]) => {
			const content = document.createElement('div');

			content.classList.add('map-objects__popup');
			content.innerHTML = `
				<div class="map-objects__popup-image-box">
					<img class="map-objects__popup-image" src="${image}" alt="${title}">
				</div>
				<div class="map-objects__popup-body">
					<div class="map-objects__popup-title">${title}</div>
				</div>
			`;

			// eslint-disable-next-line no-undef
			const popup = new Popup(new google.maps.LatLng(lat, lng), content);

			popup.setMap(this.map);
		});
	}

	get center() {
		return JSON.parse(this.data.get('center'));
	}

	get objects() {
		return JSON.parse(this.data.get('objects'));
	}
}
