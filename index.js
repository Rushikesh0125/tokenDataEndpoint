require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const getGlobalBudsCount = require('./getGlobalBudsCount');

const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', async (req, res) => {
    res.send("Home! Put path variables for data");
})

app.get('/api/tokenData', async (req, res) => {
    try {
        // Handle the response data here
        const totalStakedBudsAcrossAllChains = await getGlobalBudsCount();
        console.log(totalStakedBudsAcrossAllChains);
        res.json({totalStakedBudsAcrossAllChains});

    } catch (error) {
        // Handle errors
        console.error('Error posting data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});