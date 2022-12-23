import clinicService from '../services/clinicService';
let createClinic = async(req, res) => {
    try{
        let infor = await clinicService.createClinic(req.body);
        return res.status(200).json(
            infor
        )
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })

    }
}
let getAllClinic = async (req, res) => {
    try {
        let infor = await clinicService.getAllClinic();
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })

    }
}
let getDetailClinicById = async (req, res) => {
    try {
        let infor = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })

    }
}
let handleGetAllClinics = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            clinics: []
        })
    }
    let clinics = await clinicService.showAllClinics(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        clinics
    })
}
let handleDeleteClinic = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await clinicService.deleteClinic(req.body.id);
    return res.status(200).json(message);
}
let handleEditClinic = async (req, res) => {
    let data = req.body;
    let message = await clinicService.updateClinicData(data);
    return res.status(200).json(message);
}

module.exports = {
    createClinic : createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
    handleGetAllClinics: handleGetAllClinics,
    handleEditClinic: handleEditClinic,
    handleDeleteClinic: handleDeleteClinic
   
}