// This is the data model for Orders
// Defines all possible statuses for an order
export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Canceled';

// Main Order entity representing a real-world purchase
export interface Order {
  id: string;             // Unique identifier (e.g., ORD-7H2B)
  customerName: string;   // Full name of the customer
  customerEmail: string;  // Contact email for notifications
  customerContact: string; // Phone number for coordination
  item: string;           // Name of the product purchased
  category: string;       // Product category (Electronics, etc.)
  price: number;          // Unity price of the item
  quantity: number;       // Number of items ordered
  totalAmount: number;    // Calculated total: price * quantity
  shippingAddress: string; // Destination for delivery
  status: OrderStatus;    // Current stage in the fulfillment cycle
  createdAt: string;      // ISO timestamp of creation
  estimatedShippingDate: string; // Estimated date for shipping
}

// Input types for creation and updates
export type CreateOrderInput = Omit<Order, 'id' | 'createdAt' | 'totalAmount' | 'estimatedShippingDate'>;
export type UpdateOrderInput = Partial<CreateOrderInput>;
