import { format } from 'date-fns';
import express from "express";
import bodyParser from "body-parser";
import { configViewEngine } from './src/config/viewEngine.js';
import { initWebRoutes } from './route/web.js';
import {connectDB } from './src/config/connectDB.js';
import cors from 'cors';
const searchFunction = require('./searchFunction');
require('dotenv').config();
let querystring = require('querystring');
// Configure environment variables from .env file
// Create an Express application
let app = express();
let crypto = require('crypto-browserify');
// Use body-parser middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
let order = require('./src/views/order.js');
// Use CORS middleware
app.use(cors({
    origin: '*',
}));
app.use('/order', order);
app.options('*', cors());
// Configure view engine
configViewEngine(app);

// Initialize web routes
initWebRoutes(app);

app.post('/api/search-doctor', async (req, res) => {
    try {
        const result = await searchFunction();
        res.json(result);
    } catch (error) {
        console.error('Error handling search request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Có thể sửa '*' thành domain cụ thể 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
}); 
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