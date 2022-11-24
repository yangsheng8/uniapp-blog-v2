<template>
	<view class="search-result-item-box"> 
		<!-- 标题 --> 
		<rich-text :nodes="data.title" class="item-title line-clamp-2"></rich-text> 
		<!-- 内容区 - 样式 3 --> 
		<view class="item-info-img-box"> 
			<image v-for="item in data.pic_list" :key="item" class="item-img" :src="item" /> 
		</view> 
		<!-- 底部 --> 
		<view class="item-desc-bottom"> 
			<view class="item-author">{{ data.nickname }}</view> 
				<view class="item-read-num"> 
				<uni-icons class="read-num-icon" color="#999999" type="compose" /> 
				<text>{{ data.updateTime | relativeTime}}</text> 
				</view> 
			</view> 
	</view>
</template>

<script>
	export default {
		name:"search-result-item-theme-3",
		props: { 
			data: { 
				type: Object, 
				required: true ,
			} ,
		},
		created() { 
			if (this.data.pic_list.length > 3) { 
				this.data.pic_list = this.data.pic_list.splice(0, 2); 
			} 
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.search-result-item-box { 
	margin-bottom: 24px; 
	// 标题 
	.item-title { 
		font-size: 12px; 
		font-weight: bold; 
		color: #000; 
	} 
	.item-info-img-box { 
		display: flex; 
		// 图片 
		.item-img { 
			width: 33%; 
			height: 70px; 
			box-sizing: border-box; 
		} 
		.item-img:nth-child(1n + 1) { 
			margin-right:5px; 
			} 
		} 
		// 底部作者 + 阅读量 
		.item-desc-bottom { 
			margin-top: 8px; 
			display: flex; color: #999; 
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