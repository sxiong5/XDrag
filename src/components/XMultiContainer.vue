<template>
	<div class="x-multi-conrainer">
		<slot />
	</div>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue';
import { XDragRecord } from '../drag';

const src = ref<XDragRecord | null>(null);
provide('src', src);
provide('setSrc', (val: XDragRecord | null) => (src.value = val));

const newNode = ref<HTMLLIElement | null>(null);
provide('newNode', newNode);
provide('setNewNode', (node: HTMLLIElement | null) => (newNode.value = node));
</script>
