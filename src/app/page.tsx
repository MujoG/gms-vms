"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import Image from "next/image";

export default function Home() {
  const { data } = trpc.exampleApiRoute.useQuery();

  console.log("data", data);

  return (
    <main>
      <MaxWidthWrapper className="bg-red-500">
        wrapper childsssss
      </MaxWidthWrapper>
    </main>
  );
}
