"use client";
import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";

type FormInput = {
	email: string;
	password: string;
};

export default function LoginForm() {
	const form = useForm<FormInput>({
		initialValues: {
			email: "",
			password: "",
		},

		validate: {
			email: isEmail("E-mail is not valid"),
			password: isNotEmpty("Password cannot be empty"),
		},
	});

	const submitLogin = async () => {};

	return (
		<form onSubmit={form.onSubmit(submitLogin)} className="bg-white">
			<Stack>
				<TextInput label="E-mail" {...form.getInputProps("email")} />
				<PasswordInput label="Password" {...form.getInputProps("password")} />
				<Button type="submit">Login</Button>
			</Stack>
		</form>
	);
}
