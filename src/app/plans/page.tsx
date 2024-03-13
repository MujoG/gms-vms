"use client";
import { PlaneDataTable } from "@/components/allaround/PlaneDataTable";
import { trpc } from "@/trpc/client";
import React from "react";

type Props = {};

// ovdje hocu da uzimam datu za tabelu

function Page({}: Props) {
  const { data } = trpc.getPlanes.useQuery();

  console.log("data", data);
  return (
    <div>
      <PlaneDataTable />
    </div>
  );
}

export default Page;
