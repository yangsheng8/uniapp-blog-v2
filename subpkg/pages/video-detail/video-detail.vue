<template>
	<view class="video-detail-container">
		<view class="video-box">
			<video 
				id="myVideo" 
				class="video" 
				:src="videoData.play_url"
				:danmu-list="danmuList"
				enable-danmu 
				danmu-btn 
				controls 
			/>
			<hot-video-info :data="videoData" />
		</view>
		<!--弹幕模块-->
		<view class="danmu-box">
			<!-- 加载动画 --> 
			<uni-load-more status="loading" v-if="isLoadingComment"></uni-load-more>
			<!-- 无弹幕 --> 
			<empty-data v-else-if="commentList.length === 0"></empty-data>
			<!--弹幕列表-->
			<view class="comment-container" v-else>
				<view class="all-comment-title">全部弹幕</view>
				<view class="list">
					<block v-for="(item, index) in commentList" :key="index">
						<article-comment-item :data="item" />
					</block>
				</view>
			</view>
		</view>
		<!-- 底部功能区 -->
		<article-operate 
		:placeholderText ="'发个弹幕，开心一下'"
		@commitClick="onCommit" />
		<!-- 输入弹幕的popup -->
		<uni-popup ref="popup" type="bottom" @change="onCommitPopupChange"> 
			<article-comment-commit
			v-if="isShowCommit"
			:articleId="videoData.id"
			@success="onSendDanmu"
			 /> 
		</uni-popup>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { getVideoDanmuList } from 'api/video'
	import { getRandomColor } from 'utils';
	export default {
		data() {
			return {
				//弹幕数据源
				danmuList:[],
				//列表数据源
				commentList:[],
				isShowCommit:false,
				//video 组件上下文
				videoContext:null,
				// 弹幕列表数据加载中 
				isLoadingComment: true
			};
		},
		created(){
			this.loadVideoDanmuList();
		},
		onReady:function(res){
			//获取video组件上下文
			this.videoContext = uni.createVideoContext('myVideo')
		},
		computed:{
			...mapState('vedio', ['videoData'])
		},
		methods: {
			/** 
			 * 获取弹幕数据
			 */
			async loadVideoDanmuList() {
				const  { data: res }= await getVideoDanmuList({
					videoId: this.videoData.id
				})
				// 定义随机颜色 
				res.list.forEach((item) => { 
					item.color = getRandomColor(); 
				});
				this.danmuList = [...res.list];
				this.commentList = [...res.list]
				this.isLoadingComment = false;
			},
			/** * 发布弹幕点击事件 */
			onCommit() { 
				// 通过组件定义的ref调用uni-popup方法 
				this.$refs.popup.open(); 
			},
			/** * 发布弹幕的 popup 切换事件 */
			onCommitPopupChange(e){
				// 修改对应的标记，当 popup 关闭时，为了动画平顺，进行延迟处理
				if(e.show){
					this.isShowCommit = e.show;
				}else{
					setTimeout(() => { 
						this.isShowCommit = e.show; 
					},200);
				}
			},
			/** * 弹幕发布成功之后的回调 */
			onSendDanmu(data){
				//发送弹幕
				this.videoContext.sendDanmu({ 
					text: data.info.content, 
					color: getRandomColor() ,
				});
				// 添加弹幕到数据源 
				this.commentList.unshift(data.info); 
				// 关闭 pop 
				this.$refs.popup.close(); 
				// 关闭标记 
				this.isShowCommit = false; 
				// 提示用户 
				uni.showToast({ 
					title: '发表成功' ,
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.video-detail-container { 
	.video-box { 
		background-color: #fff; 
		position: sticky; 
		top: 0; 
		z-index: 9; 
		.video { 
			width: 100%; 
			height: 230px; 
		} 
	}
	.danmu-box { 
		border-top: 4px solid #f8f8f8; 
		margin-bottom: 36px; 
		.comment-container { 
			padding: 12px 15px; 
			.all-comment-title { 
				font-size: 16px; 
				font-weight: bold;
				padding-bottom:10px;
				 border-bottom:1px solid #999
			} 
		} 
	}
}
</style>
