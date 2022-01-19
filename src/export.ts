import { App, DefineComponent } from 'vue';
import XDragContainer from './components/XDragContainer/XDragContainer.vue';
import XDragItem from './components/XDragItem/XDragItem.vue';
import XDragController from './components/XDragController/XDragController.vue';

const components = { XDragContainer, XDragItem, XDragController };

const install = function (app: App) {
	Object.keys(components).forEach(name => {
		app.component(name, (<any>components)[name]);
	});
};

export default { ...components, install };
