const fs = require('fs');

// Step 1: Read the JSON file
const filePath = '/Users/adityamendhe/Documents/GitHub/context-bot-node/Utilities/encodedData.json'; // Replace with the path to your JSON file

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    // Step 2: Parse the JSON data
    const jsonData = JSON.parse(data);

    // Step 3: Decode Base64 for the 'answer' field
    const decodeBase64 = (encodedText) => {
      if (typeof encodedText !== 'string') {
        console.error('Invalid Base64 encoded text:', encodedText);
        return ''; // Return empty string if it's not valid Base64
      }

      try {
        return Buffer.from(encodedText, 'base64').toString('utf-8');
      } catch (error) {
        console.error('Error decoding Base64:', error);
        return encodedText; // Return the original text if decoding fails
      }
    };

    // Step 4: Iterate over the JSON data and decode each 'answer' field
    const decodedAnswers = jsonData.map((entry) => {
      if (entry.answer) {
        const decodedAnswer = decodeBase64(entry.answer);
        return { decodedAnswer };
      } else {
        console.error('Error: "answer" field is missing in one of the entries.');
        return null; // Return null for entries without the 'answer' field
      }
    }).filter(Boolean); // Filter out any null values from the array

    // Step 5: Log the decoded answers to console
    console.log('Decoded Answers:', decodedAnswers);

    // Step 6: Write the decoded answers to a new file
    const outputFilePath = './decodedAnswers.json';
    fs.writeFile(outputFilePath, JSON.stringify(decodedAnswers, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing the decoded data:', writeErr);
        return;
      }
      console.log('Decoded answers successfully written to', outputFilePath);
    });

  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});