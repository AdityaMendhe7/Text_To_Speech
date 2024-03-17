const fs = require('fs');
const { Client } = require('pg');

// PostgreSQL database configuration
const client = new Client({
  type: "postgres",
  host: "postgres.gcp.corover.ai",
  port: 5432,
  username: "postgres",
  password: "PVc)4tWX$oMB",
  database: "postgres",
  schema: "npci_test",
});

// Connect to the database
client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));

// Read CSV file and auto-generate columns
fs.readFile('your_file.csv', 'utf8', (err, data) => {
  if (err) throw err;
  
  // Split the CSV data into rows
  const rows = data.trim().split('\n');
  
  // Get column names from the first row
  const columns = rows.shift().split(',');

  // Generate CREATE TABLE query
  let query = 'CREATE TABLE IF NOT EXISTS your_table (';
  columns.forEach((column, index) => {
    if (index !== 0) {
      query += ', ';
    }
    query += `${column} VARCHAR(255)`; // Assuming all columns are of type VARCHAR(255), you can modify it accordingly
  });
  query += ')';

  // Execute the CREATE TABLE query
  client.query(query, (err, result) => {
    if (err) throw err;
    console.log('Table created successfully');

    // Close the database connection
    client.end();
  });
});
