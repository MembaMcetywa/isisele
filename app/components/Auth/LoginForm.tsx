"use client";
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
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { z, ZodError } from "zod";

import { supabaseClient } from "@/app/helpers/supabase/client";

type FormInput = {
	email: string;
	password: string;
};

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export default function LoginForm() {
	const [formError, setFormError] = useState("");
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const [loading, { open: startLoader, close: stopLoader }] =
		useDisclosure(false);

	const router = useRouter();

	const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrors({});
		const formData = new FormData(e.currentTarget);
		const values = Object.fromEntries(formData.entries()) as FormInput;

		startLoader();

		try {
			const validatedData = loginSchema.parse(values);

			const { error } = await supabaseClient.auth.signInWithPassword(
				validatedData
			);

			if (error) {
				throw error.message;
			}

			router.push("/dashboard");
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
		<form onSubmit={submitLogin} className="bg-white">
			{formError && (
				<Text c="red" className="text-red-500 text-center">
					{formError}!
				</Text>
			)}
			<Stack>
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
				<Flex className="w-full justify-end">
					<Text>
						Don&apos;t have an account?{" "}
						<Link href="/register" className="text-blue-500 hover:underline">
							Register
						</Link>
						.
					</Text>
				</Flex>
				<Button type="submit" loading={loading}>
					Login
				</Button>
			</Stack>
		</form>
	);
}
