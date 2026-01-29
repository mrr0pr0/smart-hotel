# Smart Hotel Management System

A comprehensive hotel management system built with Nuxt 3, Vue 3, and Neon PostgreSQL database.

## Features

- **Room Management**: Track room availability, pricing, and maintenance
- **Booking System**: Complete reservation management with guest information
- **Restaurant & Room Service**: Menu management and order tracking
- **Staff Management**: Task assignment and order handling
- **Admin Dashboard**: Analytics, user management, and system settings

## Tech Stack

- **Frontend**: Nuxt 3, Vue 3, Tailwind CSS
- **State Management**: Pinia
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Icons**: Heroicons
- **Charts**: Chart.js

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Database Setup

1. Create a Neon database account at [https://neon.tech](https://neon.tech)
2. Create a new project and database
3. Copy your connection string from the Neon dashboard
4. Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

5. Update `.env` with your Neon database credentials:

```env
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require"
API_SECRET="your-secret-key-here"
```

### 3. Run Database Migrations

Generate and run migrations to create all tables:

```bash
# Generate migration files
pnpm drizzle-kit generate:pg

# Push schema to database
pnpm drizzle-kit push:pg

# Or use Drizzle Studio to manage your database visually
pnpm drizzle-kit studio
```

### 4. Start Development Server

```bash
pnpm run dev
```

The application will be available at `http://localhost:3000`

## Database Schema

The system includes the following tables:

- **users**: Staff and admin accounts
- **rooms**: Hotel room information
- **guests**: Guest information
- **bookings**: Reservation records
- **menu_items**: Restaurant menu
- **orders**: Restaurant and room service orders
- **tasks**: Staff task assignments
- **activity_log**: System activity tracking

## API Endpoints

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get room by ID
- `POST /api/rooms` - Create new room
- `PUT /api/rooms/:id` - Update room
- `DELETE /api/rooms/:id` - Delete room

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status

### Menu
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Add menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Project Structure

```
smart-hotel/
├── assets/
│   └── css/
│       └── main.css              # Global styles
├── components/
│   ├── admin/                    # Admin components
│   ├── layout/                   # Layout components
│   ├── restaurant/               # Restaurant components
│   ├── room-service/             # Room service components
│   ├── rooms/                    # Room components
│   └── ui/                       # UI components
├── composables/
│   ├── useAuth.ts               # Authentication composable
│   ├── useBookings.ts           # Bookings composable
│   ├── useNotification.ts       # Notifications composable
│   ├── useOrders.ts             # Orders composable
│   └── useRooms.ts              # Rooms composable
├── layouts/
│   ├── admin.vue                # Admin layout
│   ├── auth.vue                 # Auth layout
│   ├── default.vue              # Default layout
│   └── staff.vue                # Staff layout
├── middleware/
│   ├── auth.ts                  # Auth middleware
│   └── role.ts                  # Role-based access control
├── pages/
│   ├── admin/                   # Admin pages
│   ├── bookings/                # Booking pages
│   ├── restaurant/              # Restaurant pages
│   ├── room-service/            # Room service pages
│   ├── rooms/                   # Room pages
│   ├── staff/                   # Staff pages
│   ├── index.vue                # Dashboard
│   ├── login.vue                # Login page
│   └── register.vue             # Register page
├── server/
│   ├── api/                     # API routes
│   │   ├── bookings/
│   │   ├── menu/
│   │   ├── orders/
│   │   ├── rooms/
│   │   ├── tasks/
│   │   └── users/
│   ├── database/
│   │   ├── schema.ts            # Database schema
│   │   ├── index.ts             # Database connection
│   │   └── migrations/          # Migration files
│   └── utils/
│       └── db.ts                # Database utilities
├── stores/
│   ├── auth.ts                  # Auth store
│   ├── bookings.ts              # Bookings store
│   ├── menu.ts                  # Menu store
│   ├── orders.ts                # Orders store
│   └── rooms.ts                 # Rooms store
├── types/
│   ├── auth.ts                  # Auth types
│   ├── booking.ts               # Booking types
│   ├── order.ts                 # Order types
│   └── room.ts                  # Room types
├── .env                         # Environment variables (create from .env.example)
├── .env.example                 # Environment variables template
├── drizzle.config.ts            # Drizzle ORM configuration
├── nuxt.config.ts               # Nuxt configuration
├── package.json                 # Dependencies
└── tailwind.config.js           # Tailwind CSS configuration
```

## Development

### Adding New Features

1. Create database schema in `server/database/schema.ts`
2. Generate migration: `pnpm drizzle-kit generate:pg`
3. Push to database: `pnpm drizzle-kit push:pg`
4. Create API endpoints in `server/api/`
5. Create frontend pages in `pages/`
6. Add components in `components/`

### Database Management

Use Drizzle Studio for visual database management:

```bash
pnpm drizzle-kit studio
```

This opens a web interface at `https://local.drizzle.studio`

## Deployment

### Build for Production

```bash
pnpm run build
```

### Preview Production Build

```bash
pnpm run preview
```

## Environment Variables

Required environment variables:

- `DATABASE_URL`: Neon PostgreSQL connection string
- `API_SECRET`: Secret key for API authentication

## License

MIT

## Support

For issues and questions, please create an issue in the repository.