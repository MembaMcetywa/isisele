"use client";

import { supabaseClient } from "@/app/helpers/supabase/client";
import {
	Button,
	Flex,
	PasswordInput,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { z, ZodError } from "zod";

type FormInput = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const loginSchema = z
	.object({
		firstName: z.string(),
		lastName: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
		confirmPassword: z.string(),
	})
	.refine(
		() => (values: FormInput) => {
			return values.password === values.confirmPassword;
		},
		{
			message: "Passwords must match!",
			path: ["confirmPassword"],
		}
	);

export default function RegisterForm() {
	const [formError, setFormError] = useState("");
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const [loading, { open: startLoader, close: stopLoader }] =
		useDisclosure(false);

	const submitRegister = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrors({});

		startLoader();

		const formData = new FormData(e.currentTarget);
		const values = Object.fromEntries(formData.entries()) as FormInput;

		try {
			const { email, password, firstName, lastName } =
				loginSchema.parse(values);

			const { error } = await supabaseClient.auth.signUp({
				email,
				password,
				options: {
					data: {
						firstName,
						lastName,
					},
				},
			});

			if (error) {
				throw error;
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error?.errors?.length) {
				const errorList: (ZodError & { path: string[] })[] = error?.errors;
				setErrors((prev) =>
					errorList.reduce(
						(acc: typeof errors, e) => ({
							...acc,
							[e?.path[0]]: e.message,
						}),
						prev
					)
				);

				return;
			}

			setFormError(error?.message || error);
		} finally {
			stopLoader();
		}
	};

	const valueOnChange = () => {
		setFormError("");
		setErrors({});
	};

	return (
		<form onSubmit={submitRegister} className="bg-white">
			{formError && (
				<Text c="red" className="text-red-500 text-center">
					{formError}!
				</Text>
			)}
			<Stack>
				<TextInput
					label="First Name"
					name="firstName"
					error={errors?.firstName}
					onChange={valueOnChange}
				/>
				<TextInput
					label="Last Name"
					name="lastName"
					error={errors?.lastName}
					onChange={valueOnChange}
				/>
				<TextInput
					label="E-mail"
					name="email"
					error={errors?.email}
					onChange={valueOnChange}
				/>
				<PasswordInput
					label="Password"
					name="password"
					error={errors?.password}
					onChange={valueOnChange}
				/>
				<PasswordInput
					label="Confirm Password"
					name="confirmPassword"
					error={errors?.confirmPassword}
					onChange={valueOnChange}
				/>
				<Flex className="w-full justify-end">
					<Text>
						Already have an account?{" "}
						<Link href="/login" className="text-blue-500 hover:underline">
							Login
						</Link>
						.
					</Text>
				</Flex>
				<Button type="submit" loading={loading}>
					Register
				</Button>
			</Stack>
		</form>
	);
}
