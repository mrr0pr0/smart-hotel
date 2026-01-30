import { eq } from 'drizzle-orm'
import { users } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { email, password } = body

        if (!email || !password) {
            throw createError({
                statusCode: 400,
                message: 'Email and password are required'
            })
        }

        // Find user by email
        const user = await db.select().from(users).where(eq(users.email, email)).limit(1)

        if (!user.length) {
            throw createError({
                statusCode: 401,
                message: 'Invalid credentials'
            })
        }

        // In production, use proper password hashing (bcrypt)
        // For now, simple comparison
        if (user[0].password !== password) {
            throw createError({
                statusCode: 401,
                message: 'Invalid credentials'
            })
        }

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user[0]

        return {
            success: true,
            user: userWithoutPassword
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Login failed'
        })
    }
})