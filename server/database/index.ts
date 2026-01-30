import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from './schema'

const config = useRuntimeConfig()

// Initialize Neon client
const sql = neon(config.databaseUrl)

// Initialize Drizzle ORM
export const db = drizzle(sql, { schema })

// Export schema for use in queries
export * from './schema'