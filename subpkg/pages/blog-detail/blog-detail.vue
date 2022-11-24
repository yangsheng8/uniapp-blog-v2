<template>
	<!--#ifndef H5-->
<page-meta root-font-size="52px">
	<!--#endif-->
  <view class="detail-container">
    <!-- 文章内容区域 -->
    <block v-if="articleData">
      <!-- 标题 -->
      <view class="title">{{ articleData.articleTitle }}</view>
      <view class="detail-info">
        <view class="detail-left">
          <view class="avatar-box">
            <!-- 头像 -->
            <image class="avatar" :src="articleData.avatar"></image>
          </view>
          <view class="author-box">
            <!-- 作者 -->
            <text class="author">{{ articleData.nickName }}</text>
            <!-- 发布时间 -->
            <text class="release-time">{{ articleData.date }}</text>
          </view>
        </view>
        <view class="detail-right">
          <!-- 关注按钮 -->
          <button 
		  class="follow" 
		  size="mini" 
		  :type="articleData.isFollow ? 'primary' : 'default'"
		  :loading="isFollowLoading"
		  @click="onFollowClick"
		  >
		  {{ articleData.isFollow ? '已关注' : '关注' }}
		  </button>
        </view>
      </view>
      <!-- 文章内容 -->
     <mp-html 
	 class="markdown_views" 
	 :content="addClassFromHTML(articleData.content)" scroll-table />
	 <!--评论列表-->
	 <view class="comment-box">
		 <!-- 1. 给 mescroll-body 的组件添加：ref="mescrollItem"（mescrollItem 是固定的不可以变化） -->
	 	  <article-comment-list ref="mescrollItem" :articleId="articleId"/>
	 </view>
    </block>
	<!-- 底部功能区 --> 
	<article-operate 
	@commitClick="onCommit"
	:articleData="articleData"
	@changePraise="onChangePraise"
	@changeCollect="onChangeCollect"
	 />
	<!-- 输入评论的popup -->
	<uni-popup ref="popup" type="bottom" @change="onCommitPopupChange">
		<article-comment-commit 
		v-if="isShowCommit" 
		:articleId = 'articleId'
		@success="onSendSuccess"
		/>
	</uni-popup>
  </view>
  <!--#ifndef H5-->
</page-meta>
<!--#endif-->
</template>

<script>
	// 导入组件 
	import mpHtml from '@/uni_modules/mp-html/components/mp-html/mp-html';
	// 2. 引入 mescroll-comp.js 
	import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js';
	import { getArticleDetail } from '@/api/article'
	import { userFollow } from 'api/user';
	import { mapActions } from 'vuex';
	export default {
		//3.注册mixins
		mixins: [MescrollCompMixin],
		// 注册组件 
		components: { 
			mpHtml 
		},
		data() {
			return {
				// 作者名 
				author: '', 
				// 文章 ID 
				articleId: '',
				// 文章详情数据 
				articleData: null,
				//关注用户的loading
				isFollowLoading: false,
				//popup的显示状态
				isShowCommit: false
			};
		},
		onLoad(options){
			this.author = options.author;
			this.articleId = options.articleId;
			this.loadArticleDetail();
		},
		methods:{
			...mapActions('user', ['isLogin']),
			/*为所有的DOM增加类名*/
			addClassFromHTML(info) {
			      return info
			        .replace(/<p>/gi, '<p class="p-cls">')
			        .replace(/<a>/gi, '<a class="a-cls">')
			        .replace(/<h1>/gi, '<h1 class="h1-cls">')
			        .replace(/<h2>/gi, '<h2 class="h2-cls">')
			        .replace(/<h3>/gi, '<h3 class="h3-cls">')
			        .replace(/<h4>/gi, '<h4 class="h4-cls">')
			        .replace(/<h5>/gi, '<h5 class="h5-cls">')
			        .replace(/<h6>/gi, '<h6 class="h6-cls">')
			        .replace(/<ul>/gi, '<ul class="ul-cls">')
			        .replace(/<li>/gi, '<li class="li-cls">')
			        .replace(/<ol>/gi, '<ol class="ol-cls">')
			        .replace(/<td>/gi, '<td class="td-cls">')
			        .replace(/<th>/gi, '<th class="th-cls">')
			        .replace(/<tr>/gi, '<tr class="tr-cls">')
			        .replace(/<dl>/gi, '<dl class="dl-cls">')
			        .replace(/<dd>/gi, '<dd class="dd-cls">')
			        .replace(/<hr>/gi, '<hr class="hr-cls">')
			        .replace(/<pre>/gi, '<pre class="pre-cls">')
			        .replace(/<strong>/gi, '<strong class="strong-cls">')
			        .replace(/<input>/gi, '<input class="input-cls">')
			        .replace(/<table>/gi, '<table class="table-cls">')
			        .replace(/<details>/gi, '<details class="details-cls">')
			        .replace(/<code>/gi, '<code class="code-cls">')
			        .replace(/<kbd>/gi, '<kbd class="kbd-cls">')
			        .replace(/<summary>/gi, '<summary class="summary-cls">')
			        .replace(/<blockquote>/gi, '<blockquote class="blockquote-cls">')
			        .replace(/<img/gi, '<img class="img-cls"');
			    },
			async loadArticleDetail() {
				//展示加载框
				uni.showLoading({
					title: '加载中'
				})
				const { data: res} = await getArticleDetail({
					author: this.author,
					articleId: this.articleId
				})
				this.articleData = res.data;
			},
			// 关注按钮点击事件
			async onFollowClick(){
				// 进行登录判定
				const isLogin = await this.isLogin();
				if(!isLogin){
					//未登录
					return
				}
				// 关注用户
				//1.开启 button 的 loading
				this.isFollowLoading = true;
				const { data: res } = await userFollow({
					author: this.author,
					isFollow: !this.articleData.isFollow
				});
				//修改用户数据
				this.articleData.isFollow = !this.articleData.isFollow;
				//关闭button 的 loading
				this.isFollowLoading = false;
			},
			/*发布评论点击事件*/
			onCommit(){
				//通过组件定义的ref调用uni-popup方法
				this.$refs.popup.open();
			},
			onCommitPopupChange(e){
				if(e.show){
					this.isShowCommit = e.show	
				}else{
					setTimeout(()=>{
						this.isShowCommit = e.show
					},200)
				}
			},
			/*
			* 发表评论成功
			*/
			onSendSuccess(data){
				//关闭弹出层
				this.$refs.popup.close();
				this.isShowCommit = false;
				// 显示评论数据
				this.$refs.mescrollItem.addCommentList(data)      
			},
			/** * 点赞处理回调 */ 
			onChangePraise(isPraise) { 
				this.articleData.isPraise = isPraise; 
			},
			/** * 收藏处理回调 */
			onChangeCollect(isCollect){
				this.articleData.isCollect = isCollect;
			}
		}
	}
</script>

<style lang="scss" >
.detail-container { 
	padding: 8px 10px 68px 10px; 
	.title { 
		font-size: 14px; 
		color: #000; 
		font-weight: bold; 
	} 
	.detail-info { 
		padding: 8px 0; 
		display: flex; 
		justify-content: space-between; 
		.detail-left { 
			display: flex; 
			.author-box { 
				margin-left: 10px; 
				display: flex; 
				flex-direction: column; 
				.author { 
					font-size: 14px; 
					font-weight: bold; 
					color: #333; 
				} 
				.release-time { 
					font-size: 12px; color: #999; 
				} 
			} 
		} 
		.detail-right { 
			display: flex; align-items: center; 
		} 
	} 
}
</style>
