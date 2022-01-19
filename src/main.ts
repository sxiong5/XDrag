import { createApp } from 'vue';
import App from './App.vue';
import xDrag from './export';

const app = createApp(App);

app.use(xDrag).mount('#app');
