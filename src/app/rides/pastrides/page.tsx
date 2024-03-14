"use client";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Search, Undo2 } from "lucide-react";
import React, { useEffect } from "react";
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
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Props = {};

function Page({}: Props) {
  const [open, setOpen] = React.useState(false);

  const [selectedValue, setSelectedValue] = React.useState(undefined);

  const handleSelectChange = (value: any) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    console.log("value", selectedValue);
  }, [selectedValue]);

  const [date, setDate] = React.useState<Date>();

  return (
    <div className="mt-10 px-5">
      {/* <DialogWrapper open={open} onOpenChange={setOpen} />{" "} */}
      <div className="flex flex-col">
        <div className="flex mb-2 border-b border-zinc-300 pb-2">
          <div className="flex items-center uppercase opacity-70 font-semibold text-xl">
            {" "}
            Rides:
          </div>
          <div className="w-full  justify-end flex">
            <Button className="bg-[#47989c] text-white" variant="outline">
              Add new Ride
            </Button>
          </div>
        </div>
        <div className="flex mb-2 border-b border-zinc-300 pb-2">
          <div className="flex items-center uppercase opacity-70 font-semibold w-full">
            {" "}
            <div className="flex items-center">
              <span className="mr-5">Filter Rides by </span>
              <Select
                defaultValue={selectedValue}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="CHOOSE" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">DATE</SelectItem>
                  <SelectItem value="driver">DRIVER</SelectItem>
                  <SelectItem value="vehicle">VEHICLE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            {selectedValue === "date" ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            ) : selectedValue === "driver" ? (
              <Input placeholder="Driver Name" className="w-[200px]" />
            ) : selectedValue === "vehicle" ? (
              <Input placeholder="Vehicle" className="w-[200px]" />
            ) : null}
          </div>
          <div className="w-full  justify-end flex">
            <Button className="bg-[#47989c] text-white" variant="outline">
              <span>Filter</span> <Search className=" ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="w-full mt-10">
          <Table>
            <TableCaption>A list of Rides for All Vehicles.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Vehicle</TableHead>
                <TableHead className="w-[150px]">Start Date</TableHead>
                <TableHead className="w-[150px]">End Date</TableHead>
                <TableHead className="w-[150px]">Driver</TableHead>
                <TableHead className="w-[150px]">Start Location</TableHead>
                <TableHead className="w-[150px]">End Location</TableHead>
                <TableHead className="w-[200px]">Short Description</TableHead>
                <TableHead className="text-right w-[150px]">
                  Is Active?
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              <TableRow
                onClick={() => setOpen(!open)}
                className="cursor-pointer"
              >
                <TableCell className="font-medium">
                  <Link href="/vehicles/1">
                    <Button>Golf 7</Button>
                  </Link>
                </TableCell>
                <TableCell className="font-medium">10/10/2023</TableCell>
                <TableCell className="font-medium">10/10/2023</TableCell>
                <TableCell>Name Lastname</TableCell>
                <TableCell>Grebenau</TableCell>
                <TableCell>Grebenau</TableCell>
                <TableCell className="text-left">Going to messe</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={cn(
                      "bg-white",
                      true ? "bg-red-600" : "bg-green-500"
                    )}
                  >
                    {true ? "No" : "Yes"}{" "}
                  </Badge>
                </TableCell>
              </TableRow>
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
                <TableCell className="font-medium">10/10/2023</TableCell>
                <TableCell>Name Lastname</TableCell>
                <TableCell>Grebenau</TableCell>
                <TableCell>Grebenau</TableCell>
                <TableCell className="text-left">Going to baustelle</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={cn(
                      "bg-white",
                      true ? "bg-red-600" : "bg-green-500"
                    )}
                  >
                    {true ? "No" : "Yes"}{" "}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Page;
