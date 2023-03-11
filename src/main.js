/*
 * @Descripttion: 
 * @version: 
 * @Author: shaye
 * @Date: 2023-03-08 18:54:45
 * @LastEditors: shaye
 * @LastEditTime: 2023-03-11 11:57:39
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './mock/mock.js'
import * as echarts from 'echarts'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)

app.config.globalProperties.$http = axios
app.config.globalProperties.$echarts=echarts

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
