import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from "axios";

const s3 = new S3Client({
	region: "af-south-1",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
});

export async function presignedUrl(key: string) {
	const command = new GetObjectCommand({
		Bucket: process.env.AWS_BUCKET_NAME!,
		Key: key,
	});
	try {
		return await getSignedUrl(s3, command);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error(error.message);

		return "";
	}
}
