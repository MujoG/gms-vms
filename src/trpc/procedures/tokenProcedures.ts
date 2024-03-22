import { cookies } from "next/headers";
import { publicProcedure } from "../trpc";
import { z } from "zod";

export const checkTokenExistence = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    console.log("input", input.id);

    const cookieStore = cookies();

    try {
      const hasCookie = cookieStore.get(input.id);

      if (hasCookie) {
        console.log("there is cookie");

        return hasCookie;
      } else return false;
    } catch {
      console.log("there is some problem");
    }
  });
