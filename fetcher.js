const request = require('request');
const fs = require('fs');
const readline = require('readline');

/**
 * Creates a readline interface for user input.
 * @type {readline.Interface}
 */

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Fetches a page from the given URL and handles responses.
 * @param {string} url - The URL to fetch the page from.
 * @param {string} file - The local file path to save the fetched content.
 */

// Function to fetch a page from the given URL and handle responses
const fetchPage = (url, file) => {
  try {
    // Use the request library to make an HTTP request
    request(url, (error, response, body) => {
      if (error) {
        // Handle error if the request encounters an issue
        console.error('Error fetching the page:', error);
      } else if (response.statusCode === 200) {
        // If the response status code is 200, handle success
        handleSuccess(body, file);
      } else {
        // Handle unexpected status codes
        console.error('Unexpected status code:', response.statusCode);
      }
    });
  } catch (err) {
    // Handle unexpected errors
    console.error('An unexpected error occurred:', err.message);
  }
};

/**
 * Handles success after fetching the page.
 * @param {string} body - The content of the fetched page.
 * @param {string} file - The local file path to save the fetched content.
 */

// Function to handle success (200 response) after fetching the page
const handleSuccess = (body, file) => {
  // Check if the file already exists
  fs.access(file, fs.constants.F_OK, (err) => {
    if (!err) {
      // If the file exists, ask the user if they want to overwrite it
      console.log('File already exists. Do you want to overwrite it? (Y/N)');
      // Use the readline interface to get user input
      rl.question('', (answer) => {
        if (answer.trim().toLowerCase() === 'y') {
          // If the user wants to overwrite, proceed with writing to the file
          writeFile(body, file);
        } else {
          // If the user does not want to overwrite, inform and exit
          console.log('File not overwritten. Exiting...');
          rl.close();
        }
      });
    } else {
      // If the file does not exist, proceed with writing to the file
      writeFile(body, file);
    }
  });
};

/**
 * Writes the fetched page content to a file.
 * @param {string} body - The content of the fetched page.
 * @param {string} file - The local file path to save the fetched content.
 */

// Function to write the fetched page content to a file
const writeFile = (body, file) => {
  fs.writeFile(file, body, (err) => {
    if (err) {
      // Handle error if there is an issue writing to the file
      console.error('Error writing to file:', err);
    } else {
      // If writing is successful, inform the user
      console.log('Page fetched and saved successfully!');
    }
    // Close the readline interface to exit the script
    rl.close();
  });
};

// Check for valid command line arguments
const args = process.argv.slice(2);
if (args.length !== 2) {
  // Print usage message if arguments are not provided
  console.error('Usage: node script.js <url> <output-file>');
  rl.close();
} else {
  // Fetch the page using the provided arguments
  fetchPage(args[0], args[1]);
}

// Listen for the close event of the readline interface and exit the process
rl.on('close', () => process.exit(0));
