const axios = require('axios');
const data = require("./input.json");
const fs = require('fs');

const results = [];
const maxRetries = 3; // Maximum number of retry attempts
const retryDelay = 1000; // Initial retry delay in milliseconds

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

// Function to make a request with retries
const makeRequestWithRetry = (url, payload, retries = 0) => {
    axios.post(url, payload)
        .then((response) => {
            const bharatgpt_response = response.data.reply;
            results.push({ Query: payload.prompt, Answer: textObj.Answer, bharatgpt_response: bharatgpt_response });

            // Check if all requests have been completed
            if (results.length === data.length) {
                writeToFile(results);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            if (retries < maxRetries) {
                console.log(`Retry attempt ${retries + 1}`);
                setTimeout(() => {
                    makeRequestWithRetry(url, payload, retries + 1);
                }, retryDelay * Math.pow(2, retries)); // Exponential backoff
            } else {
                console.error(`Max retries exceeded for URL: ${url}`);
            }
        });
};

// Iterate through each text object
data.forEach((textObj) => {
    const promptText = textObj.Query;
    const payload = {
        prompt: promptText
    };

    const url = `http://192.46.213.85:9001/bharatgpt/getResponse`;

    makeRequestWithRetry(url, payload);
});
