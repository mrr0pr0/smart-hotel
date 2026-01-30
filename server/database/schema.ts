import { pgTable, serial, varchar, text, integer, timestamp, boolean, decimal, pgEnum } from 'drizzle-orm/pg-core'

// Enums
export const roomStatusEnum = pgEnum('room_status', ['available', 'occupied', 'maintenance'])
export const roomTypeEnum = pgEnum('room_type', ['single', 'double', 'suite', 'deluxe'])
export const bookingStatusEnum = pgEnum('booking_status', ['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled'])
export const orderStatusEnum = pgEnum('order_status', ['pending', 'preparing', 'ready', 'delivered', 'cancelled'])
export const userRoleEnum = pgEnum('user_role', ['admin', 'receptionist', 'chef', 'waiter', 'housekeeper', 'room-service'])
export const taskStatusEnum = pgEnum('task_status', ['pending', 'in-progress', 'completed'])
export const taskPriorityEnum = pgEnum('task_priority', ['low', 'medium', 'high'])

// Users Table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  role: userRoleEnum('role').notNull().default('receptionist'),
  department: varchar('department', { length: 100 }),
  status: varchar('status', { length: 50 }).notNull().default('active'),
  shift: varchar('shift', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Rooms Table
export const rooms = pgTable('rooms', {
  id: serial('id').primaryKey(),
  number: varchar('number', { length: 20 }).notNull().unique(),
  type: roomTypeEnum('type').notNull(),
  floor: integer('floor').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  capacity: integer('capacity').notNull(),
  size: integer('size'), // in square feet
  view: varchar('view', { length: 100 }),
  status: roomStatusEnum('status').notNull().default('available'),
  description: text('description'),
  features: text('features'), // JSON string of features array
  lastCleaned: timestamp('last_cleaned'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Guests Table
export const guests = pgTable('guests', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  address: text('address'),
  idNumber: varchar('id_number', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Bookings Table
export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  guestId: integer('guest_id').notNull().references(() => guests.id),
  roomId: integer('room_id').notNull().references(() => rooms.id),
  checkIn: timestamp('check_in').notNull(),
  checkOut: timestamp('check_out').notNull(),
  nights: integer('nights').notNull(),
  guests: integer('guests').notNull().default(1),
  status: bookingStatusEnum('status').notNull().default('pending'),
  specialRequests: text('special_requests'),
  roomRate: decimal('room_rate', { precision: 10, scale: 2 }).notNull(),
  tax: decimal('tax', { precision: 10, scale: 2 }).notNull(),
  serviceFee: decimal('service_fee', { precision: 10, scale: 2 }).notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  paid: decimal('paid', { precision: 10, scale: 2 }).notNull().default('0'),
  balance: decimal('balance', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Menu Items Table
export const menuItems = pgTable('menu_items', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  available: boolean('available').notNull().default(true),
  imageUrl: varchar('image_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Orders Table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 50 }).notNull(), // 'restaurant' or 'room-service'
  location: varchar('location', { length: 100 }).notNull(), // room number or table number
  roomId: integer('room_id').references(() => rooms.id),
  guestId: integer('guest_id').references(() => guests.id),
  status: orderStatusEnum('status').notNull().default('pending'),
  items: text('items').notNull(), // JSON string of order items
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  tax: decimal('tax', { precision: 10, scale: 2 }).notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  assignedTo: integer('assigned_to').references(() => users.id),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Tasks Table
export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  location: varchar('location', { length: 100 }).notNull(),
  roomId: integer('room_id').references(() => rooms.id),
  assignedTo: integer('assigned_to').notNull().references(() => users.id),
  priority: taskPriorityEnum('priority').notNull().default('medium'),
  status: taskStatusEnum('status').notNull().default('pending'),
  dueTime: timestamp('due_time'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Activity Log Table
export const activityLog = pgTable('activity_log', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  bookingId: integer('booking_id').references(() => bookings.id),
  orderId: integer('order_id').references(() => orders.id),
  action: varchar('action', { length: 255 }).notNull(),
  details: text('details'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})