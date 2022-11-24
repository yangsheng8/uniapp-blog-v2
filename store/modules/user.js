import { login } from '@/api/user.js'
const STORAGE_KEY = 'user-info'; 
const TOKEN_KEY = 'token';
export default {
	namespaced: true,
	state:()=>{
		return {
			//用户token
			token: uni.getStorageSync(TOKEN_KEY) || '',
			//用户信息
			userInfo: uni.getStorageSync(STORAGE_KEY) || {}
		};
	},
	mutations:{
		/*
		* 保存 token 到 vuex
		*/
	   setToken(state, token){
			state.token = token
			this.commit('user/saveToToken')
	   },
	   /*
	   * 保存 token 到本地存储
	   */
	   saveToToken(state){
		   uni.setStorage({
		   	key:TOKEN_KEY,
			data: state.token
		   })
	   },
	   removeToken(state){
	   		 state.token = ''
	   		this.commit('user/saveToToken')
	   },
	   /*
	   * 保存 userinfo 到 vuex
	   */
	  setUserInfo(state,userInfo){
		state.userInfo = userInfo
		this.commit('user/saveToUserInfo')
	  },
	  /*
	  * 保存 userinfo 到本地存储
	  */
	 saveToUserInfo(state){
		 uni.setStorage({
		 	key:STORAGE_KEY,
			data:state.userInfo
		 })
	 },
	 removeUserInfo(state){
		 state.userInfo = {}
		this.commit('user/saveToUserInfo')
	 }
	},
	actions: {
		async login(context, userProfile){
			//用户数据
			const rawData = userProfile.userInfo;
			//调用登录接口
			const { data: res } = await login({
				signature: userProfile.signature, 
				iv: userProfile.iv, 
				nickName: rawData.nickName, 
				gender: rawData.gender, 
				city: rawData.city, 
				province: rawData.province, 
				avatarUrl: rawData.avatarUrl
			})
			// 登录逻辑 
			this.commit('user/setToken', res.token); 
			this.commit('user/setUserInfo', JSON.parse(userProfile.rawData));
		},
		/*判断是否登录*/
		async isLogin(context){
			if(context.state.token) return true
			const [error, res] = await uni.showModal({
				title: '登录之后才可以进行后续操作',
				content:'立即跳转到登录页面？（登录后回自动返回当前页面哦~~~）'
			})
			const { cancel, confirm } = res;
			if(confirm){
				uni.navigateTo({
					url: '/subpkg/pages/login-page/login-page'
				})
			}
			return false
		},
		/*退出登录*/
		loginOut(context){
			this.commit('user/removeToken')
			this.commit('user/removeUserInfo')
		}
	}
}