# Emotions Analyzer

Emotions Analyzer is an NPM library that allows users to upload an image and analyze for emotions whether it is front-side image using mult-model.

## Installation

To install the package, run:

```sh
npm install emotysis
```

## Usage

### Import and Use the Library

```javascript
const { analyzeImage } = require("emotysis");
require("dotenv").config();

(async () => {
	try {
		const result = await analyzeImage("path/to/someImage.jpg");
		console.log("Analysis Result:", result);
	} catch (error) {
		console.error(error.message);
	}
})();
```

## Environment Variables

Create a `.env` file in your project root and add your OpenAI API key:

```sh
OPENAI_API_KEY=your_openai_api_key_here
```

## How It Works

1. User calls `analyzeImage("path/to/image.jpg")`.
2. Library reads & converts the image to Base64.
3. Encrypts the request internally.
4. Sends the encrypted request to OpenAI.
5. Returns AI emotion analysis result indicating whether for the image.

## Features

✅ Securely encrypts OpenAI requests internally.  
✅ User only needs to pass the image; encryption is handled inside.  
✅ Works seamlessly with OpenAI GPT models.

## License

This project is licensed under the MIT License.
