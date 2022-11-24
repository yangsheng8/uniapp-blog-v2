<template>
	<view class="hot-video-info-container">
		<view class="video-title">
			{{ data.title }}
		</view>
		<view class="video-info">
			<view class="author-box">
				<image :src="data.poster_small" class="avatar"></image>
				<text class="author-txt">{{ data.source_name }}</text>
			</view>
			<view class="barrage-box">
				<uni-icons class="barrage-icon" type="videocam" />
				<text class="barrage-num">{{ data.fmplaycnt }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"hot-video-info",
		props:{
			data:{
				type: Object,
				required: true
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.hot-video-info-container { 
	.video-title { 
		position: absolute; 
		top: 24px; 
		left: 15px; 
		color: #fff; 
		font-size: 16px; 
	} 
	.video-info { 
		display: flex; 
		justify-content: space-between; 
		background-color: #fff; 
		padding: 4px 15px; 
		.author-box { 
			display: flex; 
			align-items: center; 
			.author-txt { 
				margin-left: 5px; 
				font-size: 14px; 
				color: #333; 
				font-weight: bold; 
			} 
		} 
		.barrage-box { 
			display: flex; 
			align-items: center; 
			.barrage-num { 
				margin-left: 5px; 
				font-size: 12px; 
				color: #333; 
			} 
		} 
	} 
}
</style>