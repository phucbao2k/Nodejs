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
            console.log()
        }
    }
}