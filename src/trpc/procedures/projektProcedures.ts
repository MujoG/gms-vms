import { cookies } from "next/headers";
import { publicProcedure } from "../trpc";
import { z } from "zod";

export const getAllProjects = publicProcedure.query(async () => {
  let fetchedData = null;

  try {
    const url = process.env.GMS_GET_PROJECTS;

    // const url = process.env.DIRECTUS_API_URL + "items/Plane";

    const cookieStore = cookies();
    const tokenFromCookies = cookieStore.get("user-token");

    const response = await fetch(url as string, {
      method: "GET",
      headers: {
        authorization: `Bearer ${tokenFromCookies?.value}`,
      },
    });

    if (!response.ok) {
      console.log("erroorr");
      throw new Error("Failed to fetch data");
    }

    const listOfProjects = await response.json();

    fetchedData = listOfProjects;
    return listOfProjects;
  } catch (error) {
    console.error("Error occurred:", error);
    return error;
  }
});

export const getOverviewPlanes = publicProcedure
  .input(z.object({ project: z.string() }))
  .query(async ({ input }) => {
    let fetchedData = null;

    try {
      const url = process.env.GMS_GET_OVERVIEW_BY_PROJECT + input.project;

      // const url = process.env.DIRECTUS_API_URL + "items/Plane";

      const cookieStore = cookies();
      const tokenFromCookies = cookieStore.get("user-token");

      const response = await fetch(url as string, {
        method: "GET",
        headers: {
          authorization: `Bearer ${tokenFromCookies?.value}`,
        },
      });

      if (!response.ok) {
        console.log("erroorr");
        throw new Error("Failed to fetch data");
      }

      const listOfOverviewsOnProject = await response.json();

      fetchedData = listOfOverviewsOnProject;
      return listOfOverviewsOnProject;
    } catch (error) {
      console.error("Error occurred:", error);
      return error;
    }
  });

export const getOverviewById = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    let fetchedData = null;

    try {
      const url = process.env.GMS_GET_OVERVIEW_BY_ID + input.id;

      console.log("r", url);

      // const url = process.env.DIRECTUS_API_URL + "items/Plane";

      const cookieStore = cookies();
      const tokenFromCookies = cookieStore.get("user-token");

      const response = await fetch(url as string, {
        method: "GET",
        headers: {
          authorization: `Bearer ${tokenFromCookies?.value}`,
        },
      });

      if (!response.ok) {
        console.log("erroorr");
        throw new Error("Failed to fetch data");
      }

      const listOfOverviewsOnProject = await response.json();

      fetchedData = listOfOverviewsOnProject;
      return listOfOverviewsOnProject;
    } catch (error) {
      console.error("Error occurred:", error);
      return error;
    }
  });

export const getPinsByOverViewID = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    let fetchedData = null;

    try {
      const url = process.env.GMS_GET_ALLLPINS_BY_OVERVIEW_ID + input.id;

      console.log("r", url);

      // const url = process.env.DIRECTUS_API_URL + "items/Plane";

      const cookieStore = cookies();
      const tokenFromCookies = cookieStore.get("user-token");

      const response = await fetch(url as string, {
        method: "GET",
        headers: {
          authorization: `Bearer ${tokenFromCookies?.value}`,
        },
      });

      if (!response.ok) {
        console.log("erroorr");
        throw new Error("Failed to fetch data");
      }

      const listOfOverviewsOnProject = await response.json();

      fetchedData = listOfOverviewsOnProject;
      return listOfOverviewsOnProject;
    } catch (error) {
      console.error("Error occurred:", error);
      return error;
    }
  });

export const createNewDetailPin = publicProcedure
  .input(
    z.object({
      newPin: z.object({
        x1coordinate: z.number(),
        y1coordinate: z.number(),
        x2coordinate: z.number(),
        y2coordinate: z.number(),
        pinType: z.string(),
        description: z.string(),
        iconType: z.string(),
        overviewPlanID: z.number(),
        referenceId: z.number(),
      }),
    })
  )
  .mutation(async ({ input }: any) => {
    const { newPin } = input;

    const cookieStore = cookies();
    const tokenFromCookies = cookieStore.get("user-token");

    console.log("testtest", newPin);

    try {
      const url = `${process.env.GMS_SET_NEW_PIN}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenFromCookies?.value}`,
          // Add any other headers, like authorization if needed
        },
        body: JSON.stringify({
          overviewPlanID: newPin.overviewPlanID,
          refernceType: 2,
          referenceId: newPin.referenceId,
          pinType: newPin.pinType,
          iconType: newPin.iconType,
          comment: newPin.description,
          x1coordinate: newPin.x1coordinate,
          y1coordinate: newPin.y1coordinate,
          x2coordinate: newPin.x2coordinate,
          y2coordinate: newPin.y2coordinate,
          direction: null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create new detail");
      }

      const data = await response.json();

      // console.log("Created new detail:", data);
      return data;
    } catch (error) {
      console.error("Error creating new detail:", error);

      return error;
    }
  });

export const getPlanWerkByProject = publicProcedure
  .input(z.object({ project: z.string() }))
  .query(async ({ input }) => {
    let fetchedData = null;

    try {
      const url = process.env.GMS_GET_ALL_REFERENCE_BY_ID + input.project;

      console.log("GMS_GET_ALL_REFERENCE_BY_ID", url);

      // const url = process.env.DIRECTUS_API_URL + "items/Plane";

      const cookieStore = cookies();
      const tokenFromCookies = cookieStore.get("user-token");

      const response = await fetch(url as string, {
        method: "GET",
        headers: {
          authorization: `Bearer ${tokenFromCookies?.value}`,
        },
      });

      if (!response.ok) {
        console.log("erroorr");
        throw new Error("Failed to fetch data");
      }

      const listOfOverviewsOnProject = await response.json();

      fetchedData = listOfOverviewsOnProject;
      return listOfOverviewsOnProject;
    } catch (error) {
      console.error("Error occurred:", error);
      return error;
    }
  });
