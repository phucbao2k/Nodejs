import db from '../models/index';
let getTopDoctorHome =(limitInput)=>{
    return new Promise(async (resolve, reject)=>{
try{
let users = await db.User.findAll({
    limit: limitInput,
    where: {roleId: 'R2'},
order: [['createdAt', 'DESC']],
attributes:{
    Ơ
}
})
}catch(e){}
    })
}