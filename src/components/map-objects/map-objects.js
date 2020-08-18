import {Controller} from 'stimulus';

export default class extends Controller {
	initialize() {
		// eslint-disable-next-line no-undef
		ymaps.ready(() => {
			// eslint-disable-next-line no-undef
			this.map = new ymaps.Map(this.element, {
				center: this.center,
				zoom: window.innerWidth >= 1025 ? 11 : 9,
			});

			this.map.behaviors.disable('scrollZoom');
			this.setObjects();
		});
	}

	setObjects() {
		// eslint-disable-next-line no-unused-vars
		this.objects.forEach(([title, image, lat, lng], index) => {
			// eslint-disable-next-line no-undef
			const placemark = new ymaps.Placemark([lat, lng], {
				hintContent: title,
			}, {
				// eslint-disable-next-line no-undef
				iconLayout: ymaps.templateLayoutFactory.createClass(`
					<div class="map-objects__popup-container">
						<div class="map-objects__popup-anchor">
							<div class="map-objects__popup">
								<div class="map-objects__popup-image-box">
									<img class="map-objects__popup-image" src="${image}" alt="${title}">
								</div>
								<div class="map-objects__popup-body">
									<div class="map-objects__popup-title">${title}</div>
								</div>
							</div>
						</div>
					</div>
				`),
				// iconShape: {
				// 	type: 'Rectangle',
				// 	coordinates: [
				// 		[-80, -120],
				// 		[80, -8],
				// 	],
				// },
			});

			this.map.geoObjects.add(placemark);

			// setTimeout(() => {
			// 	const popupElt = document.querySelectorAll('.map-objects__popup')[index];
			// 	console.log(index, document.querySelectorAll('.map-objects__popup')[index], placemark);
			//
			// 	placemark.options.set({
			// 		iconShape: {
			// 			type: 'Rectangle',
			// 			coordinates: [
			// 				[-80, -120],
			// 				[80, -8],
			// 			],
			// 		},
			// 	});
			// }, 100);
		});
	}

	get center() {
		return JSON.parse(this.data.get('center'));
	}

	get objects() {
		return JSON.parse(this.data.get('objects'));
	}
}
