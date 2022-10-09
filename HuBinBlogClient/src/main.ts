import { createApp } from 'vue'
import App from './App.vue'

import { globalRegister } from './global'
import { createPinia } from 'pinia'
import { useLoginStore } from '@/store/login/login'

import "./styles/common.less";
import "./assets/fonts/icon/iconfont.css";
import "./assets/fonts/icon/iconfont.js";
import 'normalize.css'
import './assets/css/index.less'

import router from './router'
import { ElMessage, ElNotification,ElMessageBox } from 'element-plus'

const app = createApp(App)
app.provide('message', ElMessage)
app.provide('notify', ElNotification)
app.provide('dialog', ElMessageBox)

app.use(globalRegister)
app.use(createPinia())
const store = useLoginStore()
store.loadLocalLogin()


app.use(router)

app.mount('#app')
