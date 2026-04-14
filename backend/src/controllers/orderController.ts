import { Request, Response } from 'express';
import db from '../data/db';
import { CreateOrderInput, UpdateOrderInput, Order } from '../../../shared/order';

/**
 * Controller for handling Order-related requests
 * Maps incoming HTTP requests to Database operations
 */

// GET /api/orders
export const getAllOrders = (req: Request, res: Response) => {
  try {
    const orders = db.prepare('SELECT * FROM orders ORDER BY createdAt DESC').all() as Order[];
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
};

// GET /api/orders/:id
export const getOrderById = (req: Request, res: Response) => {
  try {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id) as Order;
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
};

// POST /api/orders
export const createOrder = (req: Request, res: Response) => {
  const input: CreateOrderInput = req.body;

  // Simple validation
  if (!input.customerName || !input.item || !input.price || !input.quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const id = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
  const totalAmount = input.price * input.quantity;
  const createdAt = new Date().toISOString();
  // Automatic shipping estimation (3 days from now)
  const estimatedShippingDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();

  try {
    const insert = db.prepare(`
      INSERT INTO orders (
        id, customerName, customerEmail, customerContact, item, category, 
        price, quantity, totalAmount, shippingAddress, status, createdAt,
        estimatedShippingDate
      ) VALUES (
        @id, @customerName, @customerEmail, @customerContact, @item, @category, 
        @price, @quantity, @totalAmount, @shippingAddress, @status, @createdAt,
        @estimatedShippingDate
      )
    `);

    insert.run({ ...input, id, totalAmount, createdAt, estimatedShippingDate });
    
    // Return the created object
    res.status(201).json({ ...input, id, totalAmount, createdAt, estimatedShippingDate });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order record' });
  }
};

// PUT /api/orders/:id
export const updateOrder = (req: Request, res: Response) => {
  const { id } = req.params;
  const updates: UpdateOrderInput = req.body;

  try {
    // Check if order exists
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as Order;
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Merge updates and recalculate total if necessary
    const updatedData = { ...order, ...updates };
    updatedData.totalAmount = updatedData.price * updatedData.quantity;

    const updateStmt = db.prepare(`
      UPDATE orders SET 
        customerName = @customerName,
        customerEmail = @customerEmail,
        customerContact = @customerContact,
        item = @item,
        category = @category,
        price = @price,
        quantity = @quantity,
        totalAmount = @totalAmount,
        shippingAddress = @shippingAddress,
        status = @status
      WHERE id = @id
    `);

    updateStmt.run(updatedData);
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order record' });
  }
};

// DELETE /api/orders/:id
export const deleteOrder = (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const info = db.prepare('DELETE FROM orders WHERE id = ?').run(id);
    
    if (info.changes === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order record' });
  }
};
