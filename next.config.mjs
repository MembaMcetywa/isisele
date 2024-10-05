import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ hostname: "isisele-bucket.s3.af-south-1.amazonaws.com" },
		],
	},
};

const pwaConfig = withPWA({
	dest: "app",
	disable: process.env.NODE_ENV === "development",
});

export default pwaConfig(nextConfig);
