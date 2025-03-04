const crypto = require("crypto");

const algorithm = "aes-256-gcm";
const secretKey = Buffer.from("0123456789abcdef0123456789abcdef", "utf-8"); // 32 bytes

// Encrypt function
function encrypt(text) {
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

	let encrypted = cipher.update(text, "utf8", "hex");
	encrypted += cipher.final("hex");
	const authTag = cipher.getAuthTag().toString("hex");

	return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}

module.exports = { encrypt };
