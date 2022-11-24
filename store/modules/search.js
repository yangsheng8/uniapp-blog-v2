const STORAGE_KEY = 'search-list'
const HISTORY_MAX = 10
export default { 
	// 给模块-独立命名空间 
	namespaced: true, 
	// 通过 state 声明数据 
	state:() => { 
		return { 
			searchData:[]
		}; 
	},
	mutations: {
		saveToStorage(state){
			uni.setStorage({
				key: STORAGE_KEY,
				data: state.searchData
			})
		},
		//添加数据
		addSearchData(state, val){
			if(!val) return;
			const index = state.searchData.findIndex((item)=> item === val)
			if( index != -1){
				state.searchData.splice(index,1)
			}
			state.searchData.unshift(val);
			if(state.searchData.length > HISTORY_MAX){
				state.searchData.splice(HISTORY_MAX,state.searchData.length - HISTORY_MAX)
			}
			// 调用saveToStorage
			this.commit('search/saveToStorage')
		},
		//删除指定数据
		removeSearchData(state, index){
			state.searchData.splice(index,1)
			// 调用saveToStorage
			this.commit('search/saveToStorage')
		},
		//删除全部数据
		removeAllSearchData(state){
			state.searchData = []
			// 调用saveToStorage
			this.commit('search/saveToStorage')
		}
	}
};