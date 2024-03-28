const axios = require("axios");
const fs = require("fs");
const json = require("./input.json");

const axiosConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    Connection: "keep-alive",
    "auth-Key": "2b5fb5d4-0753-4302-b661-f8580e9effb0",
    "sec-ch-ua-mobile": "?0",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
    "Cache-Control": "max-age=31536000",
    "app-id": "29fd4f94-f793-4227-9588-056b5ffb1318",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    Referer: "https://assistant.corover.mobi/irctc/chatbot.html",
    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
  },
};

async function voiceapi(payload) {
  try {
    const res = await axios.post(
      "https://licdev.corover.ai/nlpAPI/convertRealTimeAudio",
      payload,
      axiosConfig
    );
    return res.data;
  } catch (error) {
    console.error("Error making API call:", error);
    return null;
  }
}

function removeHtmlTags(text) {
  return text.replace(/<[^>]+>/g, "");
}

async function main() {
  console.log("Creating Your Audios");
  
  const output = await Promise.all(
    json.map(async (item, index) => {
      const answerText = item.Answers_kn;  // <==== changes

      if (answerText !== undefined) {
        const cleanedText = removeHtmlTags(answerText).replace(/#N\/A/g, "").replace(/<li><\/li>/gi, "").replace(/\n/gi, "");
        
        const payload = {
          sourceText: cleanedText,
          sourceLanguage: "ka",   // <==== changes
        };

        const result = await voiceapi(payload);
        if (result && result["Uploaded URL"]) {
          const audioUrl = result["Uploaded URL"];
          console.log(`Audio ${index + 1} URL:`, audioUrl);

          return {
            Answer: payload.sourceText,
            Answer_audio: audioUrl,
          };
        }
      } else {
        console.warn("answerText is undefined for item at index", index);
      }
    })
  );

  fs.writeFileSync("output.json", JSON.stringify(output.filter(Boolean)));
}

main();
