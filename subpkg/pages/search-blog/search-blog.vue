<template>
	<view class="search-blog-container"> 
		<!-- search模块 --> 
		<view class="search-bar-box"> 
			<my-search 
			:isShowInput="true" 
			:placeholderText="defaultText"
			v-model="searchVal"
			:config="{
				backgroundColor: '#f1f0f3'
			}"
			@search="onSearchConfirm"
			@focus="onSearchFocus"
			@blur="onSearchBlur"
			@clear="onSearchClear"
			@cancel="onSearchCancel"
			/> 
		</view> 
		<!-- 热搜列表 -->
		<view class="search-hot-list-box card"  v-if="showType=== HOT_LIST">
		  <!-- 列表 -->
		  <search-hot-list @onSearch="onSearchConfirm"/>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history-box" v-else-if="showType === SEARCH_HISTORY">
		  <search-history 
		  @onItemClick = 'onSearchConfirm'
		  />
		</view>
		<!-- 搜索结果 -->
		<view class="search-result-box" v-else>
		<!-- 1. 给mescroll-body的组件添加: ref="mescrollItem" (固定的,不可改,与mescroll-comp.js对应)-->
		  <search-result-list ref="mescrollItem" :queryStr="searchVal" />
		</view>
	</view>
</template>

<script>
	// 2. 引入mescroll-comp.js 
	import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js';
	import { getDefaultText } from '@/api/search.js'
	import { mapMutations } from 'vuex'
	// 0: 热搜列表 - 默认 
	const HOT_LIST = '0'; // 1：搜索历史 
	const SEARCH_HISTORY = '1'; // 2：搜索结果 
	const SEARCH_RESULT = '2';
	export default {
		// 3. 注册 mixins 
		mixins: [MescrollCompMixin],
		data() {
			return {
			HOT_LIST,
			SEARCH_HISTORY, 
			SEARCH_RESULT,
			// 默认情况下 或 点击输入框的取消按钮时，显示【热搜列表】 
			//当 searchBar 获取焦点时 或 点击输入框清空按钮时，显示 【搜索历史】 // 用户点击热搜列表 item || 用户点击搜索历史 || 用户按下搜索键，显示 【搜索结果】 
			//showType = 0 展示热搜列表 =1 显示 【搜索历史】 = 2 显示 【搜索结果】 
			showType:HOT_LIST,
			 // 绑定输入框中的内容
			searchVal: '',
			 // 默认的placeholderText
			 defaultText: '默认的placeholderText'
			};
		},
		created(){
			this.loadDefaultText()
		},
		 methods: {
			 ...mapMutations('search',['addSearchData']),
		    /**
		     * 搜索内容
		     */
		    onSearchConfirm(val) {
			// 用户未输入文本，直接搜索时，使用【推荐搜索文本】
			this.searchVal = val ? val : this.defaultText;
			//保存搜索历史
			this.addSearchData(this.searchVal);
			if(this.searchVal){
				this.showType = SEARCH_RESULT
			}
		    },
		    // searchbar 获取焦点
		    onSearchFocus(val) {
		      this.showType = SEARCH_HISTORY;
		    },
		    /**
		     * searchbar 失去焦点
		     */
		    onSearchBlur(val) {
		    },
		    /**
		     * searchbar 清空内容
		     */
		    onSearchClear() {
		      this.showType = SEARCH_HISTORY;
		    },
		    /**
		     * searchbar 取消按钮
		     */
		    onSearchCancel(val) {
		      this.showType = HOT_LIST
		    },
			async loadDefaultText(){
				const {data: res} = await getDefaultText();
				this.defaultText = res.defaultText
			}
		  }
	}
</script>

<style lang="scss" scoped>
.search-blog-container { 
	.search-bar-box { 
		background-color: #fff; 
		padding: 5px;
		position: sticky; top: 0px; z-index: 9; 
		} 
}
</style>
