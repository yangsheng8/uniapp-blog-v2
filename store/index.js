//1.导入vue 和 vuex
import Vue from 'vue'
import Vuex from 'vuex'

import search from './modules/search'
import user from './modules/user'
import vedio from './modules/vedio'

//2.安装vuex插件
Vue.use(Vuex)
//3.创建store实例
const store = new Vuex.Store({
	modules:{
		search,
		user,
		vedio
	}
})
export default  store
