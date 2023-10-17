const request = require('request');
const fs = require('fs');

// get the arguments from the command line
const args = process.argv.slice(2);

const fetchPage = (url, file) => {
  try {
    request(url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        fs.writeFile(file, body, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
    });
  } catch(er) {
    console.error(er.message);
  } 
};

fetchPage(args[0], args[1]);