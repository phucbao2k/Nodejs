import adminService from '../services/adminService';









let getAllBookingForAdmin = async (req, res) => {
    try {
        let infor = await adminService.getAllBookingForAdmin(req.query.doctorId, req.query.date);
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
   
    getAllBookingForAdmin: getAllBookingForAdmin,
   
}