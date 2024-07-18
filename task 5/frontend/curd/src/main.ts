import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router'; // Ensure router is correctly imported

const app = createApp(App);
app.use(router); // Use the router in the app
app.mount('#app');
