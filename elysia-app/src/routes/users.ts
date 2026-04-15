import { Elysia, t } from "elysia";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const userRoutes = new Elysia({ prefix: "/users" })

  // GET /users - Ambil semua user
  .get("/", async () => {
    const allUsers = await db.select().from(users);
    return {
      success: true,
      message: "Users fetched successfully",
      data: allUsers,
    };
  })

  // GET /users/:id - Ambil user by ID
  .get(
    "/:id",
    async ({ params }) => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, Number(params.id)));

      if (user.length === 0) {
        return {
          success: false,
          message: "User not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "User fetched successfully",
        data: user[0],
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    },
  )

  // POST /users - Buat user baru
  .post(
    "/",
    async ({ body }) => {
      const result = await db.insert(users).values({
        name: body.name,
        email: body.email,
        password: body.password,
      });

      return {
        success: true,
        message: "User created successfully",
        data: { id: Number(result[0].insertId) },
      };
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1 }),
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 6 }),
      }),
    },
  )

  // PUT /users/:id - Update user
  .put(
    "/:id",
    async ({ params, body }) => {
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.id, Number(params.id)));

      if (existing.length === 0) {
        return {
          success: false,
          message: "User not found",
          data: null,
        };
      }

      await db
        .update(users)
        .set({
          name: body.name,
          email: body.email,
          ...(body.password ? { password: body.password } : {}),
        })
        .where(eq(users.id, Number(params.id)));

      return {
        success: true,
        message: "User updated successfully",
        data: { id: Number(params.id) },
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        name: t.String({ minLength: 1 }),
        email: t.String({ format: "email" }),
        password: t.Optional(t.String({ minLength: 6 })),
      }),
    },
  )

  // DELETE /users/:id - Hapus user
  .delete(
    "/:id",
    async ({ params }) => {
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.id, Number(params.id)));

      if (existing.length === 0) {
        return {
          success: false,
          message: "User not found",
          data: null,
        };
      }

      await db.delete(users).where(eq(users.id, Number(params.id)));

      return {
        success: true,
        message: "User deleted successfully",
        data: null,
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    },
  );
