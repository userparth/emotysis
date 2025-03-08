// faceExtractor.js - Extracts facial features from an image
import * as faceapi from "face-api.js";
import canvas from "canvas";

export async function extractFacialFeatures(imageBuffer) {
	const { Canvas, Image } = canvas;
	faceapi.env.monkeyPatch({ Canvas, Image });

	await faceapi.nets.ssdMobilenetv1.loadFromDisk("./models");
	await faceapi.nets.faceExpressionNet.loadFromDisk("./models");

	const img = new Image();
	img.src = imageBuffer;
	const detections = await faceapi.detectSingleFace(img).withFaceExpressions();

	if (!detections) {
		throw new Error("No face detected");
	}

	return detections.expressions;
}
