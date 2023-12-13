import express from 'express';
import bodyParser from 'body-parser';
import { configViewEngine } from './src/config/viewEngine.js';
import { initWebRoutes } from './route/web.js';
import { sequelize, connectDB } from './src/config/connectDB.js';
import cors from 'cors';
require('dotenv').config();
import { Sequelize } from 'sequelize';

const app = express();

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

        const config = require('config');
        const dateFormat = require('dateformat');

        const tmnCode = config.get('vnp_TmnCode');
        const secretKey = config.get('vnp_HashSecret');
        const vnpUrl = config.get('vnp_Url');
        const returnUrl = config.get('vnp_ReturnUrl');

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
