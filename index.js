const fs = require("fs");

// Input and Output JSON file paths
const inputFilePath =
  "/Users/adityamendhe/Documents/GitHub/context-bot-node/Utilities/input.json";
const outputFilePath =
  "/Users/adityamendhe/Documents/GitHub/context-bot-node/Utilities/output.json";

// Function to generate utterances based on a question
function generateUtterances(question) {
  // Extract core part of the question
  const corePhrase = extractCorePhrase(question);

  // Return the core phrase directly (not an array)
  return corePhrase;
}

// Function to extract the core phrase from a question
function extractCorePhrase(question) {
  // List of words to remove (common question words)
  const stopWords = [
    "what",
    "who",
    "where",
    "why",
    "how",
    "does",
    "is",
    "are",
    "can",
    "could",
    "the",
    "to",
    "for",
    "of",
    "and",
    "as",
    "in",
    "on",
    "at",
    "by",
    "that",
    "this",
    "a",
    "much"
  ];

  // Remove punctuation from the question
  const cleanedQuestion = question.replace(/[!?.,;()]/g, "");

  // Convert the question to lowercase and split it into words
  const words = cleanedQuestion.toLowerCase().split(" ");

  // Remove common words (stop words) and return the remaining words as the core phrase
  const coreWords = words.filter((word) => !stopWords.includes(word));

  // Reassemble and return the remaining words as the core phrase
  return coreWords.join(" ");
}

// Function to process the input JSON and generate utterances
function processQuestions(inputPath, outputPath) {
  try {
    // Read the input JSON file
    const data = fs.readFileSync(inputPath, "utf8");
    const jsonData = JSON.parse(data);

    // Validate the structure of the JSON file
    if (!Array.isArray(jsonData) || !jsonData.every((item) => item.defaultQuery)) {
      throw new Error(
        "Invalid JSON format. Expected an array of objects with 'Question' keys."
      );
    }

    // Generate utterances for each question
    const results = jsonData.map((item) => {
      const question = item.defaultQuery;

      // Generate utterances for the given question
      const utterances = generateUtterances(question);

      return {
        question,
        utterances, // Here, 'utterances' will now be a string, not an array.
      };
    });

    // Save the results to the output JSON file
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf8");
    console.log(`Utterances have been saved to ${outputPath}`);
  } catch (error) {
    console.error("Error reading or processing the JSON file:", error);
  }
}

// Run the function
processQuestions(inputFilePath, outputFilePath);