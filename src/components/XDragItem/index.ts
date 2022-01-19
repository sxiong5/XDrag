import { App } from 'vue';
import XDragItem from './XDragItem.vue';

XDragItem.install = (app: App): void => {
	app.component(XDragItem.name, XDragItem);
};

export default XDragItem;
