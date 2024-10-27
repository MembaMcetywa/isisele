"use client";
import React from "react";
import { Button, Flex } from "@mantine/core";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/app/helpers/supabase/client";

export default function DashboardPage() {
	const router = useRouter();

	const logoutAction = async () => {
		await supabaseClient.auth.signOut();
		router.push("/");
	};

	return (
		<Flex className="w-full h-screen">
			<Button onClick={logoutAction} className="w-min">
				Logout
			</Button>
		</Flex>
	);
}
