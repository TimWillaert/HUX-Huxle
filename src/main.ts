import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import './assets/style.css';

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      english: 'English',
      german: 'German',
      defaultLang: 'Default language',
      welcome: 'Welcome to',
      start: 'Start playing by using a link with a Huxle game ID',
      or: 'OR',
      createOwn: 'Create your own Huxle',
      create: 'Create a Huxle',
      englishWord: 'English word',
      germanWord: 'German word',
      createLink: 'Create link',
      linkShare: 'Link to share',
      invalidLink: 'Whoops! Invalid link.',
      guesses: 'Guesses',
      time: 'Time'
    },
    de: {
      english: 'Englisch',
      german: 'Deutsch',
      defaultLang: 'Standardsprache',
      welcome: 'Willkommen zu',
      start:
        'Beginnen Sie zu spielen, indem Sie einen Link mit einer Huxle-Spiel-ID verwenden',
      or: 'ODER',
      createOwn: 'Erstellen Sie Ihren eigenen Huxle',
      create: 'Erstellen Sie einen Huxle',
      englishWord: 'Englisches Wort',
      germanWord: 'Deutsches Wort',
      createLink: 'Link erstellen',
      linkShare: 'Link zum Teilen',
      invalidLink: 'Hoppla! Ungültiger Link.',
      guesses: 'Vermutungen',
      time: 'Zeit'
    },
  },
});

const app = createApp(App);

app.use(i18n);
app.use(router);

app.mount('#app');
