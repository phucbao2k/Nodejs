import doctorService from '../services/doctorService';
let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        //lấy hết tất cả logic của doctorService rồi gán vào hàm này
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e)
        return res.status(200).json
    }
}
let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveDetailInforDoctor(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let postScheduleDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveScheduleInforDoctor(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getDetailDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getScheduleByDate = async (req, res) => {
    try{
let infor = await doctorService.getScheduleByDate(req.query.doctorId, req.query.date);
return res.status(200).json(infor);
    }catch(e){
console.log(e);
return res.status(200).json({
    errCode: -1,
    errMessage: 'Error from the server'
})
    }
}

let getExtraInforDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getExtraInforDoctorById(req.query.doctorId);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getProfileDoctorById = async(req, res)=>{
    try{
let infor = await doctorService.getProfileDoctorById(req.query.doctorId);
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
let getListPatientForDoctor = async (req, res) => {
    try {
        let infor = await doctorService.getListPatientForDoctor(req.query.doctorId, req.query.date);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getHistoryBookingForDoctor = async (req, res) => {
    try {
        let infor = await doctorService.getHistoryBookingForDoctor(req.query.doctorId);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let sendRemedy = async (req, res) => {
    try{
        let infor = await doctorService.sendRemedy(req.body);
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
let cancelRemedy = async (req, res) => {
    try {
        let infor = await doctorService.cancelRemedy(req.body);
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
let sendDone = async (req, res) => {
    try {
        let infor = await doctorService.sendDone(req.body);
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
let reBooking = async (req, res) => {
    try {
        let infor = await doctorService.reBooking(req.body);
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
let getListDoneBookingForDoctor = async (req, res) => {
    try {
        let infor = await doctorService.getListDoneBookingForDoctor(req.query.statusId, req.query.date, req.query.doctorId);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getListPaidBookingForDoctor = async (req, res) => {
    try {
        let infor = await doctorService.getListPaidBookingForDoctor(req.query.statusId, req.query.date, req.query.doctorId);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
    sendRemedy: sendRemedy,
    cancelRemedy: cancelRemedy,
    getHistoryBookingForDoctor: getHistoryBookingForDoctor,
    sendDone: sendDone,
    reBooking: reBooking,
    getListDoneBookingForDoctor: getListDoneBookingForDoctor,
    getListPaidBookingForDoctor: getListPaidBookingForDoctor,
    postScheduleDoctor: postScheduleDoctor,
}