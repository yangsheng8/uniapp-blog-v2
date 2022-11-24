<template>
	<view class="search-result-list-container">
		<empty-data v-if="isEmpty"></empty-data>
	<!-- 1. 通过 mescroll-body 包裹列表，指定 ref 为 mescrollRef ，监听@init、@down、@up 事件 --> 
	<mescroll-body v-else ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<!-- 循环渲染列表数据 --> 
		<block v-for="(item, index) in resultList" :key="index"> 
			<view class="search-result-item-box" @click="onItemClick(item)"> 
				<!-- 内容区 - 样式 1 --> 
				<search-result-item-theme-1 v-if="!item.pic_list || item.pic_list.length === 0" :data="item" /> 
				<!-- 内容区 - 样式 2 --> 
				<search-result-item-theme-2 v-else-if="item.pic_list.length === 1" :data="item" /> 
				<!-- 内容区 - 样式 3 --> 
				<search-result-item-theme-3 v-else :data="item" /> 
				<!-- / --> 
			</view> 
		</block>
	</mescroll-body>
	</view>
</template>

<script>
	// 2. 导入对应的 mixins 
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
	import {getSearchResult } from '@/api/search.js'
	export default {
		name:"search-result-list",
		// 3. 注册 mixins 
		mixins: [MescrollMixin],
		props:{
			queryStr:{
				type:String,
				required:true
			}
		},
		data() {
			return {
				resultList:[],
				page:1,
				//定义 init 变量，表示当前是否为首次请求
				isInit:true,
				//实例对象mescroll初始化
				mescroll: null,
				isEmpty:false
			};
		},
		// created(){
		// 	this.loadSearchResult()
		// },
		mounted(){
			// 获取mescroll的实例 
			this.mescroll = this.$refs.mescrollRef.mescroll;
		},
		methods:{
			/*获取搜索数据*/
			async loadSearchResult(){
				const {data: res} = await getSearchResult({
					q:this.queryStr,
					p:this.page
				})
				res.list.forEach(item=>{
					if(item.title && item.description){
						  item.title = item.title.replace(/<em>/g, "<em style='color:#f94d2a; margin:0 2px'>");
						  item.description = item.description.replace(
							/<em>/g,
							"<em style='color:#f94d2a; margin:0 2px'>"
						  );
					}
				})
				
				//this.resultList = res.list
				//使用下拉刷新、上拉加载的赋值策略
				if(this.page === 1){
					this.resultList = res.list;
				}else{
					this.resultList = [...this.resultList,...res.list]
				}
				if(this.resultList.length === 0){
					this.isEmpty = true
				}
			},
			// 4. 实现三个回调方法 
			/** * 首次加载 */ 
			async mescrollInit() { 
				await this.loadSearchResult()
				this.isInit = false;
				//endSuccess 表示当前数据加载完成，动画关闭
				this.mescroll.endSuccess();
			}, 
			/** * 下拉刷新的回调 */ 
			async downCallback() { 
				if (this.isInit) return;
				this.page = 1
				await this.loadSearchResult()
				this.mescroll.endSuccess();
			}, 
			/** * 上拉加载的回调 */ 
			async upCallback() { 
				if (this.isInit) return;
				this.page += 1
				await this.loadSearchResult()
				this.mescroll.endSuccess();
			},
			onItemClick(item){
				uni.navigateTo({
					url:`/subpkg/pages/blog-detail/blog-detail?author=${item.author}&articleId=${item.id}`
				})
			}
		}
	}
</script>

<style lang="scss">
.search-result-list-container { 
	padding: 12px; 
	.search-result-item-box { 
		margin-bottom: 16px; 
	} 
}
</style>