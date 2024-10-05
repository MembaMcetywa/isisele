import { Paper, Stack, Title } from "@mantine/core";
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
					<Paper bg="#fff" shadow="sm" m="auto" p="sm" className=" w-2/6">
						<Title order={2} className="text-center">
							Isisele
						</Title>
						{children}
					</Paper>
				</Stack>
			</body>
		</html>
	);
}
