"use client";
import CreateRideWrapper from "@/components/allaround/CreateRideWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { link } from "fs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};
const vehicles = [
  {
    id: 1,
    vehicle: "Golf 7",
    vehicleYear: "2015",
    registrationPlate: "F-AG 1243",
    mileage: 1234,
    inRide: false,
    vehicleData: {
      mileageMonth: 1250,
      gasMonth: "250e",
      ridesMonth: "5",
      costKm: "1.4E",
      inRide: false,
      image: "/golf.jpg",
    },
  },
  {
    id: 2,
    vehicle: "Golf 8",
    vehicleYear: "2020",
    registrationPlate: "F-AG 1243",
    mileage: 1234,
    inRide: false,
    vehicleData: {
      mileageMonth: 1250,
      gasMonth: "250e",
      ridesMonth: "5",
      costKm: "1.4E",
      inRide: false,
      image: "/golf.jpg",
    },
  },
  {
    id: 3,
    vehicle: "Golf 8",
    vehicleYear: "2020",
    registrationPlate: "F-AG 1243",
    mileage: 1234,
    inRide: false,
    vehicleData: {
      mileageMonth: 1250,
      gasMonth: "250e",
      ridesMonth: "5",
      costKm: "1.4E",
      inRide: false,
      image: "/golf.jpg",
    },
  },
  {
    id: 3,
    vehicle: "Golf 8",
    vehicleYear: "2020",
    registrationPlate: "F-AG 1243",
    mileage: 1234,
    inRide: false,
    vehicleData: {
      mileageMonth: 1250,
      gasMonth: "250e",
      ridesMonth: "5",
      costKm: "1.4E",
      inRide: true,
      image: "/golf.jpg",
    },
  },
];

function Page({}: Props) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <CreateRideWrapper open={open} onOpenChange={setOpen} />
      <div className="flex flex-col mt-10 md:mx-5 mx-2 relative">
        <div className="text-2xl mb-5 font-semibold opacity-80 text-center sm:hidden flex justify-center">
          VEHICLES
        </div>
        <ul className="w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-3 ">
          {vehicles.map((item) => (
            <li key={item.id} className="border p-2 rounded w-full bg-zinc-200">
              <div className="flex w-full justify-between items-center">
                <div className="text-xl px-4 py-2 font-semibold">
                  {item.vehicle} {item.vehicleYear}
                </div>
                <div className="border rounded bg-white font-bold w-fit px-4 text-sm flex items-center h-fit py-2">
                  {item.registrationPlate}
                </div>
              </div>

              <div>
                <div className="text-sm uppercase opacity-80">
                  Data for last 30 days:
                </div>
                <ul className="flex flex-col">
                  <li className="flex justify-between border-b border-zinc-300 pb-1">
                    <span>Mileage</span>
                    <span>{item.vehicleData.mileageMonth} Km</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-300 pb-1">
                    <span>Diesel</span>
                    <span>{item.vehicleData.gasMonth} E</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-300 pb-1">
                    <span>Rides</span>
                    <span>{item.vehicleData.ridesMonth} </span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-300 pb-1">
                    <span>Cost/Km</span>
                    <span>{item.vehicleData.costKm} </span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-300 pb-1">
                    <span>Car is available?</span>
                    <span>
                      <Badge
                        className={cn(
                          "bg-white",
                          item.vehicleData.inRide
                            ? "bg-red-600"
                            : "bg-green-500"
                        )}
                      >
                        {item.vehicleData.inRide ? "No" : "Yes"}{" "}
                      </Badge>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-2 flex justify-between">
                <Button
                  onClick={() => setOpen(!open)}
                  className="bg-[#47989c]"
                  disabled={item.vehicleData.inRide}
                >
                  Create Ride
                </Button>
                <Link href={`/vehicles/${item.id}`}>
                  <Button variant="outline">Check More</Button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Page;
