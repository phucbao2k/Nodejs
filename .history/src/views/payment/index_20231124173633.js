import {express} from 'express';
import {paypal} from 'paypal-rest-sdk';
import fs from 'fs';
import exphdbs from 'express-handlebars';
import path from 'path';
let index = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',exphdbs({defaultLayout:'main'}));
app 
