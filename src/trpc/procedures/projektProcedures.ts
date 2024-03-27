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
