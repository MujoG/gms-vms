"use client";

import React from "react";
import { usePathname } from "next/navigation";

type Props = {};

function Page({}: Props) {
  const pathname = usePathname();

  const [, , , uuid] = pathname.split("/");

  return <div>{uuid}</div>;
}

export default Page;
