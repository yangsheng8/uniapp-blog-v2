<template>
<view class="comment-limt-container" v-if="!isShowAllComment"> 
	<view class="comment-title">精简评论</view> 
	<block v-for="(item, index) in commentList.slice(0, 2)" :key="index"> 
		<!-- item 项组件 --> 
		<article-comment-item :data="item.info" /> 
	</block> 
	<view class="show-more" @click="onMoreClick">查看更多评论</view> 
</view>
<view class="comment-all-container" v-else>
	<!-- 1. 通过 mescroll-body 包裹列表，指定 ref 为 么scrollRef，监听 @init，@down，@up 事件 --> 
	<mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" :down="{ use: false }" :up="{ textNoMore: '-- 我也是有底线的！ --' }">
		<view class="comment-title">全部评论</view>
		<block v-for="(item,index) in commentList" :key="index">
			<!--item 项组件-->
			<article-comment-item :data="item.info"></article-comment-item>
		</block>
	</mescroll-body>
</view>
</template>

<script>
	// 2. 导入对应的 mixins 
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
	import { getArticleCommentList } from 'api/article';
	export default {
		// 3. 注册 mixins
		mixins: [MescrollMixin],
		name:"article-comment-list",
		props:{
			/*父组件传递的 articleid*/
			articleId:{
				type: String,
				required: true
			}
		},
		data() {
			return {
				//当前页数
				page: 1,
				//每页评论数
				pageSize:5,
				//评论列表
				commentList:[],
				//是否展示全部评论
				isShowAllComment:false,
				//是否 为 init
				isInit: true,
				//1.组件实例
				mescroll: null,
				//处理加载完提示 1评论总数
				commentListTotal:0
			};
		},
		created(){
			this.loadCommentList()
		},
		methods:{
			/*获取评论数据*/
			async loadCommentList(){
				const {data: res} =  await getArticleCommentList({
					articleId: this.articleId,
					page: this.page,
					size: this.pageSize
				})
				//处理加载完提示 2评论总数获取
				this.commentListTotal = res.count
				
				//判断是否为第一页数据
				if(this.page === 1){
					this.commentList = res.list;
				}else {
					this.commentList = [...this.commentList,...res.list]
				}
				
			},
			/** * 首次加载 */ 
			async mescrollInit() {
				await this.loadCommentList();
				this.isInit = false;
				// 3.结束 上拉加载 && 下拉刷新
				this.getMescroll().endSuccess();
				//处理加载完提示 3判断数据加载完成
				this.getMescroll().endBySize(this.commentList.length,this.commentListTotal)
			}, 
			/** * 上拉加载更多 */ 
			async upCallback() {
				if(this.isInit) return;
				this.page +=1;
				await this.loadCommentList();
				// 3.结束 上拉加载 && 下拉刷新
				this.getMescroll().endSuccess();
				//处理加载完提示 3判断数据加载完成
				this.getMescroll().endBySize(this.commentList.length,this.commentListTotal)
			}, 
			/** * 查看全部评论的点击事件 */ 
			onMoreClick() { 
				this.isShowAllComment = true; 
			},
			/** * 2.返回 mescroll实例对象 */
			getMescroll(){
				if(!this.mescroll){
					this.mescroll = this.$refs.mescrollRef.mescroll;
				}
				return this.mescroll;
			},
			/** * 为 comment 增加一个评论 */ 
			addCommentList(data) { 
				this.commentList.unshift(data); 
			}
		}
	}
</script>

<style lang="scss">
.comment-title { 
	font-weight: bold; 
	color: #000; 
	font-size: 16px; 
	margin: 12px 0; 
} 
.comment-limt-container { 
	.show-more { 
		margin: 12px; 
		text-align: center; 
		color: #5d83a8; 
		font-size: 14px; 
	} 
}
</style>