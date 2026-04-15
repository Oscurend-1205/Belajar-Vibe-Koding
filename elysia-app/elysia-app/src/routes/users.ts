import { Elysia, t } from "elysia";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const userRoutes = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    const allUsers = await db.select().from(users);
    return { success: true, message: "Users fetched", data: allUsers };
  })
  .get(
    "/:id",
    async ({ params }) => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, Number(params.id)));
      return {
        success: user.length > 0,
        message: user.length > 0 ? "User fetched" : "Not found",
        data: user[0] || null,
      };
    },
    { params: t.Object({ id: t.String() }) },
  )
  .post(
    "/",
    async ({ body }) => {
      const result = await db.insert(users).values(body);
      return {
        success: true,
        message: "User created",
        data: { id: Number(result[0].insertId) },
      };
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    },
  );
