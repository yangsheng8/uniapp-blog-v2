<template>
<view class="collect-box" @click="onClick"> 
	<image class="img" :src="getIsCollect" /> 
	<text class="txt">收藏</text> 
</view>
</template>

<script>
import { mapActions } from 'vuex'; 
import { userCollect } from 'api/user';
	export default {
		name:"article-collect",
		props: { 
			/** * 数据源 */ 
			articleData: { 
				type: Object, 
				required: true ,
			} ,
		},
		data() {
			return {
				
			};
		},
		computed: { 
			getIsCollect() { 
				return this.articleData && this.articleData.isCollect 
				? '/static/images/collect.png' 
				: '/static/images/un-collect.png'; 
			} 
		},
		methods: {
			...mapActions('user', ['isLogin']),
			async onClick() {
				if(!( await this.isLogin())){
					return 
				}
				// 展示加载框 
				uni.showLoading({ 
					title: '加载中' ,
				});
				await userCollect({ 
					articleId: this.articleData.articleId, 
					isCollect: !this.articleData.isCollect ,
				});
				// 关闭加载
				uni.hideLoading();
				// 更新数据
				this.$emit('changeCollect', !this.articleData.isCollect);
			}
			
		}
	}
</script>

<style lang="scss">
.collect-box { 
	display: flex; 
	flex-direction: column; 
	align-items: center; 
	.img { 
		width: 22px; 
		height: 22px; 
	} 
	.txt { 
		font-size: 12px; 
		color: #333; 
	} 
}
</style>