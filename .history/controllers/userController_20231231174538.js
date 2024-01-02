import userService from "../services/userService.js";
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameters!'
        })
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {

        }
        //nếu có userData.user thì gán userData.user vào biến user, ko thì trả về object rỗng
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}
let handleGetUsersNotDoctor = async (req, res) => {
    try {
        let users = await userService.getUsersNotDoctor();
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            users,
        });
    } catch (error) {
        console.error('Error handling request:', error);
        return res.status(500).json({
            errCode: 500,
            errMessage: 'Internal Server Error',
            users: [],
        });
    }
};
let getDetailUserNotDoctorById = async (req, res) => {
    try {
        let infor = await userService.getDetailDoctorById(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
};
let postInforUserNotDoctor = async (req, res) => {
    try {
        let response = await userService.saveDetailInforUserNotDoctorr(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
};
let handleCreateNewUser = async (req, res) => {
    let data = req.body;
    let message = await userService.createNewUser(data);
    return res.status(200).json(message);
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
}
//getAllCode dùng để lấy các kiểu dữ liệu cứng từ bảng Allcode, như TIMETYPE, GENDER, PAYMENT, POSITION, PRICE... áp dụng bên redux.
let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        console.log(data);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

export default {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
    getAllCode: getAllCode,
    handleGetUsersNotDoctor: handleGetUsersNotDoctor
}