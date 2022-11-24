<template>
	<view class="search-history-container"> 
		<!-- title 区域 --> 
		<view class="search-history-title-box"> 
			<view class="search-history-title">搜索历史</view> 
			<view v-if="!isShowClear"> 
				<uni-icons type="trash" @click="isShowClear = true" /> 
			</view> 
			<view v-else> 
			<text class="txt" @click="onClearAll">全部删除</text> 
				<text class="txt" @click="isShowClear = false">完成</text> 
			</view> 
		</view> 
		<!-- 内容区域 --> 
		<view class="search-history-box"> 
			<block v-for="(item, index) in searchData" :key="index"> 
				<view class="search-history-item" @click="onHistoryItemClick(item,index)"> 
					<text class="history-txt line-clamp">{{ item }}</text> 
					<uni-icons v-show="isShowClear" type="clear" /> 
				</view> 
			</block> 
		</view> 
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		name:"search-history",
		data() {
			return {
				isShowClear: false,
			};
		},
		computed:{
			...mapState('search',['searchData'])
		},
		methods: {
			...mapMutations('search',['removeSearchData','removeAllSearchData']),
			onClearAll(){
				uni.showModal({ 
					title: '提示', 
					content: '删除搜索历史记录？', 
					showCancel: true, 
					success: ({ confirm, cancel }) => { 
						if (confirm) { 
							// 删除 searchData 
							this.removeAllSearchData(); 
							// 返回状态 
							this.isShowClear = false; 
							} 
						} 
					});
			},
			onHistoryItemClick(item, index){
				if(this.isShowClear){
					//删除指定的searchData
					this.removeSearchData(index);
				}else{
					this.$emit('onItemClick',item)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-history-container { 
		padding: 12px 15px; 
		.search-history-title-box { 
			display: flex; 
			justify-content: space-between; 
			.search-history-title { 
				font-size: 12px; 
				color: #333; 
				padding:4px 5px; 
			} 
			.txt { 
				color: #999; 
				font-size: 12px; 
				padding: 4px 5px 
			} 
		} 
		.search-history-box { 
			margin-top: 12px; 
			.search-history-item { 
				width: 50%; 
				box-sizing: border-box; 
				display: inline-block; 
				padding: 8px 10px; 
				position: relative; 
				.history-txt { 
					width: 85%; 
					display: inline-block; 
					color: #333; 
					font-size: 14px; 
				} 
			} 
			.search-history-item:nth-child(odd):before { 
				content: ' '; 
				border-left: 1px solid #999; 
				display: inline-block; 
				height: 10px; 
				position: absolute; 
				top: 50%; 
				transform: translateY(-50%); right: 0; 
			} 
		} 
	}
</style>