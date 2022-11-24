<template>
	<view class="my-container"> 
	<!-- 用户未登录 --> 
	<block v-if="!token"> 
		<image class="avatar avatar-img" src="/static/images/default-avatar.png" mode="scaleToFill" /> 
		<view class="login-desc">登录后可同步数据</view> 
		<!-- #ifdef MP-WEIXIN -->
		<button class="login-btn" type="primary" @click="getUserInfo">微信用户一键登录</button> 
		<!-- #endif --> 
		<!-- #ifndef MP-WEIXIN -->
		<button class="login-btn" type="primary" @click="onAutoLogin">一键登录</button>
		<!-- #endif --> 
	</block>
	<!--已登录-->
	 <block v-else>
		 <image class="avatar avatar-img" :src="userInfo.avatarUrl" mode="scaleToFill" /> 
		 <view class="login-desc">{{ userInfo.nickName }}</view> 
		 <button class="login-btn" type="default" @click="onLogoutClick">退出登录</button>
	 </block>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('user',['token','userInfo'])
		},
		methods:{
			...mapActions('user', ['login','loginOut']),
			getUserInfo(){
				//展示加载框
				uni.showLoading({
					title:'加载中'
				})
				//获取用户信息
				uni.getUserProfile({
					desc: '登录后可同步数据',
					success:async (obj)=> {
						await this.login(obj);
						//登录成功之后，发送事件
						this.$emit('onLoginSuccess')
					},
					fail:()=>{
						
					},
					complete:()=>{
						//关闭加载框
						uni.hideLoading();
					}
				})
			
			},
			/*退出登录*/
			onLogoutClick(){
				uni.showModal({
					title:'提示',
					content: '退出登录将无法同步数据哦~',
					success: ({ confirm, cancel}) => {
						if(confirm){
							this.loginOut();
						}
					}
				})
			},
			/** * H5 一键登录 */
			async onAutoLogin() {
				// 展示加载框 
				uni.showLoading({ 
					title: '加载中' ,
				});
				await this.login({ 
					encryptedData: 'BmGEMqpGI5w', 
					errMsg: 'getUserProfile:ok', 
					iv: 'c+NbINO4CuEWCBYGG2FxWw==', 
					rawData: '{"nickName":"小爱同学","gender":1,"language":"zh_CN","city":"","province":"","country":"China","avatarUrl":""}', 
					signature: '449a10f11998daf680fe546a5176e6e2973516ce', 
					userInfo: { 
						nickName: '小爱同学', 
						gender: 1, 
						language: 'zh_CN', 
						city: '', province: '' ,
					} ,
				});
				this.$emit('onLoginSuccess');
				// 隐藏loading 
				uni.hideLoading();
			}
		}
	}
</script>

<style lang="scss" scoped>
.my-container { 
	display: flex; 
	flex-direction: column; 
	align-items: center; 
	padding-top: 25%; 
	.avatar-img { 
		width: 78px; 
		height: 78px; 
	} 
	.login-desc { 
		color: #999;     
		font-size: 14px;     
		margin-top: 20px; 
	} 
	.login-btn { 
		margin-top: 20px; 
		width: 85%; 
	} 
}
</style>