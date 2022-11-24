<template>
<view class="search-hot-list-container"> 
<!-- 标题 --> 
<view class="search-hot-title">慕课热搜 - 全网技术 一网打尽</view> 
	<block v-for="(item, index) in hotList" :key="index"> 
		<view class="search-hot-item" @click="onItemClick(item)"> 
			<!-- 序号 --> 
			<hot-ranking :ranking="index + 1"></hot-ranking> 
			<!-- 文本 -->
			 <text class="title line-clamp">{{ item.label }}</text> 
			 <!-- hot-icon --> 
			 <image v-if="index <= 2" class="search-hot-icon" src="/static/images/hot-icon.png" /> 
		 </view> 
	 </block> 
 </view>
</template>

<script>
	import { getSearchHotList } from '@/api/search.js'
	export default {
		name:"search-hot-list",
		data() {
			return {
				hotList: []
			};
		},
		created(){
			this.getSearchHotList()
		},
		methods: {
			async getSearchHotList(){
				const { data: res } = await  getSearchHotList();
				this.hotList = res.list
			},
			/** * item 点击事件 */ 
			onItemClick(item) { 
				this.$emit('onSearch', item.label); 
			}
		}
	}
</script>

<style lang="scss" scoped>
.search-hot-list-container { 
	.search-hot-title { 
		font-weight: bold; 
		font-size: 14px; 
		color: #f94d2a; 
		padding: 0 12px 12px 12px; 
		margin: 0 -12px 12px -12px; 
		box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1); 
	} 
	.search-hot-item { 
		display: flex; 
		align-items: center; 
		padding: 12px 0; 
		.title { 
			color: #333; 
			font-size: 14px; 
			margin: 0 10px; 
		} 
		.search-hot-icon { 
			width: 14px; 
			height: 14px; 
		} 
	} 
}
</style>