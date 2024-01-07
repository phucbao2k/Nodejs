// searchDoctorAPI.js
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Allcode } = require('./src/models');
const searchFunction = require('./searchFunction');

router.post('/search-doctor', async (req, res) => {
    const { searchTerm } = req.body;

    try {
        const result = await searchFunction(searchTerm);
        res.json(result);
    } catch (error) {
        console.error('Error executing search function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
