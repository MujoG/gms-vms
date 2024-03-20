"use client";
import ElementList from "@/components/allaround/ElementList";
import Spinner from "@/components/allaround/Spinner";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import React from "react";

type Props = {};

function Projekt({}: Props) {
  const { data: projekts, isLoading, isError } = trpc.getAllProjects.useQuery();

  React.useEffect(() => {}, []);

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="h-[100%] overflow-y-auto -mt-[48px]">
      <div className="text-center ">
        <div className="w-full">
          {/* News posts */}
          <div className="z-10 sm:mt-16">
            <ElementList data={projekts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projekt;
