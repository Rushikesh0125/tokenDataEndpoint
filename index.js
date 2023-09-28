require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const getGlobalBudsCount = require('./utils/getGlobalBudsCount');
const getLastEvent = require('./utils/getLastEmmitedEvents');
const getBlockNumber = require('./utils/getBlockNumber');

const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', async (req, res) => {
    res.send("Home! Put path variables for data");
})

app.get('/totalStakedBudsAcrossAllChains', async (req, res) => {
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

app.get('/getEvents/:networkName/:function/:startBlock/:contractAddress', async (req, res) => {
    try{
        const data = await getLastEvent(req.params.networkName,req.params.function, req.params.startBlock, req.params.contractAddress);
        res.json({data});
    }catch(error){
        console.error('Error posting data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
})

app.get('/getCurrentBlockNumber/:networkName', async (req, res) => {
    try{
        const currentBlock = await getBlockNumber(req.params.networkName);
        res.json({currentBlock});
    }catch(error){
        console.error('Error posting data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
})

module.exports = app