# Page Fetcher

A nodejs program to make `GET` requests to a resource and write out the response to a file.

## Dependencies

- request ^2.88.2

## Usage

`node fetcher.js https://en.wikipedia.org/wiki/JavaScript ./index.html`

This will write the results of the `GET` request to `./index.html`. 

If the file already exists you will be prompted with a `Y/N` to overwrite the file.