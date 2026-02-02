import { eq } from "drizzle-orm";
import { users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, email, password, phone, role, department } = body;

    if (!name || !email || !password) {
      throw createError({
        statusCode: 400,
        message: "name, email, password are required",
      });
    }

    // check if user exist
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length) {
      throw createError({
        statusCode: 409,
        message: "User already exists",
      });
    }

    // create new user
    //TODO hash the password with bcrypt
    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        password, //TODO hash password
        phone: phone || null,
        role: role || "receptionist",
        department: department || null,
        status: "active",
      })
      .returning();

    // remove password from response
    const { password: _, ...userWithoutPassword } = newUser[0];

    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "registration failed",
    });
  }
});
