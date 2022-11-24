<template>
	<view class="hot-video-container">
		<!--导入 mescroll-body-->
		<mescroll-body ref="mescrollRef" 
		@init="mescrollInit"
		@down="downCallback"
		@up="upCallback"
		>
		<block v-for="(item, index) in videoList" :key="index">
			<hot-video-item :data="item"  @click="onItemClick"/>
		</block>
		</mescroll-body>
	</view>
</template>

<script>
	//2.导入mixin
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
	import { getHotVideoList } from 'api/video'
	import { mapMutations } from 'vuex'
	export default {
		//3.注册 mixin
		mixins:[MescrollMixin],
		data() {
			return {
				page:1,
				size:10,
				videoList:[],
				//是否为init
				isInit: true,
				//实例
				mescroll:null
			};
		},
		created(){
			//有了mescrollInit初始 ，就不需要在这里请求数据了。
			//this.loadHotVideoList()
		},
		mounted(){
			this.mescroll = this.$refs.mescrollRef.mescroll;
		},
		methods: {
			...mapMutations('vedio',['setVideoData']),
			async loadHotVideoList() {
				const { data:res } = await getHotVideoList({
					page: this.page,
					size: this.size
				})
				if(this.page === 1){
					this.videoList = res.list;
				}else{
					this.videoList = [...this.videoList, ...res.list]
				}
			
				
			},
			//4.实现回调方法
			async mescrollInit(){
				await this.loadHotVideoList();
				this.isInit = false;
				// 结束 上拉加载 && 下拉刷新
				this.mescroll.endSuccess();
			},
			async downCallback(){
				if(this.isInit)return;
				this.page = 1;
				await this.loadHotVideoList()
				// 结束 上拉加载 && 下拉刷新
				this.mescroll.endSuccess();
			},
			async upCallback(){
				if(this.isInit)return;
				this.page += 1;
				await this.loadHotVideoList()
				// 结束 上拉加载 && 下拉刷新
				this.mescroll.endSuccess();
			},
			/*item 点击事件*/
			onItemClick(data){
				//保持item的数据到vuex
				this.setVideoData(data);
				uni.navigateTo({
					url:'/subpkg/pages/video-detail/video-detail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.hot-video-container { 
	background-color: #999; 
}
</style>
