import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { healthRoutes } from "./routes/health";
import { userRoutes } from "./routes/users";

const port = Number(process.env.PORT) || 3000;

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: "Elysia API",
          version: "1.0.0",
          description: "REST API with ElysiaJS + Drizzle + MySQL",
        },
      },
    }),
  )
  .onError(({ code, error }) => {
    console.error(`[${code}]`, error);
    const msg =
      "message" in error ? (error as any).message : "Internal Server Error";
    return {
      success: false,
      message: msg,
      data: null,
    };
  })
  .use(healthRoutes)
  .use(userRoutes)
  .listen(port);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
console.log(
  `📖 Swagger docs at http://${app.server?.hostname}:${app.server?.port}/swagger`,
);
