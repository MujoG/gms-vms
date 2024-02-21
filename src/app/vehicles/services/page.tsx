"use client";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import React from "react";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import DialogWrapper from "@/components/allaround/DialogWrapper";
import Link from "next/link";

type Props = {};

function Page({}: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="mt-10 px-5">
      <DialogWrapper open={open} onOpenChange={setOpen} />{" "}
      <div className="flex flex-col">
        <div className="flex mb-2 border-b border-zinc-300 pb-2">
          <div className="flex items-center uppercase opacity-70 font-semibold text-xl">
            {" "}
            Services:
          </div>
          <div className="w-full  justify-end flex">
            <Button variant="outline">Add new Service</Button>
          </div>
        </div>
        <div className="w-full">
          <Table>
            <TableCaption>A list of Services for All Vehicles.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Vehicle</TableHead>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead className="w-[200px]">Responsibile Person</TableHead>
                <TableHead className="w-[200px]">
                  Last Service Mileage (Km)
                </TableHead>
                <TableHead className="w-[200px]">Short Description</TableHead>
                <TableHead className="text-right">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              <TableRow
                onClick={() => setOpen(!open)}
                className="cursor-pointer"
              >
                <TableCell className="font-medium">
                  <Link href="/vehicles/1">
                    <Button>Golf 8</Button>
                  </Link>
                </TableCell>
                <TableCell className="font-medium">10/10/2023</TableCell>
                <TableCell>Name Lastname</TableCell>
                <TableCell>125412</TableCell>
                <TableCell className="text-left">
                  Engine Oil change, brakes, and add winter wheels
                </TableCell>
                <TableCell className="text-right">250.00 E</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Page;
