import { eq } from 'drizzle-orm'
import { users } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const role = query.role as string | undefined

    let usersQuery = db.select().from(users)

    if (role) {
      usersQuery = usersQuery.where(eq(users.role, role as any))
    }

    const allUsers = await usersQuery

    // Remove passwords from response
    const usersWithoutPasswords = allUsers.map(({ password, ...user }) => user)

    return {
      success: true,
      data: usersWithoutPasswords
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch users'
    })
  }
})