// Shared data model for Orders
// Used by both frontend and backend to ensure data consistency

/**
 * Defines all possible stages in the order fulfillment cycle
 */
export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Canceled';

/**
 * Main Order entity representing a real-world purchase record
 */
export interface Order {
  id: string;              // Unique identifier (e.g., ORD-7H2B)
  customerName: string;    // Full name of the customer
  customerEmail: string;   // Primary contact email
  customerContact: string; // Contact phone number
  item: string;            // Name of the ordered product
  category: string;        // Product category
  price: number;           // Unit price in Rs.
  quantity: number;        // Total count of units
  totalAmount: number;     // Final price (price * quantity)
  shippingAddress: string; // Full destination address
  status: OrderStatus;     // Current fulfillment status
  createdAt: string;       // ISO timestamp of record creation
}

/**
 * Data required to create a new order
 * (Calculated fields like ID and totals are managed by the system)
 */
export type CreateOrderInput = Omit<Order, 'id' | 'createdAt' | 'totalAmount'>;

/**
 * Data allowed for updating an existing order
 */
export type UpdateOrderInput = Partial<CreateOrderInput>;
