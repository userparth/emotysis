const crypto = require("crypto");

const algorithm = "aes-256-gcm";
const secretKey = Buffer.from("0123456789abcdef0123456789abcdef", "utf-8"); // 32 bytes

// Decrypt function
function decrypt(encryptedText) {
	const [ivHex, authTagHex, encrypted] = encryptedText.split(":");

	const decipher = crypto.createDecipheriv(
		algorithm,
		secretKey,
		Buffer.from(ivHex, "hex")
	);
	decipher.setAuthTag(Buffer.from(authTagHex, "hex"));

	let decrypted = decipher.update(encrypted, "hex", "utf8");
	decrypted += decipher.final("utf8");
	return decrypted;
}

module.exports = { decrypt };
