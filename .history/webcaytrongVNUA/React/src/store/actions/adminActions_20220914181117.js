import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';
export const fetchGenderStart = () =>{
    return async(dispatch, getState)=>{
        try{
let res = await getAllCodeService("GENDER");
if(res && res.errCode === 0){
    dispatch(fetchGenderSuccess(res.data));
}else{
    dispatch(fetchGenderFailed());
}
        }catch(e){
            dispatch(fetchGenderFailed());
            console.log('fetch error: ', e)
        }
    }
}
export const fetchGenderSuccess =(genderData)=>({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed =()=>({
    type: actionTypes.FETCH_GENDER_FAILED,
})
export const fetchPositionStart = () =>{
    return async(dispatch, getState)=>{
        try{
let res = await getAllCodeService("POS");
if(res && res.errCode === 0){
    dispatch(fetchGenderSuccess(res.data));
}else{
    dispatch(fetchGenderFailed());
}
        }catch(e){
            dispatch(fetchGenderFailed());
            console.log('fetch error: ', e)
        }
    }
}