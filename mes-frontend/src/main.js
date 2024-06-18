import { createApp,h } from 'vue'
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; // Import Material Design Icons CSS
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // Import Material Design Icons

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';



const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Specify the default icon set
    aliases,
    sets: {
      mdi,
    },
  },
});

const app  = createApp({
  render: ()=>h(App)
});

app.use(router);
app.use(vuetify);



app.mount('#app');
