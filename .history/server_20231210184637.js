import express from "express";
import bodyParser from "body-parser";
import { configViewEngine } from "./src/config/viewEngine.js";
import { initWebRoutes } from './route/web.js';
import connectDB from "./src/config/connectDB.js";
import cors from 'cors';
import User from './src/models/user.js';
import Booking from '.sr/models/booking.js';
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

        // Import Sequelize Model
        

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

connectDB(); // Kết nối đến cơ sở dữ liệu

let port = process.env.PORT || 7070;
app.listen(port, () => {
    console.log("port is " + port);
});
