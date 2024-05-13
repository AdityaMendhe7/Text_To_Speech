const axios = require('axios');
const data = require("./input.json");
const fs = require('fs');
const results = [];

data.forEach(textObj => {
    const promptText = textObj.Query;
    const payload = {
        prompt: promptText
    };

    const url = `http://192.46.213.85:9001/bharatgpt/getResponse`;

    axios.post(url, payload)
        .then((response) => {
            const bharatgpt_response = response.data.reply;
            results.push({ Query: promptText, Answer: textObj.Answer, bharatgpt_response: bharatgpt_response });

            const jsonData = JSON.stringify(results);
            fs.writeFile("./result.json", jsonData, (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                } else {
                    console.log("File is created successfully.");
                }
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});
