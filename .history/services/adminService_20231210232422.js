import db from '../src/models/index.js';

require('dotenv').config();
import emailService from '../services/emailService.js';
let getAllBookingForAdmin = (date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        date: date
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
                                    model: db.Allcode, as: 'genderData', attributes:['valueEn', 'valueVi']
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
let deleteBooking = (bookingId) => {
    return new Promise(async (resolve, reject) => {
        let foundBooking = await db.Booking.findOne({
            where: { id: bookingId }
        })
        if (!foundBooking) {
            resolve({
                errCode: 2,
                errMessage: `The booking isn't exist`
            })
        }
        await db.Booking.destroy({
            where: { id: bookingId }
        })
        resolve({
            errCode: 0,
            message: `The booking is deleted`
        })
    })
}
let getAllBookings = (bookingId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookings = '';
            if (bookingId === 'ALL') {
                bookings = await db.Booking.findAll({

                    attributes: {
                        exclude: ['token']
                    },
                    include: [
                        {
                            model: db.User, as: 'patientData',
                            attributes: ['email', 'firstName', 'address'],
                            // include: [
                            //     {
                            //         model: db.Allcode, as: 'genderData', attributes:['valueEn', 'valueVi']
                            //     }
                            // ]
                        },
                        {
                            model: db.Allcode, as: 'timeTypeDataPatient', attributes: ['valueEn', 'valueVi']

                        },

                        { model: db.User, as: 'doctorNameData', attributes: ['firstName', 'lastName'] }
                    ],
                    raw: false,
                    nest: true
                })
            }
            if (bookingId && bookingId !== 'ALL') {
                bookings = await db.Booking.findOne({
                    where: { id: bookingId }
                })
            }
            resolve(bookings)
            //resolve để thoát ra khỏi Promise 
        } catch (e) {
            reject(e);
        }
    })
}
let cancelPaidBooking = (data) => {
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
                        statusId: 'S5'
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
let getListBookingForAdminBooking = (statusId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!statusId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        statusId: 'S3',

                        date: date
                    },
                    attributes: {
                        exclude: ['id']
                    },
                    include: [
                        {
                            model: db.User, as: 'patientData',
                            attributes: ['email', 'firstName', 'address'],
                            // include: [
                            //     {
                            //         model: db.Allcode, as: 'genderData', attributes:['valueEn', 'valueVi']
                            //     }
                            // ]
                        },
                        {
                            model: db.Allcode, as: 'timeTypeDataPatient', attributes: ['valueEn', 'valueVi']

                        },
                        {
                            model: db.Allcode, as: 'priceTypeDataBooking', attributes: ['valueEn', 'valueVi']

                        },
                        { model: db.User, as: 'doctorNameData', attributes: ['firstName', 'lastName'] },

                    ],
                    raw: false,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: data
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
            }

        } catch (e) {
            reject(e);
        }
    })
}
let getListPaidBookingForAdminBooking = (statusId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!statusId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        statusId: 'S5',

                        date: date
                    },
                    attributes: {
                        exclude: ['id']
                    },
                    include: [
                        {
                            model: db.User, as: 'patientData',
                            attributes: ['email', 'firstName', 'address'],
                            // include: [
                            //     {
                            //         model: db.Allcode, as: 'genderData', attributes:['valueEn', 'valueVi']
                            //     }
                            // ]
                        },
                        {
                            model: db.Allcode, as: 'timeTypeDataPatient', attributes: ['valueEn', 'valueVi']

                        },
                        {
                            model: db.Allcode, as: 'priceTypeDataBooking', attributes: ['valueEn', 'valueVi']

                        },
                        { model: db.User, as: 'doctorNameData', attributes: ['firstName', 'lastName'] }
                    ],
                    raw: false,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: data
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
            }

        } catch (e) {
            reject(e);
        }
    })
}
let sendSchedule = (data) => {
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
                        statusId: 'S3'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S5';
                    await appointment.save()
                }

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
let getSearchBookingForAdminBooking = (phoneNumber) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!phoneNumber) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.Booking.findOne({
                    where: {
                        phoneNumber: phoneNumber
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
                                    model: db.Allcode, as: 'genderData', attributes:['valueEn', 'valueVi']
                                }
                            ]
                        },
                        {
                            model: db.Allcode, as: 'timeTypeDataPatient', attributes: ['valueEn', 'valueVi']

                        }
                    ],
                    raw: false,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: data
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
            }

        } catch (e) {
            reject(e);
        }
    })
}
export default {
    getAllBookingForAdmin: getAllBookingForAdmin,
    deleteBooking: deleteBooking,
    getAllBookings: getAllBookings,
    cancelPaidBooking: cancelPaidBooking,
    getListBookingForAdminBooking: getListBookingForAdminBooking,
    getListPaidBookingForAdminBooking: getListPaidBookingForAdminBooking,
    sendSchedule: sendSchedule,
    getSearchBookingForAdminBooking: getSearchBookingForAdminBooking
}