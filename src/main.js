import './assets/index.css'
import 'element-plus/es/components/message/style/index'
import 'element-plus/es/components/message-box/style/index'

import { createApp } from 'vue'
import pinia from './store'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
