import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueSpinners } from '@saeris/vue-spinners'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(VueSpinners)

app.mount('#app')
