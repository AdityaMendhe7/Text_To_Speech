const fs = require("fs");
const json = require("./input.json");

const transformedData = [];

for (let i = 0; i < json.length; i++) {
    const answer = json[i].answer[0];
    transformedData.push({
        "answer": [{
        answer: {
            contextCount: "1",
            response: answer.response,
            audio: answer.audio,
            label: answer.label,
            options: answer.options,
            alsoTry: answer.alsoTry,


        }
        }]
    });
}
fs.writeFileSync("output.json", JSON.stringify(transformedData, null, 2));


