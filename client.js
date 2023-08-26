const axios = require('axios');

// Define the URL of your Express server (adjust the port if needed)
const serverUrl = 'http://localhost:8181'; // Replace with the correct URL

// Make a GET request to the /api/tokenData endpoint
axios.get(`${serverUrl}/api/tokenData`)
  .then((response) => {
    // Handle the response data here
    const responseData = response.data;
    console.log('Data from Express server:', responseData);
  })
  .catch((error) => {
    // Handle any errors that occur during the request
    console.error('Error fetching data from Express server:', error.message);
  });
