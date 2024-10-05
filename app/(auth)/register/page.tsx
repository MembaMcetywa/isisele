`use client`;
import RegisterForm from "@/app/components/Auth/RegisterForm";
import { Button, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import React from "react";

export default function Register() {
	return (
		<Stack>
			<RegisterForm />
		</Stack>
	);
}
