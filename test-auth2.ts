import { betterAuth } from "better-auth";
export const auth = betterAuth({
  database: { provider: "postgresql", url: "mock" },
  databaseHooks: {
    user: {
      create: {
        after: async (user, ctx) => {
          console.log("context:", Object.keys(ctx || {}));
          // console.log("request:", ctx.request); // would this work?
        }
      }
    }
  }
});
