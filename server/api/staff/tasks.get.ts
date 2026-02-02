import { eq } from "drizzle-orm";
import { tasks, users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const status = query.status as string | undefined;
    const assignedTo = query.assignedTo
      ? parseInt(query.assignedTo as string)
      : undefined;

    let tasksQuery = db.select().from(tasks);

    if (status) {
      tasksQuery = tasksQuery.where(eq(tasks.status, status as any));
    }

    if (assignedTo) {
      tasksQuery = tasksQuery.where(eq(tasks.assignedTo, assignedTo));
    }

    const allTasks = await tasksQuery;

    // Fetch assigned user details
    const tasksWithUsers = await Promise.all(
      allTasks.map(async (task) => {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.id, task.assignedTo))
          .limit(1);
        return {
          ...task,
          assignedUser: user[0]
            ? { id: user[0].id, name: user[0].name, role: user[0].role }
            : null,
        };
      }),
    );

    return {
      success: true,
      data: tasksWithUsers,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || "Failed to fetch tasks",
    });
  }
});
