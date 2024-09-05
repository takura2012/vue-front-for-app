import '@/assets/main.css';
import '@/assets/utils.css';
import '@/assets/variables.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const server_url = 'http://192.168.1.15:5000/api';
localStorage.setItem('server_url', server_url);

createApp(App)
.use(router)
.mount('#app')