const axios = require('axios');
const data = require("./input.json");
const fs = require('fs');

const results = [];

// Function to write results to file
const writeToFile = (results) => {
    const jsonData = JSON.stringify(results);
    fs.writeFile("./result.json", jsonData, (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("File is created successfully.");
        }
    });
};

// Keep track of how many responses have been received
let responsesReceived = 0;

// Iterate through each text object
data.forEach((textObj, index) => {
    const promptText = textObj.Query;
    const payload = {
        prompt: promptText
    };

    const url = `http://192.46.213.85:9001/bharatgpt/getResponse`;

    axios.post(url, payload)
        .then((response) => {
            const bharatgpt_response = response.data.reply;
            results.push({ Query: promptText, Answer: textObj.Answer, bharatgpt_response: bharatgpt_response });

            responsesReceived++;

            // Check if all responses have been received
            if (responsesReceived === data.length) {
                writeToFile(results);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            responsesReceived++; // Increment even if there's an error to avoid infinite loop
            if (responsesReceived === data.length) {
                writeToFile(results);
            }
        });
});
