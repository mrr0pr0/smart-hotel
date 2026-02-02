export interface Room {
  id: number;
  number: string;
  type: "single" | "double" | "suite" | "deluxe";
  floor: number;
  price: string;
  capacity: number;
  size?: number;
  view?: string;
  // optional image url used by UI components
  image?: string;
  status: "available" | "occupied" | "maintenance";
  description?: string;
  features?: string;
  lastCleaned?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomAvailability {
  checkIn: Date;
  checkOut: Date;
}

export interface CreateRoomData {
  number: string;
  type: Room["type"];
  floor: number;
  price: string;
  capacity: number;
  size?: number;
  view?: string;
  description?: string;
  features?: string[];
}
