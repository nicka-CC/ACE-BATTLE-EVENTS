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

// Add icons to the library
library.add(faCalendarAlt, faUsers, faRunning, faChevronUp, faChevronDown)

const app = createApp(App)

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon) // Register the component globally
app.mount('#app') 