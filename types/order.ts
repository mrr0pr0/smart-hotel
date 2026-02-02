export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  category: string;
  price: string;
  available: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  menuItemId: number;
  name: string;
  quantity: number;
  price: string;
  notes?: string;
}

export interface Order {
  id: number;
  type: "restaurant" | "room-service";
  location: string;
  roomId?: number;
  guestId?: number;
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
  items: string;
  subtotal: string;
  tax: string;
  total: string;
  assignedTo?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderData {
  type: Order["type"];
  location: string;
  roomId?: number;
  guestId?: number;
  items: OrderItem[];
  notes?: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  location: string;
  roomId?: number;
  assignedTo: number;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
  dueTime?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
