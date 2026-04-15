import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { healthRoutes } from "./routes/health";
import { userRoutes } from "./routes/users";

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .onError(({ code, error }) => {
    return { success: false, message: error.message };
  })
  .use(healthRoutes)
  .use(userRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
