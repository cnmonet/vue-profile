import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import 'vue-croppa/dist/vue-croppa.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import '@/iconfont/iconfont.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import Croppa from 'vue-croppa'
Vue.use(Croppa)
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
