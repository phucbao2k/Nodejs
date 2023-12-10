import express from 'express';
import bodyParser from 'body-parser';
import { configViewEngine } from './src/config/viewEngine.js';
import { initWebRoutes } from './route/web.js';
import connectDB from './src/config/connectDB.js';
import cors from 'cors';
import { sequelize, Sequelize } from './src/config/connectDB.js';
import User from './src/models/user.js';
import Booking from './src/models/booking.js';

require('dotenv').config();

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
configViewEngine(app);
initWebRoutes(app);

app.get('/admin/search', async (req, res) => {
    try {
        const { searchTerm } = req.query;

        const results = await sequelize.query(
            `SELECT * FROM Users 
      WHERE id LIKE :searchTerm OR firstName LIKE :searchTerm OR lastName LIKE :searchTerm
      INNER JOIN Bookings ON Users.id = Bookings.userId
      `,
            {
                replacements: { searchTerm: `%${searchTerm}%` },
                type: Sequelize.QueryTypes.SELECT,
            }
        );

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi Nội Bộ của Server');
    }
});

connectDB();

const port = process.env.PORT || 7070;

app.listen(port, () => {
    console.log('Port đang chạy ở cổng ' + port);
});