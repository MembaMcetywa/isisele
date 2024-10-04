import { Paper, Stack } from "@mantine/core";
import { ReactNode } from "react";

export default function AuthLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html>
			<body>
				<Stack className="w-full h-screen items-center justify-center">
					<Paper bg="#fff" shadow="xs" m="auto" p="sm" className=" w-2/6">
						{children}
					</Paper>
				</Stack>
			</body>
		</html>
	);
}
