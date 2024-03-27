"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { trpc } from "@/trpc/client";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import PlanViewer from "@/components/planoverview/PlanViewer";
import Spinner from "@/components/allaround/Spinner";

// Import statements remain the same

type PageProps = {};

const directusApiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

const Page: React.FC<PageProps> = () => {
  const [imageBg, setImageBg] = useState<string | undefined>();
  const [details, setDetails] = useState<any[] | undefined>();
  const [loading, setLoading] = useState(true);
  const [planeId, setPlaneId] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const pathname = usePathname();
  const [, , uuid] = pathname.split("/");

  const queryClient = useQueryClient();

  console.log("uuuuiddd", uuid);

  // Using useQuery for fetching plane data
  const {
    data: postData,
    isLoading: isPostLoading,
    error: postError,
    refetch: refetchPost,
  } = trpc.postZipCode.useQuery(
    { Id: "a4ac4968-6ca7-41c1-83e9-f2796f7142b5" },
    {
      enabled: !!uuid, // Only enable the query if uuid is truthy
      onSuccess: (data) => {
        console.log("Query successful:", data);
        if (data && data.data) {
          setPlaneId(data.data.id);
          const imageHref = `${directusApiUrl}assets/${data.data.PlaneFile}`;
          setImageBg(imageHref);

          // Invalidate the query here, after getting the new data
          queryClient.invalidateQueries(["getOnePlane", { id: uuid }]);
        }
      },
      onError: (error) => {
        setError("Error loading plane data");
        console.error("Error from query postZipCode:", error);
      },
    }
  );

  // Using useQuery for fetching details data
  const {
    data: listOfDetails,
    isLoading: isDetailsLoading,
    error: detailsError,
    refetch: refetchDetails,
  } = trpc.getArrayOfPlaneDetails.useQuery(
    { Id: planeId || "" },
    {
      enabled: !!planeId,
      onSuccess: (detailsData) => {
        setDetails(detailsData.data.Details);
      },
      onError: (error) => {
        setError("Error loading details");
        console.error("Error from query getArrayOfPlaneDetails:", error);
      },
    }
  );

  const handleRefetch = async () => {
    await refetchDetails();
  };

  useEffect(() => {
    handleRefetch();
  }, [uuid]);

  return (
    <div className="">
      {(isPostLoading || isDetailsLoading) && (
        <>
          <Spinner />
        </>
      )}
      {postError && <p>Error loading plane data</p>}
      {detailsError && <p>Error loading details</p>}
      {imageBg && (
        <>
          <PlanViewer
            imageUrl={imageBg}
            oldPins={details}
            detailsData={details}
            planeId={planeId}
            handleRefatch={handleRefetch}
          />
        </>
      )}
      {!isPostLoading &&
        !isDetailsLoading &&
        !postError &&
        !detailsError &&
        !imageBg && (
          <>
            <Spinner />
          </>
        )}
    </div>
  );
};

export default Page;
