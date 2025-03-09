# emotysis: Emotion Analysis from Images

emotysis is an npm library that analyzes the emotional content of images using the OpenAI API. It handles image encoding, secure request encryption (using a custom decryption function), and response parsing, providing a simple interface for developers.

## Installation

npm install emotysis

## Usage

Before using the library, ensure you have an OpenAI API key. Create a .env file in your project's root directory and add your key:

OPENAI_API_KEY=your-openai-api-key

Then, use the library as follows:

```javascript
const { analyzeEmotions } = require("emotysis");
require("dotenv").config();

async function analyzeImage(imagePath) {
	try {
		const imageBuffer = require("node:fs").readFileSync(imagePath);
		const results = await analyzeEmotions(
			process.env.OPENAI_API_KEY,
			"gpt-4-turbo",
			imageBuffer
		); // You can specify the OpenAI model here. Defaults to gpt-4-turbo.
		console.log("Emotion Analysis Results:", results);
	} catch (error) {
		console.error("Error analyzing image:", error);
	}
}

analyzeImage("./path/to/your/image.jpg");
```

---

## Contributing

Feel free to contribute by submitting issues or pull requests.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Developed by [Parth Sharma](https://getparth.com)
