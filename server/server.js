import express from "express";
import bodyParser from "body-parser";
import { configViewEngine } from "./config/viewEngine.js";
import { initWebRoutes } from './route/web.js';
import connectDB from "./config/connectDB.js";
import cors from 'cors';
require('dotenv').config();
let app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
configViewEngine(app);
initWebRoutes(app);
connectDB();
let port = process.env.PORT || 7070;
//if port is undefined, default to current 7070
app.listen(port, () => {
    //callback
    console.log("port is " + port);
})
