import { Request, Response } from 'express';
import { orders } from '../data/orderRegistry';
import { CreateOrderInput, UpdateOrderInput, Order } from '../../../shared/order';

/**
 * Controller for handling Order-related requests
 * Maps incoming HTTP requests to business logic
 */

// GET /api/orders
export const getAllOrders = (req: Request, res: Response) => {
  res.json(orders);
};

// GET /api/orders/:id
export const getOrderById = (req: Request, res: Response) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
};

// POST /api/orders
export const createOrder = (req: Request, res: Response) => {
  const input: CreateOrderInput = req.body;

  // Simple validation
  if (!input.customerName || !input.item || !input.price || !input.quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newOrder: Order = {
    ...input,
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    totalAmount: input.price * input.quantity,
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
};

// PUT /api/orders/:id
export const updateOrder = (req: Request, res: Response) => {
  const { id } = req.params;
  const updates: UpdateOrderInput = req.body;

  const index = orders.findIndex(o => o.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  // Calculate new total if price or quantity changed
  const updatedOrder = { ...orders[index], ...updates };
  if (updates.price || updates.quantity) {
    updatedOrder.totalAmount = updatedOrder.price * updatedOrder.quantity;
  }

  orders[index] = updatedOrder;
  res.json(updatedOrder);
};

// DELETE /api/orders/:id
export const deleteOrder = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = orders.findIndex(o => o.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  orders.splice(index, 1);
  res.json({ success: true, message: 'Order deleted successfully' });
};
