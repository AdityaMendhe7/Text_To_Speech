const encodedData = "4KSo4KSu4KS44KWN4KSk4KWH";

// Decode the Base64 string
const decodedData = Buffer.from(encodedData, 'base64').toString('utf-8');

console.log("Decoded Data:", decodedData);