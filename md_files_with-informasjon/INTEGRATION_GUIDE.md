# Neon Database Integration Guide

This guide explains how to integrate the Smart Hotel Management System with your Neon PostgreSQL database.

## Files Created/Modified for Database Integration

### Configuration Files
1. ✅ `.env.example` - Template for environment variables
2. ✅ `.env` - Your actual environment variables (add your credentials here)
3. ✅ `.gitignore` - Updated to exclude .env from git
4. ✅ `drizzle.config.ts` - Drizzle ORM configuration
5. ✅ `nuxt.config.ts` - Updated with database runtime config

### Database Files
6. ✅ `server/database/schema.ts` - Complete database schema with all tables
7. ✅ `server/database/index.ts` - Database connection setup
8. ✅ `server/utils/db.ts` - Database utility exports

### API Endpoints Created
9. ✅ `server/api/rooms/index.get.ts` - Get all rooms
10. ✅ `server/api/rooms/[id].get.ts` - Get room by ID
11. ✅ `server/api/rooms/index.post.ts` - Create new room
12. ✅ `server/api/bookings/index.get.ts` - Get all bookings
13. ✅ `server/api/bookings/index.post.ts` - Create new booking
14. ✅ `server/api/menu/index.get.ts` - Get menu items
15. ✅ `server/api/orders/index.get.ts` - Get all orders
16. ✅ `server/api/orders/index.post.ts` - Create new order
17. ✅ `server/api/users/index.get.ts` - Get all users
18. ✅ `server/api/tasks/index.get.ts` - Get all tasks

### Documentation
19. ✅ `README.md` - Complete project documentation
20. ✅ `INTEGRATION_GUIDE.md` - This file

## Step-by-Step Integration Instructions

### Step 1: Get Your Neon Database Credentials

1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Sign up or log in
3. Create a new project
4. Create a new database
5. Copy your connection string (it looks like this):
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

### Step 2: Configure Environment Variables

1. Open the `.env` file in the root directory
2. Replace the placeholder with your actual Neon connection string:
   ```env
   DATABASE_URL="postgresql://your-actual-connection-string-here"
   API_SECRET="change-this-to-a-secure-random-string"
   ```

### Step 3: Install Database Dependencies

Dependencies are already added to package.json. Just run:

```bash
pnpm install
```

This installs:
- `@neondatabase/serverless` - Neon database driver
- `drizzle-orm` - TypeScript ORM
- `drizzle-kit` - Database migration tool

### Step 4: Create Database Tables

Run these commands to create all tables in your Neon database:

```bash
# Generate migration files from schema
pnpm drizzle-kit generate:pg

# Push schema to your Neon database
pnpm drizzle-kit push:pg
```

This creates these tables:
- `users` - Staff and admin accounts
- `rooms` - Hotel rooms
- `guests` - Guest information
- `bookings` - Reservations
- `menu_items` - Restaurant menu
- `orders` - Restaurant and room service orders
- `tasks` - Staff tasks
- `activity_log` - System activity

### Step 5: Verify Database Connection

Start the development server:

```bash
pnpm run dev
```

Test the API endpoints:

```bash
# Test rooms endpoint
curl http://localhost:3000/api/rooms

# Test bookings endpoint
curl http://localhost:3000/api/bookings

# Test menu endpoint
curl http://localhost:3000/api/menu
```

### Step 6: Use Drizzle Studio (Optional)

Drizzle Studio provides a visual interface to manage your database:

```bash
pnpm drizzle-kit studio
```

This opens a web interface where you can:
- View all tables
- Add/edit/delete records
- Run queries
- Manage relationships

## Database Schema Overview

### Users Table
Stores staff and admin accounts with roles and departments.

### Rooms Table
Contains room information including:
- Room number, type, floor
- Price, capacity, size
- Status (available, occupied, maintenance)
- Features and amenities

### Guests Table
Guest information for bookings:
- Name, email, phone
- Address and ID number

### Bookings Table
Reservation records with:
- Guest and room references
- Check-in/out dates
- Payment information
- Status tracking

### Menu Items Table
Restaurant menu with:
- Name, description, category
- Price and availability
- Image URL

### Orders Table
Restaurant and room service orders:
- Type (restaurant/room-service)
- Location (room/table number)
- Items (JSON)
- Status and assignment

### Tasks Table
Staff task management:
- Title, description, location
- Priority and status
- Assignment and due time

### Activity Log Table
System activity tracking for auditing.

## API Integration in Frontend

### Example: Fetching Rooms

Replace mock data in your components:

```typescript
// Before (mock data)
const rooms = ref([
  { id: 1, number: '101', type: 'Single', price: 89 }
])

// After (API call)
const { data: rooms } = await useFetch('/api/rooms')
```

### Example: Creating a Booking

```typescript
const createBooking = async (bookingData) => {
  const { data, error } = await useFetch('/api/bookings', {
    method: 'POST',
    body: bookingData
  })
  
  if (error.value) {
    console.error('Booking failed:', error.value)
    return
  }
  
  console.log('Booking created:', data.value)
}
```

## Next Steps

1. **Add Authentication**: Implement JWT-based auth in the API endpoints
2. **Add Validation**: Use Zod or similar for request validation
3. **Add More Endpoints**: Create PUT and DELETE endpoints for updates
4. **Add Pagination**: Implement pagination for large datasets
5. **Add Search**: Add full-text search capabilities
6. **Add Filters**: Implement advanced filtering in GET endpoints
7. **Add Relationships**: Fetch related data in single queries
8. **Add Transactions**: Use database transactions for complex operations

## Troubleshooting

### Connection Issues

If you get connection errors:
1. Verify your DATABASE_URL is correct
2. Check if your Neon database is active
3. Ensure SSL mode is set to 'require'
4. Check your IP is whitelisted in Neon (if applicable)

### Migration Issues

If migrations fail:
1. Delete the `server/database/migrations` folder
2. Run `pnpm drizzle-kit generate:pg` again
3. Run `pnpm drizzle-kit push:pg` again

### API Errors

If API endpoints return errors:
1. Check server logs in terminal
2. Verify database tables exist
3. Check data types match schema
4. Ensure required fields are provided

## Additional Resources

- [Neon Documentation](https://neon.tech/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Nuxt 3 Documentation](https://nuxt.com)

## Support

If you encounter issues:
1. Check the console logs
2. Verify your .env configuration
3. Test database connection with Drizzle Studio
4. Check API responses with curl or Postman