const fs = require("fs");

function addAnchorTags(text) {
  const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)(?=\s|$)/g;
  return text.replace(urlPattern, '<a href="$1" target="_blank">$1</a>');
}

// Read JSON file
fs.readFile('input.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Parse JSON data
  let jsonData;
  try {
    jsonData = JSON.parse(data);
  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr);
    return;
  }

  // Modify the Answer fields with anchor tags
  jsonData = jsonData.map(item => {
    if (item.Answer) {
      item.Answer = addAnchorTags(item.Answer);
    }
    return item;
  });

  // Convert back to JSON string
  const modifiedJsonString = JSON.stringify(jsonData, null, 2);

  // Write the modified data to a new JSON file
  fs.writeFile('output.json', modifiedJsonString, 'utf8', writeErr => {
    if (writeErr) {
      console.error('Error writing the file:', writeErr);
    } else {
      console.log('File has been saved with anchor tags added.');
    }
  });
});
