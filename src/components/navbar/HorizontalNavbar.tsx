import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";

type Props = {
  showMenu: any;
  setShowMenu: any;
};

function HorizontalNavbar({ showMenu, setShowMenu }: Props) {
  const pathname = usePathname();

  const vehicleTabs = [
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
    {
      label: "services",
      href: "/vehicles/services",
    },
  ];

  const ridesTabs = [
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
  ];

  const noTabs: React.SetStateAction<any[] | undefined> = [];

  const [tabs, setTabs] = React.useState<any[]>();

  useEffect(() => {
    if (pathname.includes("vehicles")) {
      setTabs(vehicleTabs);
    } else if (pathname.includes("rides")) {
      setTabs(ridesTabs);
    } else if (pathname.includes("analytics")) {
      setTabs(noTabs);
    } else console.log("main page");
  }, [pathname]);

  return (
    <div className="bg-zinc-50 h-[48px] border-b border-zinc-300 sticky w-full flex items-center z-40">
      {/* desktop horizontal navbar */}

      <div className="mx-2 w-full hidden sm:flex justify-between ">
        <div>
          <ul className="flex gap-5">
            {tabs?.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>
                  <Button
                    variant={"link"}
                    className={`${
                      pathname === item.href
                        ? "underline text-bold bg-zinc-200"
                        : ""
                    } w-full uppercase`}
                  >
                    {item.label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* mobile horizontal navbar */}

      <div className="mx-2 w-full flex  sm:hidden justify-between h-full">
        <div className="h-full flex items-center">
          <Image
            src="/images/gmslogo.png"
            alt=""
            width={1000}
            height={1000}
            className="w-1/2"
          />
        </div>
        <div className="flex items-center">
          <Button
            variant={"link"}
            className="p-0 m-0"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Menu />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HorizontalNavbar;
