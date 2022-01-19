import { App } from 'vue';
import XDragContainer from './XDragContainer.vue';

XDragContainer.install = (app: App): void => {
	app.component(XDragContainer.name, XDragContainer);
};

export default XDragContainer;
