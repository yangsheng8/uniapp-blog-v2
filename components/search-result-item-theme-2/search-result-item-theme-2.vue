<template>
<view class="search-result-item-box"> 
<!-- 标题 --> 
<rich-text :nodes="data.title" class="item-title line-clamp-2"></rich-text> 
	<view class="item-info-box"> 
		<view class="item-desc-box"> 
			<rich-text :nodes="data.description" class="item-desc line-clamp-2"></rich-text> 
			<view class="item-desc-bottom"> 
			<view class="item-author">{{ data.nickname }}</view> 
				<view class="item-read-num"> 
					<uni-icons class="read-num-icon" color="#999999" type="compose" /> 
					<text>{{ data.updateTime | relativeTime }}</text> 
				</view> 
			</view> 
		</view> 
	<image class="item-img" :src="data.pic_list[0]" /> 
	</view> 
</view>
</template>

<script>
	export default {
		name:"search-result-item-theme-2",
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
	.item-info-box { 
		display: flex; 
		margin-top: 8px; 
		.item-desc-box { 
			width: 65%; 
			font-size: 12px; 
			color: #999; 
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
		.item-img { 
			width: 33%; 
			height: 70px; 
		} 
	} 
}
</style>