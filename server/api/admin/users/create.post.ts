import { users } from "~/server/database/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    
    const { name, email, password, phone, role, department, shift } = body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      throw createError({
        statusCode: 400,
        message: "Missing required fields: name, email, password, role",
      });
    }

    // Check if email already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      throw createError({
        statusCode: 409,
        message: "User with this email already exists",
      });
    }

    // TODO: Hash password before storing in production
    //
    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        password, // In production: await hash(password)
        phone: phone || null,
        role,
        department: department || null,
        shift: shift || null,
        status: "active",
      })
      .returning();

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser[0];

    return {
      success: true,
      data: userWithoutPassword,
      message: "User created successfully",
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to create user",
    });
  }
});