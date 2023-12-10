import express from "express";
import bodyParser from "body-parser";
import { configViewEngine } from "./src/config/viewEngine.js";
import { initWebRoutes } from './route/web.js';
import connectDB from "./src/config/connectDB.js";
import _ from "lodash";

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
app.get('/admin/search', async (req, res) => {
    try {
        const { searchTerm } = req.query;

        const query = `
            SELECT Users.*, Bookings.reasons, Bookings.date, Bookings.birthday, Bookings.statusId
            FROM Users
            LEFT JOIN Bookings ON Users.id = Bookings.patientId
            WHERE Users.id LIKE '%${searchTerm}%'
            OR Users.firstName LIKE '%${searchTerm}%'
            OR Users.lastName LIKE '%${searchTerm}%';
        `;

        const connection = await connectDB(); // Kết nối đến cơ sở dữ liệu

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
