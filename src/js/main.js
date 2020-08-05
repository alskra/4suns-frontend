import './vendor';
import './helpers';
import {Application, Controller} from 'stimulus';

// Start Stimulus
const app = Application.start();

window.app = app;

Controller.prototype.emit = function emit(type, detail) {
	this.element.dispatchEvent(new CustomEvent(type, {
		bubbles: true,
		detail: {
			controller: this,
			...detail,
		},
	}));
};

Controller.prototype.getController = app.getControllerForElementAndIdentifier.bind(app);

const requireControllers = require.context('../components', true, /\.js$/);

requireControllers.keys().forEach((fileName) => {
	const controllerConfig = requireControllers(fileName).default || requireControllers(fileName);

	const controllerName = fileName
		.replace(/^.+\//, '')
		.replace(/\.js$/, '');

	app.register(controllerName, controllerConfig);
});
