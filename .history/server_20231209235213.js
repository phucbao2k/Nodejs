import express from "express";
import bodyParser from "body-parser";
import { configViewEngine } from "./src/config/viewEngine.js";
import { initWebRoutes } from './route/web.js';
//import connectDB from "./src/config/connectDB.js";
const mysql = require('mysql');
import _ from "lodash";
const paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AaF0nqk9wLWDsiok0qUMDlbwtjziLX6IZyIEP00-nnG-KMQq-xj-IxtB2uYlCGk-Rgyz9pxjIGwGRybn',
    'client_secret': 'EEmJIghDPTWMxq6oWojSvyk6M2B0AuYURWrJ0R9TQDzx8uCgwRcN2DRKalBKILB7EXqOJV1ND0V_mBzA'
});
import cors from 'cors';
require('dotenv').config();
let app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
configViewEngine(app);
initWebRoutes(app);
//connectDB();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tabaophuc',
});

connection.connect();
app.post('/customer-online-pay', (req, res) => {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:7070/success",
            "cancel_url": "http://localhost:7070/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Ticket",
                    "sku": "001",
                    "price": "20.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "20.00"
            },
            "description": "Thanh toán bằng PAYPAL ngay!"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }

        }
    });

});

app.get('/success', (req, res) => {

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "20.00"
            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.send('Success (Mua hàng thành công)');
        }
    });
});
app.get('/customer-online-pay', (req, res) => res.render('paypal.ejs'));
app.get('/cancel', (req, res) => res.send('Cancelled (Đơn hàng đã hủy)'));
let port = process.env.PORT || 7070;
//if port is undefined, default to current 7070
app.get('/admin/search', (req, res) => {
    try {
        const { searchTerm } = req.query;

        const query = `
      SELECT users.*, bookings.reasons, bookings.date, bookings.birthday, bookings.statusId
      FROM users
      LEFT JOIN bookings ON users.id = bookings.user_id
      WHERE id LIKE '%${searchTerm}%'
         OR firstName LIKE '%${searchTerm}%'
         OR lastName LIKE '%${searchTerm}%';
    `;

        connection.query(query, (error, results) => {
            if (error) throw error;
            res.json(results);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.listen(port, () => {
    //callback
    console.log("port is " + port);
})
