const { request, gql } = require('graphql-request');
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const graphqlApiUrl = `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/3nXfK3RbFrj6mhkGdoKRowEEti2WvmUdxmz73tben6Mb`;

const query = gql`{
    token(id: "0x0100546f2cd4c9d97f798ffc9755e47865ff7ee6") {
        chainId
    }
  }
`;

app.get('/', async (req, res) => {
    res.send("Home! Put path variables for data");
})

app.get('/api/tokenData', async (req, res) => {
    try {
        request(graphqlApiUrl, query).then((data) => {
            // Handle the response data here
            const responseData = data;
            const toDisplay = responseData.token.chainId;
            // console.log(responseData);
            res.json({toDisplay});
        })
    } catch (error) {
        // Handle errors
        console.error('Error posting data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});