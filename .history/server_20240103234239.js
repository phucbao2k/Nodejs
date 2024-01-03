import { format } from 'date-fns';
import express from 'express';
import bodyParser from 'body-parser';
import { configViewEngine } from './src/config/viewEngine.js';
import { initWebRoutes } from './route/web.js';
import { connectDB } from './src/config/connectDB.js';
import cors from 'cors';
const searchFunction = require('./searchFunction');
require('dotenv').config();
let crypto = require('crypto-browserify');

// Create an Express application
let app = express();

// Use body-parser middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Use CORS middleware
app.use(cors({
    origin: 'http://your-domain.com', // Thay thế 'http://your-domain.com' bằng domain cụ thể của bạn
    methods: 'GET,PUT,POST,DELETE,PATCH',
    allowedHeaders: 'Content-Type',
    credentials: true,
}));

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

// Connect to the database
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
