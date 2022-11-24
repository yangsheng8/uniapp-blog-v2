<template>
<view class="comment-item-container"> 
		<!-- 头像 --> 
		<view class="avatar-box"> 
			<image class="avatar" :src="data.avatar" /> 
		</view> 
		<!-- 评论信息 --> 
		<view class="info-box"> 
			<!-- 评论人 --> 
			<text class="comment-user">{{ data.nickName || data.uname }}</text> 
			<!-- 评论内容 --> 
			<text class="comment-info">{{ data.content }}</text> 
			<!-- 评论时间 --> 
			<text class="comment-time">{{ data.postTime | relativeTime }}</text> 
		</view> 
</view>
</template>

<script>
	export default {
		name:"article-comment-item",
		props:{
			data: {
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

<style lang="scss">
.comment-item-container { 
	padding: 12px 0; 
	display: flex; 
	.info-box { 
		margin-left: 5px; 
		display: flex; 
		flex-direction: column; 
		.comment-user { 
			font-size: 12px; 
			font-weight: bolder; 
			color: #000; 
		} 
		.comment-info { 
			margin-top: 4px; 
			font-size: 14px; 
			color: #000; 
		} 
		.comment-time { 
			margin-top: 4px; 
			font-size: 12px; 
			color: #999; 
		} 
	} 
}
</style>