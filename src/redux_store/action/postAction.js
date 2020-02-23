import api from "axios"
import {types} from "../types"

const postSuccess =(data)=>{
    
    return {
        type: types.POST_SUCCESS,
        data
    }
}
const postMoreSuccess =(data)=>{
    return {
        type:types.POST_MORE_SUCCESS,
        data
    }
}
const loading =(data)=>{
    return {
        type:types.LOADING,
        data
    }
}
export const getposts =()=>async dispatch =>{
try {
    dispatch(loading(true))
    let data=await api.get(`http://jsonplaceholder.typicode.com/photos?_start=0&_limit=15`);
    
    if(data.data){
        dispatch(loading(false))
        dispatch(postSuccess(data.data))
    }
} catch (error) {
    
}
}
export const getMoreposts =(page)=>async dispatch =>{
    
    try {
        dispatch(loading(true))
        let data=await api.get(`http://jsonplaceholder.typicode.com/photos?_start=${page}&_limit=15`);

        if(data.data){
            dispatch(loading(false))
            dispatch(postMoreSuccess(data.data))
        }
    } catch (error) {
        
    }
}
    const searchSuccess =(searchText)=>{
        return {
            type: types.SEARCH_TITLE,
            searchText
        }
    }
    export const searchBasedOnTitle = (searchText) => async dispatch =>{
        dispatch(searchSuccess(searchText))
    }
