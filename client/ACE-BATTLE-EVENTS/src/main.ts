import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import './assets/main.css'

// Font Awesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCalendarAlt,
  faUsers,
  faRunning,
  faChevronUp,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Add icons to the library
library.add(faCalendarAlt, faUsers, faRunning, faChevronUp, faChevronDown)

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon) // Register the component globally
app.mount('#app')
