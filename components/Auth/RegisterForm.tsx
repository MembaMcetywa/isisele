"use client";
import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";

type FormInput = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export default function RegisterForm() {
	const form = useForm<FormInput>({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},

		validate: {
			firstName: isNotEmpty("First name cannot be empty"),
			lastName: isNotEmpty("Last name cannot be empty"),
			email: isEmail("E-mail is not valid"),
			password: isNotEmpty("Password cannot be empty"),
			confirmPassword: (value, values) =>
				value !== values.password && "Passwords do not match",
		},
	});

	const submitRegister = async () => {};

	return (
		<form onSubmit={form.onSubmit(submitRegister)} className="bg-white">
			<Stack>
				<TextInput label="First Name" {...form.getInputProps("firstName")} />
				<TextInput label="Last Name" {...form.getInputProps("lastName")} />
				<TextInput label="E-mail" {...form.getInputProps("email")} />
				<PasswordInput label="Password" {...form.getInputProps("password")} />
				<PasswordInput
					label="Confirm Password"
					{...form.getInputProps("confirmPassword")}
				/>
				<Button type="submit">Register</Button>
			</Stack>
		</form>
	);
}
