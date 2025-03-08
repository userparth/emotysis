// index.js - Main entry for the NPM package
import express from "express";
import multer from "multer";
import { analyzeEmotion } from "./emotionAnalyzer.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.post("/analyze", upload.single("image"), async (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: "No image uploaded" });
	}

	try {
		const emotions = await analyzeEmotion(req.file.buffer);
		res.json(emotions);
	} catch (error) {
		res.status(500).json({ error: "Failed to analyze emotion" });
	}
});

app.listen(3000, () => console.log("Server running on port 3000"));

// emotionAnalyzer.js - Handles AI-based emotion analysis
import OpenAI from "openai";
import { extractFacialFeatures } from "./faceExtractor.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function analyzeEmotion(imageBuffer) {
	const features = extractFacialFeatures(imageBuffer);

	const prompt = `Based on these facial features: ${JSON.stringify(
		features
	)}, predict the emotions with percentage distribution.`;

	const response = await openai.chat.completions.create({
		model: "gpt-4-turbo",
		messages: [{ role: "user", content: prompt }],
	});

	return response.choices[0].message.content;
}
