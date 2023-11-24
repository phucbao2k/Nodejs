import {express} from 'express';
import {paypal} from 'paypal-rest-sdk';
import fs from 'fs';
import exphdbs from 'express-handlebars';
import path from 'path';
let app_thanh_toan = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',exphdbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
res.render('index.handlebars');
})

