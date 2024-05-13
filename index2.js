const axios = require('axios');
const fs = require('fs');

const data = require("./input.json");

const results = [];

data.forEach(textObj => {
    const promptText = textObj.Query;
    const payload = {
        query: promptText,
        source: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        inputType: "TEXT",
        userToken: "682ff2d1-2f9c-4279-bd38-78c327135362",
    };

    const url = 'https://uatdsbharathgpt.corover.ai/npciAPI/bot/sendQuery/en';

    axios.post(url, payload, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8,it;q=0.7',
            'Cache-Control': 'max-age=31536000',
            'Connection': 'keep-alive',
            'Content-Type': 'application/json',
            'Origin': 'https://uatdsbharathgpt.corover.ai',
            'Referer': 'https://uatdsbharathgpt.corover.ai/chatbot/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'appId': 'c5ff5a4d-b73b-4bc0-b9b6-d6ecb2de198f',
            'sec-ch-ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"'
        }
    })
    .then((response) => {
        const bharatgpt_response = response.data; 
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
