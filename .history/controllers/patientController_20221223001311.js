import patientService from '../services/patientService';
let postBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postBookAppointment(req.body);
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
let postVerifyBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postVerifyBookAppointment(req.body);
        return res.status(200).json(
            infor
        )
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getListBookingForPatient = async (req, res) => {
    try {
        let infor = await patientService.getListBookingForPatient(req.query.patientId, req.query.date);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getHistoryBookingForPatient = async (req, res) => {
    try {
        let infor = await patientService.getHistoryBookingForPatient(req.query.patientId);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
// let handleDeletePatientBooking = async (req, res) => {
//     if (!req.body.id) {
//         return res.status(200).json({
//             errCode: 1,
//             errMessage: "Missing required parameters!"
//         })
//     }
//     let message = await patientService.deletePatientBooking(req.body.id);
//     return res.status(200).json(message);
// }
let cancelPatientRemedy = async (req, res) => {
    try {
        let infor = await patientService.cancelPatientRemedy(req.body);
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
module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
    getListBookingForPatient: getListBookingForPatient,
    // handleDeletePatientBooking: handleDeletePatientBooking,
    cancelPatientRemedy: cancelPatientRemedy,
    getHistoryBookingForPatient: getHistoryBookingForPatient
}