<template>
  <view class="hot-container">
    <!-- logo -->
    <image class="logo" mode="aspectFit" src="@/static/images/logo.png" />

  <view class="search-box" @click="onToSearchBlog">
  	  <my-search placeholderText=" uni-app 自定义组件"></my-search>
    </view>
	<view class="sticky">
		<my-tabs 
		  :tabData="tabsData" 
		  :defaultIndex="currentIndex" 
		  @tabClick="getTabsIndex"
		  ></my-tabs>
	</view>
	    <!--list  视图-->
	    <swiper class="swiper" 
		:current="currentIndex" 
		:style="{height: currentSwiperHeight + 'px'}"
		@animationfinish="onSwiperEnd"
		@change="onSwiperChange"
		>
	  	  <swiper-item v-for="(item,tabIndex) in tabsData" :key="tabIndex">
	  		  <view>
	  		  	  <uni-load-more status="loading" v-if="isLoading"></uni-load-more>
	  		  	  <block v-else>
	  		  		   <hot-list-item
	  					:class="'hot-list-item-' + tabIndex"
	  					v-for="(item, index) in listData[tabIndex]" 
	  		  		   :key="index" 
	  		  		   :listDataItem="item" 
	  		  		   :ranking="index + 1"
					   @click="onItemClick(item)"
	  		  		   >
	  		  		   </hot-list-item>
	  		  	  </block>
	  		  </view>
	  	  </swiper-item>
	    </swiper>
  </view>
</template>


<script>
	import { getHotTabs, getHotListFromTabType } from '@/api/hot.js'
	export default {
		data() {
			return {
				tabsData:[],
				currentIndex:0,
				// 显示加载loading 提示
				isLoading:true,
				//index 为 key ,list 为key
				listData:{},
				currentSwiperHeight:0,
				//缓存的各个列表高度
				swiperHeightData:{},
				//当前的滚动距离
				currentPageScrollTop:0
			}
		},
		created(){
			this.getHotTabs()
		},
		onPageScroll(res){
			this.currentPageScrollTop = res.scrollTop;
		},
		methods:{
			/*获取 热搜文章类型*/
			async getHotTabs() {
			  // uniapp 支持 async await
			  const {data: res} = await getHotTabs();
			  this.tabsData = res.list
			  //获取list数据在这里触发
			  this.loadHotListFromTab()
			},
			/*swiper动画结束触发回调*/
			onSwiperEnd(){
				if(!this.listData[this.currentIndex]){
					return this.loadHotListFromTab()
				}
				this.currentSwiperHeight = this.swiperHeightData[this.currentIndex]
			},
			/*swiper切换，联动 tabs */
			onSwiperChange(e){
				if(this.currentPageScrollTop > 130){
					uni.pageScrollTo({
						scrollTop:130
					})
				}
				this.currentIndex = e.detail.current
			},
			getTabsIndex(index){
				this.currentIndex = index
				 //this.loadHotListFromTab()
			},
			/*获取list data*/
			async loadHotListFromTab(){
				const currentIndex = this.currentIndex
					// 1.1 显示loading...
					this.isLoading = true
					//1.2 调用接口获取数据
					const id = this.tabsData[currentIndex].id
					const {data: res} = await getHotListFromTabType(id)
					// 1.3 把数据存到listData
					this.listData[currentIndex] = res.list
					// 1.4 隐藏loading...
					this.isLoading = false
				 setTimeout(async () => {
				        // 获取当前 swiper 的高度
				        this.currentSwiperHeight = await this.getCurrentSwiperHeight();
				        // 放入缓存
				        this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight;
				      }, 0);
			},
		  getCurrentSwiperHeight() {
			  return new Promise((resolve, reject) => {
				let sum = 0;
				const query = uni.createSelectorQuery().in(this);
				query
				  .selectAll(`.hot-list-item-${this.currentIndex}`)
				  .boundingClientRect((res) => {
					res.forEach((item) => {
					  sum += item.height;
					});
					resolve(sum);
				  })
				  .exec();
			  });
			},
			onToSearchBlog(){
				uni.navigateTo({
					url:'/subpkg/pages/search-blog/search-blog'
				})
			},
			onItemClick(item){
				uni.navigateTo({
					url:`/subpkg/pages/blog-detail/blog-detail?author=${item.user_name}&articleId=${item.id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hot-container{
		background-color: $uni-bg-color;
		.logo{
			width:100%;
			height:80px;
		}
		.search-box{
			padding:0 16px;
			margin-bottom: 8px;
		}
		.sticky{
			position: sticky;
			z-index:99;
			/* #ifndef H5*/
			top:0;
			/* #endif*/
			/* #ifdef H5*/
			top:44px;
			/* #endif*/
		}
	}
	
</style>
