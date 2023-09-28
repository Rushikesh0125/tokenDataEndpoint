const axios = require('axios');

// Define the URL of your Express server (adjust the port if needed)
const serverUrl = 'http://localhost:8181'; // Replace with the correct URL

// Make a GET request to the /api/tokenData endpoint
axios.get(`${serverUrl}/totalStakedBudsAcrossAllChains`)
  .then((response) => {
    // Handle the response data here
    const res = response.data.totalStakedBudsAcrossAllChains;
    console.log(res > 0);
    console.log('Data from Express server:', res);
  })
  .catch((error) => {
    // Handle any errors that occur during the request
    console.error('Error fetching data from Express server:', error.message);
});

//33561349

axios.get(`${serverUrl}/getEvents/bscTestnet/stake/33680437/0x47BE42b034eC10Ab6F6881D61909D6dAe1F813ad`)
  .then((response) => {
    // Handle the response data here
    const res = response.data;
    console.log('Data from Express server:', res);
  })
  .catch((error) => {
    // Handle any errors that occur during the request
    console.error('Error fetching data from Express server:', error.message);
});
axios.get(`${serverUrl}/getCurrentBlockNumber/bscTestnet`)
  .then((response) => {
    // Handle the response data here
    const res = response.data;
    console.log('Data from Express server:', res);
  })
  .catch((error) => {
    // Handle any errors that occur during the request
    console.error('Error fetching data from Express server:', error.message);
});
