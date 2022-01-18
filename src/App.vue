<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { watch } from 'vue';
import XDrag from './components/XDrag.vue';
import XDragItem from './components/XDragItem.vue';
import XMultiContainer from './components/XMultiContainer.vue';
import data from './demo';

watch(
	() => data,
	newVal => {
		console.log(newVal);
	},
	{ deep: true }
);
</script>

<template>
	<div class="wrapper">
		<p>Open the Console to see the data</p>
		<XMultiContainer class="mul-container">
			<div v-for="(dataItem, index) in data" :key="dataItem.title" :item-index="index">
				<h3>{{ dataItem.title }}</h3>
				<XDrag v-model="data[index].list">
					<XDragItem class="drag-item" v-for="(item, index) in dataItem.list" :key="item.title" :item-index="index">
						<img class="avatar" :src="item.avatar" />
						<div class="item-content">
							<div>{{ item.title }}</div>
							<p>{{ item.content }}</p>
						</div>
					</XDragItem>
				</XDrag>
			</div>
		</XMultiContainer>
	</div>
</template>

<style>
html,
body {
	margin: 0;
	padding: 0;
}
body {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}
.wrapper {
	width: 100%;
	height: 100vh;
	background-color: #8ec5fc;
	background-image: linear-gradient(135deg, #8ec5fc 0%, #e0c3fc 100%);
	box-sizing: border-box;
	padding: 20px;
}
.mul-container {
	display: flex;
	flex-flow: row nowrap;
}
.mul-container > div {
	margin: 0 5px;
}
.drag-item {
	display: flex;
	flex-flow: row nowrap;
	padding: 15px;
	background-color: #fff;
	width: 300px;
}
.drag-item + .drag-item {
	margin-top: 5px;
}
.item-content {
	margin-left: 10px;
	text-align: left;
}
.item-content > div {
	font-weight: bold;
}
.item-content > p {
	color: gray;
}
.avatar {
	width: 50px;
	height: 50px;
	border-radius: 50%;
}
.json-container {
	width: 300px;
	white-space: pre;
}
</style>
