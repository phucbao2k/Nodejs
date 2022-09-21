import express from "express";
import homeController from "../controllers/homeController.js";
import userController from "../controllers/userController.js";
import doctorController from "../controllers/doctorController.js";
let router = express.Router();
export function initWebRoutes(app) {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
     router.post('/put-crud', homeController.putCRUD);
     router.get('/delete-crud', homeController.deleteCRUD);
     router.post('/api/login', userController.handleLogin);
     router.get('/api/get-all-users', userController.handleGetAllUsers);
     router.post('/api/create-new-user', userController.handleCreateNewUser);
     router.put('/api/edit-user', userController.handleEditUser);
     router.delete('/api/delete-user', userController.handleDeleteUser);
     router.get('/api/allcode', userController.getAllCode);
router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
router.get('/api/get-all-doctors', doctorController.getAllDoctors);
router.post()
    router.get('/', (req, res) => {
        return res.send('HELU WORLD');
    });
    return app.use("/", router);
}
