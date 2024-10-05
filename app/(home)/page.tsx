import { Anchor, Button, Stack, Title } from "@mantine/core";
import { S3Client } from "@aws-sdk/client-s3";

import TestHome from "@/components/Home/testHome";
import { presignedUrl } from "@/helpers/s3Bucket";
import Image from "next/image";

export default async function Home() {
	const url = await presignedUrl("event_empty.png");

	console.log({ url });

	return (
		<Stack>
			<Title>Isisele</Title>
			<Anchor href="/login">Login</Anchor>
			<TestHome />
			<Image src={url} alt="" width={250} height={250} />
		</Stack>
	);
}
