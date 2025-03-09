const OpenAI = require("openai");
const { decrypt } = require("../utils");

/**
 * @file This module provides a function to analyze emotions in an image using the OpenAI API.
 *  Requires the `openai` and a custom `utils` module for decryption.
 */

/**
 * Analyzes emotions in an image using the OpenAI API.
 *
 * @async
 * @param {string} apiKey - Your OpenAI API key.  **Required.**
 * @param {string} [model="gpt-4-turbo"] - The OpenAI model to use. Defaults to "gpt-4-turbo".
 * @param {Buffer} imageBuffer - The image file as a Buffer. **Required.**
 * @returns {Promise<Object|string>} A Promise that resolves with an object containing the emotion analysis results, or a string "Failed to parse emotion data." if parsing fails, or throws an error if the API call fails.  The object structure of the results depends on the OpenAI response.  See example below.
 * @throws {Error} If there's an error during the API call or JSON parsing.
 *
 **/

const SYSTEM_PROMPT = decrypt(
	"e33644437a7e944821504063de71b2fc:9708493976034d65cb90f8d666f403c5:86a4fd49bcd963f0335cb24b826357423b3be9e1a247eef5320e28649e6e365eab07e9271a1bb0c27322a872fc5068aedabdcbad72ee45ed004576862a2485495604aac3b7766b05cb"
);
const USER_PROMPT = decrypt(
	"6347c54e1910c5d62fe65c65259c6932:f5de9b1c8686b205d221f518fcbf3feb:5de17d37e8c5cdc83c79a66bf7d1dadd5a8f2ec0df249cc2a0bc1e7dc0401b1bd40308ae78c03cc5bf7158924cb7429a0d69ad6e9c060f291513ebde05464db036357d1fa2d21d13c7b9e8278979f9c7403e5d08fd9339c8b8f379ee1959baf70af82dfc734f304ab89a7a6ca229d4ea979df5849189ddcce87bf83ad45ecc45560aa82aa22378347b518b65c21f7b6d810d47987712397d9eeeed1eef01a9408350f6b49ea49371201f7c5b44149d7d752d9544b7a8e3b69828771598dea5979f207174f835fcd80c1dd24a607adff4c6744c1810d48781877b747617a8d8a3ba7426028262d927805d6afbce03867bdb74dac47d14fc66e81e3bdcef70960b626f1bf7a2f6f82c9077d0224ed296544dac51ce84a426db39970cb84bc9218cb3f93103db193d1e8cabb70b4ed607a3793f51adead22d89d479f1e54a3fe1bc1f8ef076d52319212db4c735ad5ef3ca928feedce20688b404eee25a291308684b273b2ff2120108a21b08583fb989c3fcb7727f5a4b6138d4040423b2a6c780fa0bb12abf2149f4413c68b3a3195f98e372610dc2893762ac56523b6c561f7cd6aff772fd20e62e53efcdf67a5c8e07305c4248865cf85674b6a3e2c8d7e9ad48028e647a1589ccb0bc3ce08495c7e36a9214fc05ff830744b39edcb1688f9bb323ffed35a58bf3f695056e01d7426ce5bdc8fe9549ac4939088c746aff0ff8b19cc8b0a4693dba03774753906d16e14264f63d937cc99e3721f9bbab8c53e6e2ee"
);

/**
 * Prepares the OpenAI request payload.
 */
const prepareOpenAIRequest = (model, imageBase64) => ({
	model: model || "gpt-4-turbo",
	messages: [
		{ role: "system", content: SYSTEM_PROMPT },
		{
			role: "user",
			content: [
				{ type: "text", text: USER_PROMPT },
				{
					type: "image_url",
					image_url: { url: `data:image/jpeg;base64,${imageBase64}` },
				},
			],
		},
	],
	max_tokens: 100,
});

/**
 * Analyze emotions in an image using OpenAI API
 * @param {Buffer} imageBuffer - The image file as a buffer
 * @returns {Promise<Object>} - Emotion analysis result
 */
async function analyzeEmotions(apiKey, model, imageBuffer) {
	try {
		const openai = new OpenAI({ apiKey: apiKey });
		const requestPayload = prepareOpenAIRequest(
			model,
			imageBuffer.toString("base64")
		);

		// Send to OpenAI for analysis
		const response = await openai.chat.completions.create(requestPayload);
		const emotionsText = response.choices?.[0]?.message?.content?.trim();

		if (!emotionsText) throw new Error("Empty response from OpenAI");

		try {
			const emotions = JSON.parse(emotionsText);
			return emotions;
		} catch (parseError) {
			console.error("JSON Parsing Error:", parseError);
			console.error("Raw OpenAI Response:", emotionsText);
			return "Failed to parse emotion data.";
		}
	} catch (error) {
		console.error("Error analyzing emotions:", error);
		throw error;
	}
}

module.exports = { analyzeEmotions };
