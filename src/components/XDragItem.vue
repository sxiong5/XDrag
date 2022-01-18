<template>
	<li
		draggable="true"
		ref="dragItem"
		class="x-drag-item"
		:style="{ opacity }"
		@dragstart="onDragStart"
		@drag="onDrag"
		@dragover="e => e.preventDefault()"
		@dragend="onDragEnd"
		@dragenter="onDragEnter"
	>
		<slot />
	</li>
</template>

<script lang="ts" setup>
import { ComponentInternalInstance, inject, nextTick, Ref, ref, watch } from 'vue';
import { handleSortFunc, setSrcFunc } from '../drag';
import { XDragProps } from './XDrag.vue';

const props = defineProps<{ itemIndex: number }>();
const dragItem = ref<HTMLLIElement>();
let cloneNode: HTMLLIElement;
const newNode = inject<Ref<HTMLLIElement | null>>('newNode')!;
const startPos = ref<[number, number]>([NaN, NaN]);
const opacity = ref<0 | 1>(1);
const setSrc = inject<setSrcFunc>('setSrc')!;
const dragIns = inject<ComponentInternalInstance>('dragIns')!;
const handleSort = inject<handleSortFunc>('handleSort')!;
const _props = inject<XDragProps>('props')!;
const emits = inject<{ (e: 'onDragEnd', value: any[]): void }>('emits')!;
const container = _props.appendTo ? document.querySelector(_props.appendTo)! : document.body;

watch(newNode, newVal => {
	opacity.value = newVal === dragItem.value ? 0 : 1;
});

const onDragStart = (e: DragEvent) => {
	const { offsetX, offsetY } = e;
	const img: HTMLImageElement = new Image();
	img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cpath /%3E%3C/svg%3E";
	e.dataTransfer!.setDragImage(img, 0, 0);
	startPos.value = [offsetX, offsetY];

	const { left, top } = <DOMRect>dragItem.value?.getBoundingClientRect();
	cloneNode = <HTMLLIElement>dragItem.value?.cloneNode(true);
	cloneNode.classList.add('dragging-item');
	_props.activeClass && cloneNode.classList.add(_props.activeClass);
	cloneNode.classList.remove('x-drag-item');
	cloneNode.style.transform = `translate(${left}px, ${top}px)`;
	opacity.value = 0;
	setSrc({ instance: dragIns, index: props.itemIndex });
	container.appendChild(cloneNode);
};

const onDrag = (e: DragEvent) => {
	if (cloneNode) {
		const { clientX, clientY } = e;
		if (clientX && clientY) {
			const [startX, startY] = startPos.value;
			cloneNode.style.transform = `translate(${clientX - startX}px, ${clientY - startY}px)`;
		}
	}
};

const onDragEnter = (e: DragEvent) => {
	e.preventDefault();
	handleSort({ instance: dragIns, index: props.itemIndex });
};

const onDragEnd = () => {
	nextTick(() => {
		const { left, top } = <DOMRect>(dragItem.value?.getBoundingClientRect() ?? newNode?.value?.getBoundingClientRect());
		const reset = cloneNode.animate(
			[{ transform: cloneNode.style.transform }, { transform: `translate(${left}px, ${top}px)` }],
			{
				duration: 300,
				easing: 'linear'
			}
		);
		reset.onfinish = () => {
			container.removeChild(cloneNode);
			opacity.value = 1;
			startPos.value = [NaN, NaN];
			setSrc(null);
			newNode && (newNode.value = null);
			emits('onDragEnd', _props.modelValue);
		};
	});
};
</script>

<style scoped>
.dragging-item {
	left: 0;
	top: 0;
	transform: translate(0, 0);
	position: fixed;
	list-style: none;
	pointer-events: none;
}
</style>
