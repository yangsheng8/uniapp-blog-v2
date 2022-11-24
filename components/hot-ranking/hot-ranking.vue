<template>
	 <view class="ranking">
		<image class="ranking-bg" :src="getRanking" />
		<text class="ranking-text" :class="getClassName">{{ ranking}} </text>
	</view>
</template>
<script>
  export default {
  	props: {
    	ranking:{
        	type: Number,
          	required:true
        }
    },
    computed: {
    	getRanking(){
        	if(this.ranking <=3){
            	return require(`@/static/images/ranking-${this.ranking}.png`)
            }
          return require('@/static/images/ranking-other.png')
        },
      getClassName(){
      	if(this.ranking <= 3){
        	return 'text-white'
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
.ranking {
  position: relative;
  text-align: center;
  width: 18px;
  height: 20px;
  .ranking-bg {
    width: 100%;
    height: 100%;
  }
  .ranking-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-55%, -55%);
    font-size: 12px;
    font-weight: bold;
    color:#333;
  }
  .text-white {
    color: white;
  }
}
</style>