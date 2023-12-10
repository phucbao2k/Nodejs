import express from 'express';
import bodyParser from 'body-parser';
import { configViewEngine } from './src/config/viewEngine.js';
import { initWebRoutes } from './route/web.js';
import { sequelize, connectDB } from './src/config/connectDB.js';
import cors from 'cors';
require('dotenv').config();
import Se
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
            `SELECT Users.*, Bookings.reasons, Bookings.date, Bookings.birthday, Bookings.statusId
            FROM Users
            LEFT JOIN Bookings ON Users.id = Bookings.patientId
            WHERE Users.id LIKE :searchTerm
            OR Users.firstName LIKE :searchTerm
            OR Users.lastName LIKE :searchTerm`,
            {
                replacements: { searchTerm: `%${searchTerm}%` },
                type: Sequelize.QueryTypes.SELECT,
            }
        );

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


connectDB()
    .then(() => {
        const port = process.env.PORT || 7070;

        app.listen(port, () => {
            console.log('Server is running on port ' + port);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
