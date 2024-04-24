import 'element-plus/es/components/message/style/index'
import 'element-plus/es/components/message-box/style/index'

import PrimeVue from 'primevue/config'

import './assets/index.css'

import { createApp } from 'vue'

import pinia from './store'

import App from './App.vue'
import router from './router'
import Lara from '@/presets/lara'
import Wind from '@/presets/wind'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  unstyled: true,
  pt: Wind,
})

app.mount('#app')
