// Import required modules
import dotenv from 'dotenv';
import express from 'express';
import $ from 'jquery';
import request from 'request';
import moment from 'moment';

// Configure environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Set up middleware to parse request bodies as JSON
app.use(express.json());

// Create an Express router
const router = express.Router();

// Define routes
router.get('/', (req, res, next) => {
    res.render('orderlist', { title: 'Danh sách đơn hàng' });
});

router.get('/create_payment_url', (req, res, next) => {
    res.render('order', { title: 'Tạo mới đơn hàng', amount: 10000 });
});

router.get('/querydr', (req, res, next) => {
    const desc = 'truy van ket qua thanh toan';
    res.render('querydr', { title: 'Truy vấn kết quả thanh toán' });
});

router.get('/refund', (req, res, next) => {
    const desc = 'Hoan tien GD thanh toan';
    res.render('refund', { title: 'Hoàn tiền giao dịch thanh toán' });
});

router.post('/create_payment_url', (req, res, next) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';

    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');
    const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    // Use process.env to get environment variables
    const tmnCode = process.env.vnp_TmnCode;
    const secretKey = process.env.vnp_HashSecret;
    const vnpUrl = process.env.vnp_Url;
    const returnUrl = process.env.vnp_ReturnUrl;

    const orderId = moment(date).format('DDHHmmss');
    const amount = req.body.amount;
    const bankCode = req.body.bankCode;

    let locale = req.body.language;
    if (!locale || locale === '') {
        locale = 'vn';
    }
    const currCode = 'VND';
    const vnp_Params = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_Locale: locale,
        vnp_CurrCode: currCode,
        vnp_TxnRef: orderId,
        vnp_OrderInfo: `Thanh toan cho ma GD:${orderId}`,
        vnp_OrderType: 'other',
        vnp_Amount: amount * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
    };

    if (bankCode !== null && bankCode !== '') {
        vnp_Params.vnp_BankCode = bankCode;
    }

    const querystring = require('qs');
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params.vnp_SecureHash = signed;
    const redirectUrl = `${vnpUrl}?${querystring.stringify(vnp_Params, { encode: false })}`;

    res.redirect(redirectUrl);
});

router.get('/vnpay_return', (req, res, next) => {
    const vnp_Params = req.query;
    const secureHash = vnp_Params.vnp_SecureHash;

    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    // Use process.env to get environment variables
    const tmnCode = process.env.vnp_TmnCode;
    const secretKey = process.env.vnp_HashSecret;

    const querystring = require('qs');
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
        res.render('success', { code: vnp_Params.vnp_ResponseCode });
    } else {
        res.render('success', { code: '97' });
    }
});

router.get('/vnpay_ipn', (req, res, next) => {
    const vnp_Params = req.query;
    const secureHash = vnp_Params.vnp_SecureHash;

    const orderId = vnp_Params.vnp_TxnRef;
    const rspCode = vnp_Params.vnp_ResponseCode;

    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    const secretKey = process.env.vnp_HashSecret;
    const querystring = require('qs');
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    const paymentStatus = '0';
    const checkOrderId = true;
    const checkAmount = true;

    if (secureHash === signed) {
        if (checkOrderId) {
            if (checkAmount) {
                if (paymentStatus == '0') {
                    if (rspCode == '00') {
                        res.status(200).json({ RspCode: '00', Message: 'Success' });
                    } else {
                        res.status(200).json({ RspCode: '00', Message: 'Success' });
                    }
                } else {
                    res.status(200).json({ RspCode: '02', Message: 'This order has been updated to the payment status' });
                }
            } else {
                res.status(200).json({ RspCode: '04', Message: 'Amount invalid' });
            }
        } else {
            res.status(200).json({ RspCode: '01', Message: 'Order not found' });
        }
    } else {
        res.status(200).json({ RspCode: '97', Message: 'Checksum failed' });
    }
});

router.post('/querydr', (req, res, next) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    const date = new Date();

    const crypto = require('crypto');

    // Use process.env to get environment variables
    const vnp_TmnCode = process.env.vnp_TmnCode;
    const secretKey = process.env.vnp_HashSecret;
    const vnp_Api = process.env.vnp_Api;

    const vnp_TxnRef = req.body.orderId;
    const vnp_TransactionDate = req.body.transDate;

    const vnp_RequestId = moment(date).format('HHmmss');
    const vnp_Version = '2.1.0';
    const vnp_Command = 'querydr';
    const vnp_OrderInfo = `Truy van GD ma:${vnp_TxnRef}`;

    const vnp_IpAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    const currCode = 'VND';
    const vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

    const data = `${vnp_RequestId}|${vnp_Version}|${vnp_Command}|${vnp_TmnCode}|${vnp_TxnRef}|${vnp_TransactionDate}|${vnp_CreateDate}|${vnp_IpAddr}|${vnp_OrderInfo}`;

    const hmac = crypto.createHmac('sha512', secretKey);
    const vnp_SecureHash = hmac.update(Buffer.from(data, 'utf-8')).digest('hex');

    const dataObj = {
        vnp_RequestId,
        vnp_Version,
        vnp_Command,
        vnp_TmnCode,
        vnp_TxnRef,
        vnp_OrderInfo,
        vnp_TransactionDate,
        vnp_CreateDate,
        vnp_IpAddr,
        vnp_SecureHash,
    };

    request({
        url: vnp_Api,
        method: 'POST',
        json: true,
        body: dataObj,
    }, (error, response, body) => {
        console.log(response);
    });
});

router.post('/refund', (req, res, next) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    const date = new Date();

    const crypto = require('crypto');

    // Use process.env to get environment variables
    const vnp_TmnCode = process.env.vnp_TmnCode;
    const secretKey = process.env.vnp_HashSecret;
    const vnp_Api = process.env.vnp_Api;

    const vnp_TxnRef = req.body.orderId;
    const vnp_TransactionDate = req.body.transDate;
    const vnp_Amount = req.body.amount * 100;
    const vnp_TransactionType = req.body.transType;
    const vnp_CreateBy = req.body.user;

    const currCode = 'VND';

    const vnp_RequestId = moment(date).format('HHmmss');
    const vnp_Version = '2.1.0';
    const vnp_Command = 'refund';
    const vnp_OrderInfo = `Hoan tien GD ma:${vnp_TxnRef}`;

    const vnp_IpAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    const vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

    const vnp_TransactionNo = '0';

    const data = `${vnp_RequestId}|${vnp_Version}|${vnp_Command}|${vnp_TmnCode}|${vnp_TransactionType}|${vnp_TxnRef}|${vnp_Amount}|${vnp_TransactionNo}|${vnp_TransactionDate}|${vnp_CreateBy}|${vnp_CreateDate}|${vnp_IpAddr}|${vnp_OrderInfo}`;
    const hmac = crypto.createHmac('sha512', secretKey);
    const vnp_SecureHash = hmac.update(Buffer.from(data, 'utf-8')).digest('hex');

    const dataObj = {
        vnp_RequestId,
        vnp_Version,
        vnp_Command,
        vnp_TmnCode,
        vnp_TransactionType,
        vnp_TxnRef,
        vnp_Amount,
        vnp_TransactionNo,
        vnp_CreateBy,
        vnp_OrderInfo,
        vnp_TransactionDate,
        vnp_CreateDate,
        vnp_IpAddr,
        vnp_SecureHash,
    };

    request({
        url: vnp_Api,
        method: 'POST',
        json: true,
        body: dataObj,
    }, (error, response, body) => {
        console.log(response);
    });
});
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
// Export the router
export default router;