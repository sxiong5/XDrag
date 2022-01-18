<template>
	<transition-group tag="ul" name="x-drag" class="x-drag-container">
		<component ref="slot" :is="$slots.default && $slots.default()[0]" />
	</transition-group>
</template>

<script lang="ts" setup>
/**
 * XDrag
 * @property {any[]} modelValue bind data
 * @property {string} activeClass the css class of the dragging item
 * @property {string} appendTo the container of the dradding item append to (default as '#app')
 *
 * @event onDragEnd trigger when drag ended
 */
import { ComponentInternalInstance, getCurrentInstance, inject, nextTick, provide, Ref, ref } from 'vue';
import { XDragRecord, setSrcFunc } from '../drag';
export interface XDragProps {
	modelValue: any[];
	activeClass?: string;
	appendTo?: string;
}

const instance: ComponentInternalInstance = getCurrentInstance()!;
const props = withDefaults(defineProps<XDragProps>(), { appendTo: '#app' });
const emits = defineEmits<{ (e: 'onDragEnd', value: any[]): void }>();

const setNewNode = inject<(node: HTMLLIElement | null) => void>('setNewNode');
const src = inject<Ref<XDragRecord | null>>('src') ?? ref<XDragRecord | null>(null);
provide('src', src);
const setSrc = inject<setSrcFunc>('setSrc') ?? ((val: XDragRecord | null) => (src.value = val));
provide('setSrc', setSrc);
provide('dragIns', instance);
provide('props', props);
provide('emits', emits);

/**
 * sort function
 * @param {XDragInfo} targetInfo
 */
const handleSort = (targetInfo: XDragRecord) => {
	const { instance: targetIns, index: targetIndex } = targetInfo;

	// did not use XMultiContainer, cannot srot between multiple lists
	if (!src.value?.instance) return;

	if (src.value?.instance.uid === targetIns.uid) {
		const { modelValue } = props as XDragProps;
		// sort in the same list
		[modelValue[targetIndex], modelValue[src.value?.index]] = [modelValue[src.value?.index], modelValue[targetIndex]];
		src.value.index = targetIndex;
	} else {
		// sort between tow lists
		const { modelValue: srcVal } = src.value.instance.props as any;
		const { modelValue: targetVal } = targetIns.props as any;

		// move the data from src to target
		targetVal.splice(targetIndex, 0, ...srcVal.splice(src.value.index, 1));
		nextTick(() => {
			const node = (<any>targetIns).ctx.$el.children[targetIndex] as HTMLLIElement;
			setNewNode && setNewNode(node);
			setSrc({ instance: targetIns, index: targetIndex });
		});
	}
};
provide('handleSort', handleSort);
</script>

<style scoped>
.x-drag-container {
	list-style: none;
	margin: 0;
	padding: 0;
	position: relative;
}
</style>
<style>
.x-drag-move {
	transition: all 0.3s ease-out;
	pointer-events: none;
}
.x-drag-leave-active {
	position: absolute;
}
</style>
