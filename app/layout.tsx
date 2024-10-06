import type { Metadata } from "next";
import localFont from "next/font/local";
import { MantineProvider } from "@mantine/core";

import "./globals.css";
import { theme } from "@/app/theme/mantineTheme";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Isisele",
	description: "An offline first education platform for farmers.",
	manifest: "/manifest.json",
};
//
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<MantineProvider theme={theme}>{children}</MantineProvider>
			</body>
		</html>
	);
}
