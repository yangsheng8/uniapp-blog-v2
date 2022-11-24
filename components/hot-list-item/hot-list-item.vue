<template>
	  <view class="item-container" @click="$emit('click')">
	    <view class="item-box">
	      <view class="item-box-left">
	        <hot-ranking :ranking="ranking"></hot-ranking>
	      </view>
	      <view class="item-box-right">
	        <!-- 标题 -->
	        <view class="item-title line-clamp-2">{{listDataItem.title}}</view>
	        <!-- 简介 -->
	        <view class="item-desc line-clamp-2">{{ listDataItem.desc }}</view>
	        <view class="item-bottom-box">
	          <!-- 作者 -->
	          <text class="item-author">{{ listDataItem.nickname }}</text>
	          <!-- 热度 -->
	          <view class="hot-box">
	            <image class="hot-icon" src="@/static/images/hot-icon.png" />
	            <text class="hot-text">{{listDataItem.views | hotNumber }} 热度</text>
	          </view>
	        </view>
	      </view>
	    </view>
	  </view>
</template>

<script>
	export default {
		name:"hot-list-item",
		props:{
			listDataItem: {
				type:Object,
				required:true
			},
			ranking:{
				type:Number,
				required: true
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.item-container {
  padding-bottom: 12px;
  .item-box {
    display: flex;
    margin: 0 10px;
    padding: 12px 8px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
    .item-box-left {
      margin-right: 5px;
    }
    .item-box-right {
      width: 100%;
      .item-title {
        font-size: 16px;
        font-weight: bold;
        color: #000;
      }
      .item-desc {
        padding-top: 4px;
        font-size: 14px;
        color: rgb(10, 9, 9);
      }
      .item-bottom-box {
        margin-top: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item-author {
          font-size: 12px;
          color: #999;
        }
        .hot-box {
          .hot-icon {
            width: 20px;
            height: 20px;
            vertical-align: top;
          }
          .hot-text {
            margin-left: 5px;
            font-size: 12px;
            color: #f94d2a;
          }
        }
      }
    }
  }
}

</style>