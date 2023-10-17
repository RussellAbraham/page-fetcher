const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fetchPage = (url, file) => {
  try {
    request(url, (error, response, body) => {
      if (error) {
        console.error('Error fetching the page:', error);
      } else if (response.statusCode === 200) {
        handleSuccess(body, file);
      } else {
        console.error('Unexpected status code:', response.statusCode);
      }
    });
  } catch (err) {
    console.error('An unexpected error occurred:', err.message);
  }
};

const handleSuccess = (body, file) => {
  fs.access(file, fs.constants.F_OK, (err) => {
    if (!err) {
      console.log('File already exists. Do you want to overwrite it? (Y/N)');
      rl.question('', (answer) => {
        if (answer.trim().toLowerCase() === 'y') {
          writeFile(body, file);
        } else {
          console.log('File not overwritten. Exiting...');
          rl.close();
        }
      });
    } else {
      writeFile(body, file);
    }
  });
};

const writeFile = (body, file) => {
  fs.writeFile(file, body, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Page fetched and saved successfully!');
    }
    rl.close();
  });
};

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('Usage: node script.js <url> <output-file>');
  rl.close();
} else {
  fetchPage(args[0], args[1]);
}

rl.on('close', () => process.exit(0));