import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    exampleApiRoute: publicProcedure.query(() => {
        return 'hello'
    })
})

export type AppRouter = typeof appRouter