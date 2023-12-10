import adminService from '../services/adminService.js';
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tabaophuc',
});

connection.connect();
let handleGetAllBookings = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            bookings: []
        })
    }
    let bookings = await adminService.getAllBookings(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        bookings
    })
}
let handleDeleteBooking = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await adminService.deleteBooking(req.body.id);
    return res.status(200).json(message);
}
let getAllBookingForAdmin = async (req, res) => {
    try {
        let infor = await adminService.getAllBookingForAdmin(req.query.date);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let searchAllBookingForAdmin = async (req, res) => {
    const { searchTerm } = req.query;
    const query = `  
SELECT Users.id, Users.firstName, Users.lastName, Bookings.reasons, Bookings.date, Bookings.birthday, Bookings.statusId
FROM Users
LEFT JOIN Bookings ON Users.id = Bookings.patientId
WHERE Users.id LIKE :searchTerm
   OR Users.firstName LIKE :searchTerm
   OR Users.lastName LIKE :searchTerm;
`;

    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });

}
let searchAllBookingForAdminBooking = async (req, res) => {
    const { searchTerm } = req.query;
    const query = `  
SELECT Users.id, Users.firstName, Users.lastName, Users.phoneNumber Bookings.reasons, Bookings.date, Bookings.birthday, Bookings.statusId
FROM Users
LEFT JOIN Bookings ON Users.id = Bookings.patientId
WHERE Users.id LIKE :searchTerm
   OR Users.firstName LIKE :searchTerm
   OR Users.lastName LIKE :searchTerm;
   OR  Users.phoneNumber LIKE :searchTerm;
`;

    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });

}
let cancelPaidBooking = async (req, res) => {
    try {
        let infor = await adminService.cancelPaidBooking(req.body);
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
let getListBookingForAdminBooking = async (req, res) => {
    try {
        let infor = await adminService.getListBookingForAdminBooking(req.query.statusId, req.query.date);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getListPaidBookingForAdminBooking = async (req, res) => {
    try {
        let infor = await adminService.getListPaidBookingForAdminBooking(req.query.statusId, req.query.date);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let sendSchedule = async (req, res) => {
    try {
        let infor = await adminService.sendSchedule(req.body);
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
let getSearchBookingForAdminBooking = async (req, res) => {
    try {
        let infor = await adminService.getSearchBookingForAdminBooking(req.query.phoneNumber);
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

export default {
    getAllBookingForAdmin: getAllBookingForAdmin,
    handleDeleteBooking: handleDeleteBooking,
    handleGetAllBookings: handleGetAllBookings,
    cancelPaidBooking: cancelPaidBooking,
    getListBookingForAdminBooking: getListBookingForAdminBooking,
    getListPaidBookingForAdminBooking: getListPaidBookingForAdminBooking,
    sendSchedule: sendSchedule,
    getSearchBookingForAdminBooking: getSearchBookingForAdminBooking,
    searchAllBookingForAdmin: searchAllBookingForAdmin,
    searchAllBookingForAdminBooking: searchAllBookingForAdminBooking
}
