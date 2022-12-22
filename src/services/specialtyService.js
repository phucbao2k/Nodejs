import db from "../models/index";
let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name
                || !data.avatar
                || !data.descriptionHTML
                || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })

            } else {
                await db.Speciality.create({
                    name: data.name,
                    image: data.avatar,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Speciality.findAll({

            });
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errMessage: 'ok',
                errCode: 0,
                data
            })

        } catch (e) {
            reject(e)
        }
    })
}
let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async ( resolve, reject)=> {
        try{
            if(!inputId || !location){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing paramenter'
                })
            }
            else{
                let data = await db.Speciality.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: [
                        'descriptionHTML','descriptionMarkdown'
                    ]

                })
                if(data){
                    let doctorSpecialty = [];
                    if(location === 'ALL'){
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where:{specialtyId: inputId},
                            attributes: ['doctorId', 'provinceId'],
                        })
                    }
                     else {
                         doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId'],
                        })
                    }
                    data.doctorSpecialty = doctorSpecialty;
                }
                else data = {}    
                resolve({
                    errMessage: 'ok',
                    errCode: 0,
                    data
                })  
            } 
          
            

        }catch(e){
            reject(e);

        }
    })
}
//các class trong mục models trong nodejs sẽ biến priceId, provinceId, paymentId, positionId, roleId, gender... thành
// dữ liệu kiểu valueEn, valueVi qua các class doctorService... trong nodeJS
let showAllSpecialties = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialties = '';
            if (specialtyId === 'ALL') {
                specialties = await db.Speciality.findAll({
                })
            }
            if (specialtyId && specialtyId !== 'ALL') {
                specialties = await db.Speciality.findOne({
                    where: { id: specialtyId },
                    include: [
                        {
                            model: db.Speciality,
                            attributes: ['descriptionMarkdown', 'descriptionHTML']
                        },
                    ],
                })
            }
            resolve(specialties)
            //resolve để thoát ra khỏi Promise 
        } catch (e) {
            reject(e);
        }
    })
}
let deleteSpecialty = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        let foundSpecialty = await db.Speciality.findOne({
            where: { id: specialtyId }
        })
        if (!foundSpecialty) {
            resolve({
                errCode: 2,
                errMessage: `The specialty isn't exist`
            })
        }
        await db.Speciality.destroy({
            where: { id: specialtyId }
        })
        resolve({
            errCode: 0,
            message: `The specialty is deleted`
        })
    })
}
let updateSpecialtyData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 200,
                    errMessage: 'Missing required parameters'
                })
            }
            let specialty = await db.Speciality.findOne({
                where: { id: data.id },
                raw: false
            })
            if (specialty) {
                specialty.name = data.name;
                specialty.address = data.address;
                specialty.descriptionMarkdown = data.descriptionMarkdown;
                specialty.descriptionHTML = data.descriptionHTML;
                if (data.avatar) {
                    specialty.image = data.avatar;
                }
                await specialty.save();
                resolve({
                    errCode: 0,
                    message: 'Update the specialty succeeds!'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `Specialty's not found!`
                });
            }
        } catch (e) {
            reject(e);

        }
    })
}
module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,
    showAllSpecialties : showAllSpecialties,
    deleteSpecialty: deleteSpecialty,
    updateSpecialtyData: updateSpecialtyData

}