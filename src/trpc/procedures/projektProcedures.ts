import { cookies } from "next/headers";
import { publicProcedure } from "../trpc";

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
    console.log("m ujo", listOfProjects);
    return listOfProjects;
  } catch (error) {
    console.error("Error occurred:", error);
    return error;
  }
});
