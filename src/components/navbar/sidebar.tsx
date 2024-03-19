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
  FolderKanban,
  FolderOpenDot,
  LineChart,
  LogOut,
} from "lucide-react";
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { CollapsibleContent } from "../ui/collapsible";
import useMediaQuery, { useIsSmall } from "@/hooks/UseMediaQuery";
import { trpc } from "@/trpc/client";
import Spinner from "../allaround/Spinner";

type Props = {
  children: React.ReactNode;
};

const iconClass = "w-[18px] h-[18px]";

const barItems = [
  {
    label: "analytics",
    href: "/analytics",
    icon: <LineChart className={iconClass} />,
  },
  {
    label: "projekt",
    href: "/projekt",
    icon: <FolderOpenDot className={iconClass} />,
  },
  {
    label: "plans",
    href: "/plans",
    icon: <FolderKanban className={iconClass} />,
    tabs: [
      {
        label: "plane finder",
        href: "/plans",
      },
      {
        label: "plane by project",
        href: "/plans/project",
      },
    ],
  },
];

function Sidebar({ children }: Props) {
  const pathname = usePathname();

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const isSmall = useIsSmall();

  const hiddenRoutes = ["/", "/expired"];
  const isHiddenRoute = hiddenRoutes.includes(pathname);

  const { data, isError, isLoading } = trpc.getUserInfo.useQuery();

  const initials = data
    ? `${data.vorname.charAt(0)}${data.nachname.charAt(0)}`
    : "";

  useEffect(() => {
    if (data) {
      console.log("data", data);
    }
  }, [data]);

  useEffect(() => {
    if (isSmall) {
      setShowMenu(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname.includes("/expired")) {
      console.log("expired");
    }
  }, [pathname]);

  return (
    <div className="flex h-[100vh] relative">
      {/* sidebar  */}

      {!isHiddenRoute ? (
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
                        } w-full uppercase text-xs flex justify-between`}
                        variant="link"
                      >
                        <span className="lg:flex hidden mr-2">
                          {" "}
                          {item.label}
                        </span>{" "}
                        {item.icon}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {data ? (
            <div className="flex flex-col mb-5 justify-center items-center gap-2">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-blue-200">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex lg:flex-row flex-col p-2 text-xs lg:text-normal">
                {data.vorname} <span>{data.nachname}</span>
              </div>
              {/* <div className="flex justify-center">
                <Button variant="destructive">
                  <span className="mr-2 hidden lg:flex">LogOut</span> <LogOut />
                </Button>
              </div> */}
            </div>
          ) : (
            <div className="relative">
              <Spinner />
            </div>
          )}
        </div>
      ) : null}

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
      <div className="w-full relative">
        {!isHiddenRoute ? (
          <HorizontalNavbar setShowMenu={setShowMenu} showMenu={showMenu} />
        ) : null}
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
