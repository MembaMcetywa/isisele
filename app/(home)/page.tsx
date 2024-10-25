"use client";

import { Button } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const navigateTo = () => {
    router.push("/login");
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex text-2xl gap-4 items-center justify-between h-full flex-col">
          <h3 className="text-2xl">Isisele</h3>
          <p className="text-sm font-light">
            The leading education platform for farmers.
          </p>
          <Button onClick={navigateTo}>Login</Button>
        </div>
      </main>
    </div>
  );
}
