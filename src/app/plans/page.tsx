"use client";
import { PlaneDataTable } from "@/components/allaround/PlaneDataTable";
import React, { useEffect } from "react";

import { useCookies } from "next-client-cookies";

import { getCookie } from "cookies-next";

type Props = {};

function Page({}: Props) {
  const cookies = useCookies();

  const cookie = getCookie("user-token");

  console.log("test", cookies.get("user-token"));

  React.useEffect(() => {
    console.log("test", cookies.get("user-token"));
    console.log("cookie", cookie);
  }, [cookies]);

  return (
    <div>
      <PlaneDataTable />
    </div>
  );
}

export default Page;
