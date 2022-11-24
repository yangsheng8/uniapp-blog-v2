<template>
<view class="search-result-item-box"> 
<!-- 标题 --> 
<rich-text :nodes="data.title" class="item-title line-clamp-2"></rich-text> 
<!-- 内容区 - 样式 1 --> 
<rich-text :nodes="data.description" class="item-desc line-clamp-2"></rich-text> 
<!-- 底部 --> 
	<view class="item-desc-bottom"> 
		<view class="item-author">{{ data.author }}</view> 
			<view class="item-read-num"> 
			<uni-icons class="read-num-icon" color="#999999" type="compose" /> 
			<text>{{ data.updateTime | relativeTime }}</text> 
			</view> 
	</view> 
</view>
</template>

<script>
	export default {
		name:"search-result-item-theme-1",
		props: { 
			data: { 
				type: Object, 
				required: true ,
			} ,
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.search-result-item-box { 
	margin-bottom: 16px; 
	// 标题 
	.item-title { 
		font-size:14px; 
		font-weight: bold; 
		color: #000; 
	} 
	.item-desc { 
		margin-top: 8px; 
		font-size: 14px; 
		color: #555; 
	} 
	// 底部作者 + 阅读量 
	.item-desc-bottom { 
		margin-top: 8px; 
		display: flex; 
		color: #999; 
		font-size: 12px; 
		.item-author { 
			margin-right: 12px; 
		} 
		.item-read-num { 
			.read-num-icon { 
				color: #999; 
				margin-right: 5px; 
			} 
		} 
	} 
}
</style>