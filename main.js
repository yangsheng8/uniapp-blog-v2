
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import './styles/global.scss'
import store from './store'
import './styles/article-detail.scss'
Vue.config.productionTip = false
import * as filters from './filters'
App.mpType = 'app'
Object.keys(filters).forEach((key)=>{ Vue.filter(key, filters[key]) })
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif