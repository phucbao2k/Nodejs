import doctorService from '../services/doctorService';
let getTopDoctorHome = async(req, res)=>{
    let limit = req.query.limit;
    if(!limit) limit = 10;
    try{
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    }catch(e){
console.log(e);
return res.status(200).json({
    errCode: -1,
    message: 'Error from server...'
})
    }
}
let getAllDoctors = async (req, res)=>{
try{
let doctors = await doctorService.getAllDoctors();
return res.status(200).json(doctors)
}catch(e){
    console.log(e)
    return res.status(200).json
}
}
let postInforDoctor =async(req,res)=>{
    try{
let response = await doctorService.saveDetailInforDoctor(req.body);
return res.status(200).json(response);
    }catch(e){
console.log(e)
return res.status(200).json({
    errCode: -1,
    errMessage: 'Error from the server'
})
    }
}
let getDetailDoctorById = async(req, res)=>{
    try{
let infor = await doctorService.getDetailDoctorById(req.query.id);
return res
    }catch(e){

    }
}
module.exports={
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor
}