const axios = require("axios");
const fs = require("fs");
const json = require("./input.json");

async function voiceapi(payload) {
  let result;
  const axiosConfig = {
    headers: {
      "appId": "0708775d-c6af-4a88-ac47-346571727a0a",
      "Content-Type": "application/json"
    },
  };

  try {
    const res = await axios.post(
      "https://pmkisan.corover.ai/pmkisanAPI/nlp/VoiceApiBhashini/as",
      payload,
      axiosConfig
    );
    result = res.data;
  } catch (error) {
    console.error(error);
    result = null;
  }

  return result;
}

async function main() {
  const output = [];

  console.log("Creating audios Please wait😮‍💨😮‍💨😮‍💨")
  for (let i = 0; i < json.length; i++) {
    const payload = {
      Text: `${json[i].answers_asm}`
    };

    const result = await voiceapi(payload);
    if (result) {
      output.push({
        input: payload.Text,
        output: result,
      });
    }
  } 

  fs.writeFileSync("output.json", JSON.stringify(output, null, 2));
}

main();
