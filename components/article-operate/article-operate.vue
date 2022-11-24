<template>
	<view class="operate-container">
		<!--输入框-->
		<view class="comment-box" @click="onCommintClick">
			<my-search 
			:placeholderText="placeholderText"
			:config="{
			  height: 28,
			  backgroundColor: '#eeedf4',
			  icon: '/static/images/input-icon.png',
			  textColor: '#a6a5ab',
			  border: 'none'
			}"
			></my-search>
		</view>
		<!--点赞-->
		<view class="options-box">
			<article-praise 
			:articleData="articleData"
			@changePraise="$emit('changePraise', $event)"
			/>
		</view>
		<!--收藏-->
		<view class="options-box">
			<article-collect 
			:articleData="articleData"
			@changeCollect="$emit('changeCollect', $event)"
			/>
		</view>
	</view>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		name:"article-operate",
		props: { 
			articleData: { 
				type: Object, 
				required: true ,
			} ,
			placeholderText:{
				type:String,
				default:'评论一句，前排打call...'
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			...mapActions('user',['isLogin']),
			async onCommintClick(){
				if(!(await this.isLogin())){
					return ;
				}
				this.$emit('commitClick')
			}
		}
	}
</script>

<style lang="scss" scoped>
.operate-container { 
	position: fixed; 
	left: 0; 
	right: 0; 
	bottom: 0; 
	background-color: #fff; 
	padding: 4px 6px 32px 6px; 
	display: flex; 
	border-top: 1px solid #999; 
	align-items: center; 
	.comment-box { 
		flex-grow: 2; 
	} 
	.options-box { 
		flex-grow: 1; 
	} 
}
</style>