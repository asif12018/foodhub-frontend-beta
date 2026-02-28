import { betterAuth } from "better-auth";
export const auth = betterAuth({
  database: {
    provider: "postgresql",
    url: "mock"
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user, ctx) => {
          console.log("context keys:", Object.keys(ctx || {}));
        }
      }
    }
  }
});
