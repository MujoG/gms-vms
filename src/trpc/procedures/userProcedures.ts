import { publicProcedure } from "../trpc";
import { z } from "zod";
import { cookies } from "next/headers";
import { decodeAuth } from "@/lib/auth";

export const getUserInfo = publicProcedure.query(async () => {
  try {
    const cookieStore = cookies();
    const hasCookie = cookieStore.has("user-token");

    const tokenFromCookies = cookieStore.get("user-token");

    if (!hasCookie) {
      console.log("No user token found.");
      return null;
    }

    const token = cookieStore.get("user-token")?.value;

    if (!token) {
      console.log("User token is invalid.");
      return null;
    }

    const decodedToken = await decodeAuth(token).catch((err) => {
      console.error("Error decoding user token:", err);
      return null;
    });

    if (!decodedToken || !decodedToken.CurrentUserID) {
      console.log("Invalid decoded token or missing CurrentUserID.");
      return null;
    }

    const userId = decodedToken.CurrentUserID;

    const url = `${process.env.GMS_GET_USER_BY_ID}${userId}`;

    console.log("Fetching user data for user ID:", userId);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${tokenFromCookies?.value}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch user data:", response.status);
      return null;
    }

    const data = await response.json();

    // console.log("Retrieved user data:", data);

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
});
