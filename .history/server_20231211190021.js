import express from 'express';
import bodyParser from 'body-parser';
import { configViewEngine } from './src/config/viewEngine.js';
import { initWebRoutes } from './route/web.js';
import { sequelize, connectDB } from './src/config/connectDB.js';
import cors from 'cors';
import order from './order.js';
import path from 'path';
import dotenv from 'dotenv';
import dateformat from 'dateformat';
// Configure environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Use CORS middleware
app.use(cors({ origin: true }));

// Use body-parser middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Use the order router
app.use('/order', order);

// Configure view engine
configViewEngine(app);

// Initialize web routes
initWebRoutes(app);


// app.get('/admin/search', async (req, res) => {
//     try {
//         const { searchTerm } = req.query;

//         const results = await sequelize.query(
//             `SELECT Users.*, Bookings.reasons, Bookings.date, Bookings.birthday, Bookings.statusId
//               FROM Users
//               LEFT JOIN Bookings ON Users.id = Bookings.patientId
//               WHERE Users.id LIKE :searchTerm
//               OR Users.firstName LIKE :searchTerm
//               OR Users.lastName LIKE :searchTerm`,
//             {
//                 replacements: { searchTerm: `%${searchTerm}%` },
//                 type: Sequelize.QueryTypes.SELECT,
//             }
//         );

//         res.json(results);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });


// Middleware xử lý IPN
app.post('/vnpay_ipn', bodyParser.urlencoded({ extended: true }), function (req, res, next) {
    try {
        const vnpParams = req.body;
        const secureHash = vnpParams['vnp_SecureHash'];

        // Xóa các trường không cần thiết
        delete vnpParams['vnp_SecureHash'];
        delete vnpParams['vnp_SecureHashType'];

        // Sắp xếp các trường theo thứ tự
        const sortedVnpParams = sortObject(vnpParams);

        // Lấy thông tin cấu hình và khóa bí mật
        const secretKey = process.env.VNP_HASH_SECRET;

        // Tạo chuỗi ký tự cần ký
        const queryString = require('qs').stringify(sortedVnpParams, { encode: false });

        // Tạo chữ ký từ chuỗi đã tạo và khóa bí mật
        const crypto = require("crypto");
        const hmac = crypto.createHmac("sha512", secretKey);
        const calculatedHash = hmac.update(new Buffer(queryString, 'utf-8')).digest("hex");

        // So sánh chữ ký được tính toán với chữ ký từ VNPay
        if (secureHash === calculatedHash) {
            // Xác thực thành công, thực hiện xử lý theo logic của bạn
            const orderId = vnpParams['vnp_TxnRef'];
            const rspCode = vnpParams['vnp_ResponseCode'];

            // Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
            res.status(200).json({ RspCode: '00', Message: 'success' });
        } else {
            // Xác thực thất bại
            res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
        }
    } catch (error) {
        console.error('Error during IPN processing:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/vnpay_return', function (req, res, next) {
    try {
        const vnpParams = req.query;
        const secureHash = vnpParams['vnp_SecureHash'];

        // Xóa các trường không cần thiết
        delete vnpParams['vnp_SecureHash'];
        delete vnpParams['vnp_SecureHashType'];

        // Sắp xếp các trường theo thứ tự
        const sortedVnpParams = sortObject(vnpParams);

        // Lấy thông tin cấu hình và khóa bí mật
        const tmnCode = process.env.VNP_TMN_CODE;
        const secretKey = process.env.VNP_HASH_SECRET;

        // Tạo chuỗi ký tự cần ký
        const queryString = require('qs').stringify(sortedVnpParams, { encode: false });

        // Tạo chữ ký từ chuỗi đã tạo và khóa bí mật
        const crypto = require("crypto");
        const hmac = crypto.createHmac("sha512", secretKey);
        const calculatedHash = hmac.update(new Buffer(queryString, 'utf-8')).digest("hex");

        // So sánh chữ ký được tính toán với chữ ký từ VNPay
        if (secureHash === calculatedHash) {
            // Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
            res.render('success', { code: vnpParams['vnp_ResponseCode'] });
        } else {
            // Xác thực thất bại
            res.render('success', { code: '97' });
        }
    } catch (error) {
        console.error('Error during ReturnURL processing:', error);
        res.status(500).send('Internal Server Error');
    }
});

connectDB()
    .then(() => {
        const port = process.env.PORT || 7070;

        app.listen(port, () => {
            console.log('Server is running on port ' + port);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });