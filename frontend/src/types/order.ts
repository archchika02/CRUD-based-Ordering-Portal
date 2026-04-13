// This is the data model for Orders
export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered';

export interface Order {
  id: string;
  customerName: string;
  item: string;
  quantity: number;
  status: OrderStatus;
  createdAt: string;
}

export type CreateOrderInput = Omit<Order, 'id' | 'createdAt'>;
export type UpdateOrderInput = Partial<CreateOrderInput>;
