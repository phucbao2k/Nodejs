import express from 'express';
import bodyParser from 'body-parser';
import { configViewEngine } from './src/config/viewEngine.js';
import { initWebRoutes } from './route/web.js';
import { sequelize, connectDB } from './src/config/connectDB.js';
import cors from 'cors';
import or
require('dotenv').config();

const app = express();

const vnp_TmnCode = process.env.VNP_TMN_CODE;
const vnp_HashSecret = process.env.VNP_HASH_SECRET;
const vnp_Url = process.env.VNP_URL;
const vnp_ReturnUrl = process.env.VNP_RETURN_URL;
app.use(cors({ origin: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
configViewEngine(app);
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
app.post('/create_payment_url', async (req, res) => {
    try {
        const ipAddr =
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        const dateFormat = require('dateformat');

        const tmnCode = process.env.VNP_TMN_CODE;
        const secretKey = process.env.VNP_HASH_SECRET;
        const vnpUrl = process.env.VNP_URL;
        const returnUrl = process.env.VNP_RETURN_URL;

        const date = new Date();

        const createDate = dateFormat(date, 'yyyymmddHHmmss');
        const orderId = dateFormat(date, 'HHmmss');
        const amount = req.body.amount;
        const bankCode = req.body.bankCode;

        const orderInfo = req.body.orderDescription;
        const orderType = req.body.orderType;
        let locale = req.body.language;
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        const currCode = 'VND';
        const vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        const querystring = require('qs');
        const signData = querystring.stringify(vnp_Params, { encode: false });
        const crypto = require('crypto');
        const hmac = crypto.createHmac('sha512', secretKey);
        const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        const finalVnpUrl = vnpUrl + '?' + querystring.stringify(vnp_Params, { encode: false });

        res.redirect(finalVnpUrl);
    } catch (error) {
        console.error('Error during payment URL creation:', error);
        res.status(500).send('Internal Server Error');
    }
});

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