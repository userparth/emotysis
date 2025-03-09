require("dotenv").config();
const Fastify = require("fastify");
const fastifyMultipart = require("@fastify/multipart");
const emotysis = require("./emotysis");

const fastify = Fastify({ logger: true });

fastify.register(fastifyMultipart);

/**
 * API Endpoint: /analyze-emotion
 * Accepts: Image via multipart/form-data
 * Returns: JSON with emotion probabilities
 */
fastify.post("/analyze-emotion", async (req, reply) => {
	try {
		const data = await req.file();
		if (!data) return reply.status(400).send({ error: "No image uploaded" });

		const imageBuffer = await data.toBuffer();
		await emotysis.analyzeEmotions(process.env.OPENAI_API_KEY, imageBuffer);

		const emotions = await emotysis.analyzeEmotions(
			process.env.OPENAI_API_KEY,
			process.env.GPT_MODEL,
			imageBuffer
		);

		if (!emotions) throw new Error("Empty response from emotysis");

		return reply.send({ success: true, emotions });
	} catch (error) {
		console.error("Emotion Analysis Error:", error);
		return reply.status(500).send({ error: "Emotion analysis failed." });
	}
});

// Start the Fastify server
fastify.listen({ port: 3000 }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`🚀 API running at ${address}`);
});
