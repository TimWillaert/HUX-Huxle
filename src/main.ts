import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import './assets/style.css';
import { createPinia } from 'pinia';
import english from './locale/en.json'
import german from './locale/de.json'

const i18n = createI18n({
  locale: localStorage.getItem('locale') || 'en',
  legacy: false,
  messages: {
    en: english,
    de: german,
  },
});

const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$locale = i18n.global.locale;

app.use(i18n);
app.use(router);
app.use(pinia);

app.mount('#app');
