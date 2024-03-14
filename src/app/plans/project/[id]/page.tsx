"use client";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

function Page({}: Props) {
  const pathname = usePathname();
  const [, uuid] = pathname.split("/plans/");

  return <div>Here can be list of all Plans by specific project</div>;
}

export default Page;
