import { App } from 'vue';
import XDragController from './XDragController.vue';

XDragController.install = (app: App): void => {
	app.component(XDragController.name, XDragController);
};

export default XDragController;
