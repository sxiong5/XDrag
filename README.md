<h1 align="center">xDrag</h1>
<p align="center">An <strong>interactive draggable</strong> component based on <code><a href="https://v3.vuejs.org/">Vue 3</a></code></p>

![demo](./src/assets/demo.gif)
<p align="center"><a href="#">Demos are here!!</a></p>

## Inspiration
The inspiration of this component was come from [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)

## Characteristics
* Build with `Vue 3`
* Style free, you can set any CSS style you want to it
* Highly interactive

## Currently Supported Features
* Vertical lists ↕
* Horizontal lists ↔
* Movement between lists (▤ ↔ ▤)
* Nested lists

## Get Start

### Installation
```shell
npm i x-drag
```

### Full Import
```js
import XDrag from 'x-drag'
import 'x-drag/dist/style.css'

Vue.use(XDrag)
```

### On-demand Import
```js
import { reactive } from 'vue
import { XDragContainer, XDragItem } from 'x-drag'

const arr = reactive(Array.form({length: 5}).map((_, index) => index + 1))
```

### Usage
#### Basic Use
```html
<template>
  <x-drag-container v-model="arr">
    <x-drag-item v-for="(item, index) in arr" :key="item" :item-index="index">
      {{ item }}
    </x-drag-item>
  </x-drag-container>
</template>
```

### Props
#### `XDragContainer`
| prop | type | description | default |
| ---- | ---- | ---- | ---- |
| modelValue | any[] | binding value | - |
| activeClass | string | css class for dragging item | - |
| appendTo | string of css selector | the container where the dragging item append to | #app |

#### `XDragItem`
| prop | type | description |
| ---- | ---- | ---- |