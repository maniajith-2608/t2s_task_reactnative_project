import {types} from "../types"


const initialState = {
    postData:[],
    loading:false,
    page:0,
    filteredArray:[]
}

export default (state = initialState, action) => {
   
    switch (action.type) {

    case types.POST_SUCCESS:
        
        return { ...state, postData:action.data,loading:false,page:15 }
        case types.POST_MORE_SUCCESS:
               
                return { ...state, postData:[...state.postData,...action.data],loading:false ,page:state.page+15}
        case types.LOADING:
                
                return { ...state,loading:action.data }
        case types.SEARCH_TITLE:
            return {
                ...state,
                filteredArray: state.postData.filter((item) => item.title.indexOf(action.searchText.toLowerCase()) > -1)
            }
    default:
        return state
    }
}
