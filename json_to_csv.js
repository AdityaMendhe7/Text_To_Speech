const { parse } = require('json2csv');
const fs = require('fs');

// Load the JSON data
const data = require('./output.json');

// Define the fields for the CSV file
const fields = ['categoryQuestion_or', 'answer'];

// Convert the JSON data to CSV format
const csv = parse(data, { fields });

// Write the CSV data to a file
fs.writeFileSync('csvFile.csv', csv);
