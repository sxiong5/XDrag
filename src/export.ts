import XDrag from './components/XDrag.vue';
import XDragItem from './components/XDragItem.vue';
import XMultiContainer from './components/XMultiContainer.vue';

const components = [XDrag, XDragItem, XMultiContainer];

const install = function (App: any) {
	components.forEach(component => {
		App.component(component.name, component);
	});
};

export { XDrag, XDragItem, XMultiContainer, install };
