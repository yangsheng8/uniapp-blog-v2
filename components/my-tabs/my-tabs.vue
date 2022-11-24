<template> 
	<view  class="tab-container"> 
		<view class="tab-box"> 
			<scroll-view id="_scroll" scroll-x class="scroll-view" scroll-with-animation :scroll-left="scrollLeft"> 
				<view class="scroll-content"> 
					<view class="tab-item-box"> 
						<block v-for="(item, index) in tabData" :key="index"> 
							<view  
							:id="'_tab_'+ index" 
							class="tab-item" 
							:class="{'tab-item-active': activeIndex === index}" 
							@click="onTabsClick(index)"
							:style="{
								color: activeIndex === index ?  defaultConfig.activeTextColor : defaultConfig.textColor
							}"
							>{{ item.label || item }}</view> 
						</block> 
					</view> 
					<view class="underLine" :style="{
						transform: 'translateX(' +slider.left+ 'px)',
						width: defaultConfig.underLineWidth + 'px', 
						height: defaultConfig.underLineHeight + 'px', 
						backgroundColor: defaultConfig.underLineColor
					}"></view>
				</view> 
			</scroll-view> 
		</view> 
	</view> 
</template>

<script>
	export default {
		name:"my-tabs",
		props:{
			config:{
				type: Object,
				default: ()=>{
					return {}
				}
			},
			tabData:{
				type: Array,
				default:()=>{
					return []
				}
			},
			defaultIndex:{
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				activeIndex: -1,
				slider: {
					left: 0
				},
				defaultConfig:{
					//默认字体颜色
					textColor: '#333',
					//字体激活颜色
					activeTextColor: '#f94d2a',
					//下划线的宽度 
					underLineWidth: 24, 
					// 下划线的高度 
					underLineHeight: 2, 
					// 下划线的颜色 
					underLineColor: '#f94d2a'
				},
				tabList:[],
				scrollLeft: 0
			};
		},
		watch:{
			config:{
				handler(val){
					this.defaultConfig = {...this.defaultConfig,...val}
				}
			},
			tabData:{
				handler(val){
					this.tabList = val
					setTimeout(()=>{
						this.updateTabWidth();
					},0)
				},
				immediate:true
			},
			defaultIndex:{
				handler(val){
					this.activeIndex = val
					//重新计算一次滑块位置
					this.tabToIndex()
				},
				immediate:true
			}
		},
		methods:{
			updateTabWidth(){
				let data = this.tabList;
				if(data.length === 0) return ;
				const query = uni.createSelectorQuery().in(this);
				//循环数据源
				data.forEach((item,index)=>{
					//获取 dom
					query
					.select('#_tab_' + index)
				    .boundingClientRect((res) => {
						item._slider= {
							left: res.left + (res.width - this.defaultConfig.underLineWidth) /2
						}
						//运算完成之后，执行一次，【滑块】位置运算
						if(data.length - 1 === index){
							this.tabToIndex();
						}
					})
					.exec();
					
				})
			},
			onTabsClick(index){
				this.activeIndex = index
				// 通知父类
				this.$emit('tabClick',index)
				this.tabToIndex()
			},
			/*滑块的位移-计算*/
			tabToIndex(){
				if(this.tabList.length === 0) return 
				const index = this.activeIndex;
				//下划线的移动
				this.slider={
					left:this.tabList[index]._slider.left
				}
				//整个scroll的滚动距离
				this.scrollLeft = index * this.defaultConfig.underLineWidth
			}
		}
	}
</script>

<style lang="scss">
.tab-container {
  font-size: 14px;
  height: 45px;
  line-height: 45px;
  background-color: #fff;
  .tab-box {
    width: 100%;
    height: 45px;
    display: flex;
    position: relative;
    .scroll-view {
      white-space: nowrap;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      .scroll-content {
        width: 100%;
        height: 100%;
        position: relative;

        .tab-item-box {
          height: 100%;
          .tab-item {
            height: 100%;
            display: inline-block;
            text-align: center;
            padding: 0 15px;
            position: relative;
            text-align: center;
            color: #333;
			
			&-active {
				color:#f94d2a;
				font-weight: bold;
			}
          }
        }
		.underLine {
			height: 2px; 
			width: 25px; 
			background-color: #f01414; 
			border-radius: 3px; 
			transition: 0.5s; 
			position: absolute; 
			bottom: 0; 
		}
      }
    }
  }
}
/* #ifdef H5 */
/deep/.uni-scroll-view::-webkit-scrollbar { 
	display: none; 
	}
/deep/.uni-scroll-view { 
	scrollbar-width: none; 
	}
/* #endif */
</style>