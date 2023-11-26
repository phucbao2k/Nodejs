import express from "express";
import bodyParser from "body-parser";
import { configViewEngine } from "./src/config/viewEngine.js";
import { initWebRoutes } from './route/web.js';
import connectDB from "./src/config/connectDB.js";
import cors from 'cors';
import { paypal } from 'paypal-rest-sdk';
import fs from 'fs';
import handlebars from 'express-handlebars';
import engine from 'express-handlebars';
import path from 'path';
require('dotenv').config();
let app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
configViewEngine(app);
initWebRoutes(app);
connectDB();
let port = process.env.PORT || 7070;

app.listen(port, () => {
  
    console.log("port is " + port);
})


app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.get('/', function (req, res) {
    res.render('index.handlebars');
})
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AXQsQrZpknOZlFrjSpEOgoDi7Ab81ji97cC0d6oIihV44eQkc-Ke0s1hRCqhAlk9PDjmPfw5LUalJt0B',
    'client_secret': 'ENo_RjBRdFZ4xbFKoZjqDlztCKGiXCGvPz6Zd1QSbK6h5DMrJtUJrqf3Ro43dQGkAqpvmjCDWaSOijoi'
});


var items = JSON.parse(fs.readFileSync('items.json'));
var total = 0;
for (i = 0; i < items.length; i++) {
    total += parseFloat(items[i].price) * items[i].quantity;
}

app.get('/thanh-toan', function (req, res) {
    res.render('index');
});

app.post('/pay', function (req, res) {
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
                "items": items
            },
            "amount": {
                "currency": "USD",
                "total": total.toString()
            },
            "description": "Pay online now!"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            res.render('cancle');
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });

});
app.get('/cancle', function (req, res) {
    res.render('cancle');
});
app.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": total.toString()
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            res.render('cancle');
        } else {
            console.log(JSON.stringify(payment));
            res.render('success');
        }
    });
});

app.get('/cancel', (req, res) => res.send('Cancelled'));

app.listen(7070, function () {
    console.log(total);
});

