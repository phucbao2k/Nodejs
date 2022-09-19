import db from '../models/index';
let getTopDoctorHome =(limitInput)=>{
    return new Promise(async (resolve, reject)=>{
try{
let users = await db.User.findAll({
    limit: limitInput,
    where: {roleId: 'R2'},
order: [['createdAt', 'DESC']],
attributes:{
    exclude:['password']
},
include:[
    {model: db.Allcode, as:'positionData', attributes:['valueEn', 'valueVi']},
    {model: db.Allcode, as:'positionData', attributes:['valueEn', 'valueVi']}
]
})
}catch(e){}
    })
}