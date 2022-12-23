import handbookService from "../services/handbookService";
let createHandbook = async (req, res) => {
    try {
        let infor = await handbookService.createHandbook(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })

    }
}

let getAllHandbook = async (req, res) => {
    try {
        let infor = await handbookService.getAllHandbook(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })

    }
}
let getDetailHandbookById = async (req, res) => {
    try {
        let infor = await handbookService.getDetailHandbookById(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })

    }
}
let handleGetAllHandbooks = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            handbooks: []
        })
    }
    let handbooks = await handbookService.showAllHandbooks(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        handbooks
    })
}
let handleDeleteHandbook = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await handbookService.deleteHandbook(req.body.id);
    return res.status(200).json(message);
}
let handleEditHandbook = async (req, res) => {
    let data = req.body;
    let message = await handbookService.updateHandbookData(data);
    return res.status(200).json(message);
}
module.exports = {
    createHandbook: createHandbook,
    getAllHandbook: getAllHandbook,
    getDetailHandbookById: getDetailHandbookById,
    handleGetAllHandbooks: handleGetAllHandbooks,
    handleDeleteHandbook: handleDeleteHandbook,
    handleEditHandbook: handleEditHandbook
}