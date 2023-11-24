import {express} from 'express';
import {paypal} from 'paypal-rest-sdk';
import fs from 'fs';
import exphdbs from 'express-handlebars';
import path from 'path';
let app_payment = express();
app_payment.set('views', path.join(__dirname, 'views'));
app_payment.engine('handlebars',exphdbs({defaultLayout:'main'}));
app_payment.set('view engine', 'handlebars');

app_payment.get('/', function(req, res){
res.render('index.handlebars');
})

