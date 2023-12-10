import express from "express";
import bodyParser from "body-parser";
import { configViewEngine } from "./src/config/viewEngine.js";
import { initWebRoutes } from './route/web.js';
import connectDB from "./src/config/connectDB.js";
import cors from 'cors';
import User from './src/models/user.js';
import Booking from './src/models/booking.js';
import { Sequelize } from 'sequelize';

require('dotenv').config();

let app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
configViewEngine(app);
initWebRoutes(app);

app.get('/admin/search', async (req, res) => {
    try {
        const { searchTerm } = req.query;

        const results = await User.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { id: { [Sequelize.Op.like]: `%${searchTerm}%` } },
                    { firstName: { [Sequelize.Op.like]: `%${searchTerm}%` } },
                    { lastName: { [Sequelize.Op.like]: `%${searchTerm}%` } }
                ]
            },
            include: [{
                model: Booking,
                attributes: ['reasons', 'date', 'birthday', 'statusId']
            }]
        });

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Tạm thời comment dòng này để tránh kết nối cơ sở dữ liệu 2 lần
// connectDB();

let port = process.env.PORT || 7070;

app.listen(port, () => {
    console.log("port is " + port);
});
