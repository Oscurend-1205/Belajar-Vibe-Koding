import { Elysia } from "elysia";
import { connection } from "../db";

export const healthRoutes = new Elysia({ prefix: "/health" }).get(
  "/",
  async () => {
    try {
      await connection.query("SELECT 1");
      return {
        success: true,
        message: "Server is running",
        data: {
          status: "healthy",
          database: "connected",
          uptime: process.uptime(),
        },
      };
    } catch (error) {
      return {
        success: false,
        message: "Database connection failed",
        data: {
          status: "unhealthy",
          database: "disconnected",
        },
      };
    }
  },
);
