import { publicProcedure, router } from "./trpc";
import { cookies } from 'next/headers'
import { z } from "zod";

export const appRouter = router({
    exampleApiRoute: publicProcedure.query(() => {
        return 'hello motherfucker'
    }),
    getAllProjects: publicProcedure.query(()=>{
        return "array"
    }),
    postZipCode: publicProcedure
    .input(z.object({ Id: z.string() }))
    .query(async ({ input }) => {
    let fetchedData = null;

      console.log('input')
      console.log(input, 'the input');

      try {
        const url = `${process.env.DIRECTUS_API_URL}items/Plane/${input.Id}`;
  
        const response = await fetch(url, {
          method: "GET",
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const data = await response.json();
  
        console.log("Retrieved data:", data);
        fetchedData = data;
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
  
        return error;
      }
    }),
    getProjects: publicProcedure.query(async () => {
        let fetchedData = null;
    
        try {
          const url = "http://localhost:8055/items/Project";
    
          const cookieStore = cookies()
          const tokenFromCookies = cookieStore.get('user-token')
    
          // console.log('tokenFromCookies', tokenFromCookies?.value)
    
    
    
    
          const response = await fetch(url as string, {
            method: "GET",
            // headers: {
            //   authorization: `Bearer ${tokenFromCookies?.value}`,
    
            // },
          });
    
    
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
    
    
          const data = await response.json();
    
          // console.log("Retrieved data:", data);
          fetchedData = data
          return data;
        } catch (error) {
          // console.error("Error fetching datssssa:", error);
    
          return error
        }
    
        // return {
        //   message:
        //   {'data':fetchedData}
        // }
      }),

      getPlanes: publicProcedure.query(async () => {
        let fetchedData = null;
    
        try {
          const url = process.env.DIRECTUS_API_URL + 'items/Plane';
    
          const cookieStore = cookies()
          const tokenFromCookies = cookieStore.get('user-token')
    
          console.log('tokenFromCookies', tokenFromCookies?.value)
    
    
    
    
          const response = await fetch(url as string, {
            method: "GET",
            // headers: {
            //   authorization: `Bearer ${tokenFromCookies?.value}`,
    
            // },
          });
    
    
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
    
    
          const data = await response.json();
    
          // console.log("Retrieved data:", data);
          fetchedData = data
          return data;
        } catch (error) {
          // console.error("Error fetching datssssa:", error);
    
          return error
        }
    
      }),


  getOnePlane: publicProcedure
  .input(z.object({
    id: z.string(), // Adjust the schema based on your input requirements
  }))
  .mutation(async ({ input }: any) => {
    let fetchedData = null;

    console.log(input, 'the input');

    try {
      const url = `${process.env.DIRECTUS_API_URL}items/Plane/${input.id}`;

      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      console.log("Retrieved data:", data);
      fetchedData = data;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);

      return error;
    }
  }),



  getPlaneDetails: publicProcedure
  .input(z.object({
    planeId: z.string(),
  }))
  .mutation(async ({ input }: any) => {
    let fetchedData = null;
    try {
      const url = `${process.env.DIRECTUS_API_URL}items/Plane/${input.planeId}?fields=Details.*`;

      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      console.log("Retrieved data:", JSON.stringify(data));
      fetchedData = data;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);

      return error;
    }
  }),

  getArrayOfPlaneDetails: publicProcedure
  .input(z.object({ Id: z.string() }))
  .query(async ({ input }) => {
  let fetchedData = null;

    console.log('input')
    console.log(input, 'the input');

    try {
      const url = `${process.env.DIRECTUS_API_URL}items/Plane/${input.Id}?fields=Details.*`;

      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      console.log("Retrieved data:", data);
      fetchedData = data;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);

      return error;
    }
  }),

  createNewDetail: publicProcedure
  .input(z.object({
    newPin: z.object({
      X: z.number(),
      Y: z.number(),
      X2: z.number(),
      Y2: z.number(),
      DetailType: z.string(),
      DetailLabel: z.string(),
      DetailDirection: z.string(),
      PlaneId : z.string(),
    }),
  }))
  .mutation(async ({ input }: any) => {
    const { newPin } = input;


    console.log(newPin,'newpin')

    try {
      const url = `${process.env.DIRECTUS_API_URL}items/Detail`; // Adjust the endpoint based on your API

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers, like authorization if needed
        },
        body: JSON.stringify({
          X: newPin.X,
          Y: newPin.Y,
          X2: newPin.X2,
          Y2: newPin.Y2,
          DetailType: newPin.DetailType,
          DetailLabel: newPin.DetailLabel,
          PlaneId:newPin.PlaneId,
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
  }),
})

export type AppRouter = typeof appRouter