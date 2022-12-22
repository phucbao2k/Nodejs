import specialtyService from "../services/specialtyService";
let createSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })

    }
}

let getAllSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.getAllSpecialty(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })

    }
}
let getDetailSpecialtyById = async (req, res) => {
    try {
        let infor = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })

    }
}
let handleGetAllSpecialties = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            specialties: []
        })
    }
    let specialties = await specialtyService.showAllSpecialties(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        specialties
    })
}
let handleDeleteSpecialty = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await specialtyService.deleteSpecialty(req.body.id);
    return res.status(200).json(message);
}
let handleEditSpecialty = async (req, res) => {
    let data = req.body;
    let message = await specialtyService.updateSpecialtyData(data);
    return res.status(200).json(message);
}
module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,
    handleGetAllSpecialties : handleGetAllSpecialties,
    handleDeleteSpecialty: handleDeleteSpecialty,
    handleEditSpecialty: handleEditSpecialty
}