export  default{
	namespaced:true,
	state: ()=>({
		videoData: {}
	}),
	mutations: {
		setVideoData(state, videoData){
			state.videoData = videoData
		}
	}
}