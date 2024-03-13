"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { trpc } from "@/trpc/client";

import { Button } from "@/components/ui/button";
import PlanViewer from "@/components/planoverview/PlanViewer";
import { useQueryClient } from "@tanstack/react-query";

type PageProps = {};

const directusApiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

const Page: React.FC<PageProps> = ({}) => {
  const [imageBg, setImageBg] = useState<string | undefined>();
  const [details, setDetails] = useState<any[] | undefined>();
  const [loading, setLoading] = useState(true);
  const [planeId, setPlaneId] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const { mutate: getOnePlane, isError: isOnePlaneError } =
    trpc.getOnePlane.useMutation();
  const { mutate: getPlaneDetails, isError: isDetailsError } =
    trpc.getPlaneDetails.useMutation();

  const pathname = usePathname();
  const [, uuid] = pathname.split("/plans/");

  const queryClient = useQueryClient();

  const handlePostNewDetail = async () => {
    // Add your logic to post a new detail here
  };

  useEffect(() => {
    if (uuid) {
      getOnePlane(
        { id: uuid },
        {
          onSuccess: (data) => {
            setLoading(false);
            if (data && data.data) {
              setPlaneId(data.data.id);
              const imageHref = `${directusApiUrl}assets/${data.data.PlaneFile}`;
              setImageBg(imageHref);

              getPlaneDetails(
                { planeId: data.data.id },
                {
                  onSuccess: (detailsData) => {
                    setDetails(detailsData.data.Details);
                  },
                  onError: (error) => {
                    setError("Error loading details");
                    console.error("Error from mutate getPlaneDetails:", error);
                  },
                }
              );

              // Invalidate the query here, after getting the new data
              queryClient.invalidateQueries(["getOnePlane", { id: uuid }]);
            }
          },
          onError: (error) => {
            setLoading(false);
            setError("Error loading plane data");
            console.error("Error from mutate getOnePlane:", error);
          },
        }
      );
    }
  }, [uuid, queryClient]);

  useEffect(() => {
    console.log(planeId, "ovo jeplane ide");
  }, [planeId]);

  return (
    <div className="bg-red-200">
      {loading && <p>Loading...</p>}
      {isOnePlaneError && <p>Error loading plane data</p>}
      {isDetailsError && <p>Error loading details</p>}
      {imageBg && (
        <>
          <PlanViewer
            imageUrl={imageBg}
            oldPins={details}
            detailsData={details}
            planeId={planeId}
          />
          <Button onClick={handlePostNewDetail}>dsadsa</Button>
        </>
      )}
      {!loading && !isOnePlaneError && !isDetailsError && !imageBg && (
        <p>No image available</p>
      )}
    </div>
  );
};

export default Page;
