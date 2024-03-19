"use client";
import ElementList from "@/components/allaround/ElementList";
import Spinner from "@/components/allaround/Spinner";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import React from "react";

type Props = {};

function Projekt({}: Props) {
  const { data: projekts, isLoading, isError } = trpc.getAllProjects.useQuery();

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
    <div>
      {/* Render your data here */}
      {/* <ul>
        {projekts.map((item:any) => (
          <li key={item.id}>{item.projektBezeichnung}</li>
        ))}
      </ul> */}
      <div className="text-center mt-20 mb-5">
        <div className="w-full">
          <div className="flex flex-col bg-ng-blue">
            <div className="flex flex-col">
              {/* Desktop header */}
              <h1 className="hidden md:block md:text-3xl uppercase font-bolder tracking-tightest leading-[100px]">
                Projekts
              </h1>
              {/* Mobile header */}
              <div className="flex flex-col font-light tracking-tightest leading-[50px] mt-16 mb-10 md:hidden">
                <h1 className="text-[50px] tracking-tightest">Projekts</h1>
              </div>
              {/* <TabMenu /> */}
            </div>
          </div>
          {/* Blog posts */}
          {/* <div className="z-20">
        {isLoading ? <LoadingSpinner /> : data && <BlogPosts data={data} />}
      </div> */}

          {/* News posts */}
          <div className="z-20 sm:mt-10">
            <ElementList data={projekts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projekt;
