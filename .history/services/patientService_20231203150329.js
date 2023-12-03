import db from "../../";
require('dotenv').config();
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';
let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result;
}
let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.specialtyName || !data.fullName
                || !data.date || !data.address || !data.phoneNumber || !data.priceId
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required fields'
                })
            } else {
                let token = uuidv4();
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    reasons: data.reasons,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                })
                let user = await db.User.findOrCreate({
                    //nếu tìm thấy email thì không làm gì cả, nếu 0 tìm thấy email thì chạy vào hàm defaults
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName,
                        birthday: data.birthday,
                    },
                });
                //user ở trên sau khi được gán await db.User.findOrCreate đã trở thành 1 array của sequelize
                //với giá trị user[object, result]

                console.log('check customer: ', user[0])
                //user[0] để lấy phần tử đầu tiên trong array, tức là object
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: {
                            timeType: data.timeType,
                            date: data.date,
                            patientId: user[0].id
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            specialtyName: data.specialtyName,
                            gender: data.selectedGender,
                            timeType: data.timeType,
                            image: data.image,
                            date: data.date,
                            birthday: data.birthday,
                            token: token,
                            reasons: data.reasons,
                            phoneNumber: data.phoneNumber,
                            priceId: data.priceId,
                        }



                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient succeed!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Appointment was saved successfully!'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment has been activated or does not exist'
                    })
                }

            }

        }
        catch (e) {
            reject(e);
        }
    })
}
let getListBookingForPatient = (patientId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!patientId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        statusId: 'S2',
                        patientId: patientId,
                        date: date,

                    },
                    attributes: {
                        exclude: ['id']
                    },
                    include: [
                        {
                            model: db.User, as: 'patientData',
                            attributes: ['email', 'firstName', 'address'],



                            include: [
                                {
                                    model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']
                                }
                            ]
                        },
                        {
                            model: db.Allcode, as: 'timeTypeDataPatient', attributes: ['valueEn', 'valueVi']

                        },


                        { model: db.User, as: 'doctorNameData', attributes: ['firstName', 'lastName'] }
                    ],
                    raw: false,
                    nest: true
                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}
let getHistoryBookingForPatient = (patientId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!patientId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.Booking.findAll({
                    where: {

                        patientId: patientId
                    },
                    attributes: {
                        exclude: ['id']
                    },
                    include: [
                        {
                            model: db.User, as: 'patientData',
                            attributes: ['email', 'firstName', 'address'],

                            include: [
                                {
                                    model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']
                                }
                            ]
                        },
                        {
                            model: db.Allcode, as: 'timeTypeDataPatient', attributes: ['valueEn', 'valueVi']

                        },

                        { model: db.User, as: 'doctorNameData', attributes: ['firstName', 'lastName'] }
                    ],
                    raw: false,
                    nest: true
                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}
// let deletePatientBooking = (patientBookingId) => {
//     return new Promise(async (resolve, reject) => {
//         let foundPatientBooking = await db.Booking.findOne({
//             where: { id: patientBookingId }
//         })
//         if (!foundPatientBooking) {
//             resolve({
//                 errCode: 2,
//                 errMessage: `The booking isn't exist`
//             })
//         }
//         await db.Booking.destroy({
//             where: { id: patientBookingId }
//         })
//         resolve({
//             errCode: 0,
//             message: `The booking is deleted`
//         })
//     })
// }
let cancelPatientRemedy = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.patientId || !data.timeType
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        timeType: data.timeType,
                        statusId: 'S2'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S4';
                    await appointment.save()
                }
                await emailService.sendCancelPatientAttachment(data);
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })

            }

        } catch (e) {
            reject(e);

        }
    })
}
module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
    getListBookingForPatient: getListBookingForPatient,
    // deletePatientBooking: deletePatientBooking,
    cancelPatientRemedy: cancelPatientRemedy,
    getHistoryBookingForPatient: getHistoryBookingForPatient
}