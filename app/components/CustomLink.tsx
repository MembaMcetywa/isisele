import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React from "react";

interface Props {
	href: Url;
	label: string;
}

export default function CustomLink({ href, label }: Props) {
	return (
		<Link href={href} className="text-blue-500 hover:underline">
			{label}
		</Link>
	);
}
