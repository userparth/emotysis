require("dotenv").config();
const OpenAI = require("openai");
const fs = require("fs");
const { encrypt } = require("./utils");

// OpenAI Setup
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Analyze Image
 * @param {string} imagePath - Path to the image file
 * @returns {Promise<string>} - AI response (Is this a passport image?)
 */
async function analyzeImage(imagePath) {
	try {
		// Read image and convert to Base64
		const imageBuffer = fs.readFileSync(imagePath);
		const base64Image = imageBuffer.toString("base64");

		// Create OpenAI request object
		const requestPayload = {
			model: "gpt-4-turbo",
			messages: [
				{
					role: "system",
					content:
						"You are an AI that detects if an uploaded image is a passport's front-side photo.",
				},
				{
					role: "user",
					content: [
						{ type: "text", text: "Is this a passport front-side image?" },
						{
							type: "image_url",
							image_url: `data:image/jpeg;base64,${base64Image}`,
						},
					],
				},
			],
		};

		// Encrypt request internally
		const encryptedRequest = encrypt(JSON.stringify(requestPayload));

		// Send request to OpenAI
		const response = await openai.chat.completions.create(
			JSON.parse(encryptedRequest)
		);

		return response.choices[0].message.content;
	} catch (error) {
		throw new Error("Error analyzing image: " + error.message);
	}
}

module.exports = { analyzeImage };
