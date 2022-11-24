<template>
 <view class="my-search-container">
	 <!--搜索框-->
	 <uni-search-bar 
	 v-if="isShowInput" 
	 class="my-search-bar"
	 :radius="100"
	 :value="value"
	 @confirm="onSearch" 
	 @focus="onFocus" 
	 @blur="onBlur" 
	 @clear="onClear" 
	 @cancel="onCancel" 
	 @input="onInput"
	 :placeholder="placeholderText"
	  />
    <!-- 搜索按钮 -->
    <view class="my-search-box" v-else 
	:style="{
		height: config.height + 'px',
		backgroundColor: config.backgroundColor,
		border: config.border
	}">
      <image class="icon" :src="config.icon" />
      <text class="placeholder" 
	  :style="{color: config.textColor}">
	  {{ placeholderText }}
	  </text>
    </view>
  </view>
</template>

<script>
	export default {
		name:"my-search",
		props:{
			placeholderText:{
				type: String,
				default:'搜索'
			},
			isShowInput:{
				type:Boolean,
				default:false
			},
			config:{
				type: Object,
				default: ()=> ({
					height:36,
					background: '#fff',
					icon: '/static/images/search.png',
					textColor: '#454545', 
					border: '1px solid #c9c9c9'
				})
			},
			value: { 
				type: String ,
			}
		},
		data() {
			return {
				
			};
		},
		methods: { 
			/** * 监听点击搜索按钮触发,把值传递出去 */ 
			onSearch() { 
				this.$emit('search', this.value); 
			}, 
			/** * 输入框获取焦点触发 */ 
			onFocus() { 
				this.$emit('focus', this.value); 
			}, 
			/** * 输入框失去焦点触发 */ 
			onBlur() { 
				this.$emit('blur', this.value); 
			}, 
			/** * 点击输入框中的清空按钮时 */ 
			onClear() { 
				this.$emit('clear', this.value); 
			}, 
			/** * 点击取消按钮时 */ 
			onCancel() { 
				this.$emit('cancel', this.value); 
			},
			/** * value 改变时触发事件 */ 
			onInput(val) { 
				console.log(val)
				// input 的事件名称不可修改，与 props 中的 value 对应 
				// 通知父组件
				//在组件外可以使用 v-model 完成双向数据绑定。那么需要遵守以下规则：
				//1.子组件中 接收到的值 必须value 命名
				//2.子组件中想要修改value，必须发送 input 事件
				 this.$emit('input', val); 
			} 
		}
	}
</script>

<style lang="scss" scoped>
.my-search-container {
  display: flex;
  align-items: center;
  .my-search-box {
    height: 36px;
    background-color: #ffffff;
    border-radius: 15px;
    border: 1px solid #c9c9c9;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px;

    .icon {
      width: 20px ;
      height: 20px ;
    }

    .placeholder {
      font-size:12px ;
      margin-left:5px;
      color: #454545;
    }
  }
  .my-search-bar{
	  width: 100%;
  }
}
</style>