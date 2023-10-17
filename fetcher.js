const request = require('request');

// get the arguments from the command line
const args = process.argv.slice(2);

const fetchPage = (url) => {
  request(url, function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
};

fetchPage(args.join(' '));