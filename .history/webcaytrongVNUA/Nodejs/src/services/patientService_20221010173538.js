import db from "../models/index";
require('dotenv').config();
let postBookAppointment = (data) => {
    return new Promise(async(resolve, reject) =>{
try{
if( !data.email || !data.doctorId || !data.timeType || !data.date){
    resolve({
        errCode: 1,
        errMessage: 'Missing'
    })
}
}catch(e){

}
    })
}