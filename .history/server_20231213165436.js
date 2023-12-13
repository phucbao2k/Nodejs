// import express from 'express';
// import bodyParser from 'body-parser';
// import { configViewEngine } from './src/config/viewEngine.js';
// import { initWebRoutes } from './route/web.js';
// import { sequelize, connectDB } from './src/config/connectDB.js';
// import cors from 'cors';


import express from "express";
import bodyParser from "body-parser";
import { configViewEngine } from './src/config/viewEngine.js';
import { initWebRoutes } from './route/web.js';
import { connectDB } from './src/config/connectDB.js';
import cors from 'cors';
require('dotenv').config();

// Configure environment variables from .env file
// Create an Express application
let app = express();
// Use body-parser middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Use CORS middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.options('*', cors());
// Configure view engine
configViewEngine(app);

// Initialize web routes
initWebRoutes(app);
// app.get('/admin/search', async (req, res) => {
//     try {
//         let { searchTerm } = req.query;

//         let results = await sequelize.query(
//             `SELECT Users.*, Bookings.reasons, Bookings.date, Bookings.birthday, Bookings.statusId
//               FROM Users
//               LEFT JOIN Bookings ON Users.id = Bookings.patientId
//               WHERE Users.id LIKE :searchTerm
//               OR Users.firstName LIKE :searchTerm
//               OR Users.lastName LIKE :searchTerm`,
//             {
//                 replacements: { searchTerm: `%${searchTerm}%` },
//                 type: Sequelize.QueryTypes.SELECT,
//             }
//         );

//         res.json(results);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });





let $ = require('jquery');




connectDB()
    .then(() => {
        let port = process.env.PORT || 7070;

        app.listen(port, () => {
            console.log('Server is running on port ' + port);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });