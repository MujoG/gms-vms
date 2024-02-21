"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HorizontalNavbar from "./HorizontalNavbar";
import {
  AudioWaveform,
  Car,
  ChevronsDown,
  ChevronsUpDown,
  LineChart,
  LogOut,
} from "lucide-react";
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { CollapsibleContent } from "../ui/collapsible";
import useMediaQuery, { useIsSmall } from "@/hooks/UseMediaQuery";

type Props = {
  children: React.ReactNode;
};

const barItems = [
  {
    label: "analytics",
    href: "/analytics",
    icon: <LineChart />,
  },
  {
    label: "vehicles",
    href: "/vehicles",
    icon: <Car />,
    tabs: [
      {
        label: "vehicles",
        href: "/vehicles",
      },
      {
        label: "available vehicles",
        href: "/vehicles/availablevehicles",
      },
      {
        label: "occupied vehicles",
        href: "/vehicles/occupiedvehicles",
      },
    ],
  },
  {
    label: "rides",
    href: "/rides",
    icon: <AudioWaveform />,
    tabs: [
      {
        label: "rides",
        href: "/rides",
      },
      {
        label: "active rides",
        href: "/rides/activerides",
      },
      {
        label: "past rides",
        href: "/rides/pastrides",
      },
    ],
  },
];

function Sidebar({ children }: Props) {
  const pathname = usePathname();

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const isSmall = useIsSmall();

  useEffect(() => {
    if (isSmall) {
      setShowMenu(false);
    }
  }, [pathname]);

  return (
    <div className="flex h-[100vh] relative">
      {/* sidebar  */}
      <div className=" hidden sm:flex flex-col w-[70px] lg:w-[310px] bg-zinc-100 h-[100vh]  p-2 border-r border-zinc-300 justify-between ">
        <div>
          <div className="pb-10">
            <Image
              src="/images/gmslogo.png"
              alt=""
              width={1000}
              height={1000}
              className="w-full flex h-[45px] object-contain"
            />
          </div>
          <div className="flex flex-col ">
            <ul className="flex flex-col gap-2">
              {barItems.map((item, index) => (
                <li
                  key={item.label}
                  className={`${item.href === pathname ? "" : "border-b "}`}
                >
                  <Link href={item.href}>
                    <Button
                      className={`${
                        pathname.includes(item.href)
                          ? "underline text-bold bg-zinc-300"
                          : ""
                      } w-full uppercase`}
                      variant="link"
                    >
                      <span className="lg:flex hidden mr-2"> {item.label}</span>{" "}
                      {item.icon}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col mb-5 justify-center items-center gap-2">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-blue-200">NL</AvatarFallback>
          </Avatar>
          <div className="flex lg:flex-row flex-col p-2 text-xs lg:text-normal">
            Name <span>LastName</span>
          </div>
          <div className="flex justify-center">
            <Button variant="destructive">
              <span className="mr-2 hidden lg:flex">LogOut</span> <LogOut />
            </Button>
          </div>
        </div>
      </div>

      {/* dropmenubar*/}

      {showMenu ? (
        <div className="absolute bg-zinc-50 inset w-full h-full z-10 pt-[48px]">
          <div className="m-2">
            <ul className="mt-10">
              {barItems.map((item, index) => (
                <li
                  key={item.label}
                  className={`${item.href === pathname ? "" : " "}`}
                >
                  <Link href={item.href}>
                    <Button
                      className={`${
                        pathname.includes(item.href)
                          ? "underline text-bold bg-zinc-300"
                          : ""
                      } w-full uppercase flex justify-between`}
                      variant="link"
                    >
                      <span className="mr-2"> {item.label}</span> {item.icon}
                    </Button>
                  </Link>
                  {item.tabs ? (
                    <ul className="flex flex-col gap-5 my-2 p-2 border rounded-sm">
                      {item.tabs?.map((item) => (
                        <li key={item.label}>
                          <Link href={item.href}>
                            <Button
                              variant={"link"}
                              className={`${
                                pathname === item.href
                                  ? "underline text-bold bg-zinc-200"
                                  : ""
                              } w-full uppercase flex justify-start`}
                            >
                              {item.label}
                            </Button>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="border-b"></div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {/* wrapper */}
      <div className="w-full">
        {pathname !== "/" ? (
          <HorizontalNavbar setShowMenu={setShowMenu} showMenu={showMenu} />
        ) : null}
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
