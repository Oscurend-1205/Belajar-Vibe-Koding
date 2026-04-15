import { Elysia } from "elysia";
import { connection } from "../db";

export const healthRoutes = new Elysia({ prefix: "/health" }).get(
  "/",
  async () => {
    try {
      await connection.query("SELECT 1");
      return { success: true, data: { status: "healthy" } };
    } catch (e) {
      return { success: false, data: { status: "unhealthy" } };
    }
  },
);
