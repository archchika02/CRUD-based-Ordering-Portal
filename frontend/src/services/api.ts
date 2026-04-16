import { Order, CreateOrderInput, UpdateOrderInput } from '../types/order';

/**
 * Service layer for backend API communication
 * Provides standard CRUD operations for the Ordering Portal
 */

const API_BASE_URL = 'http://localhost:5000/api/orders';

export const api = {
  /**
   * Fetch all orders from the registry
   */
  async fetchOrders(): Promise<Order[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  /**
   * Create a new order
   */
  async createOrder(data: CreateOrderInput): Promise<Order> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  /**
   * Update an existing order (status or details)
   */
  async updateOrder(id: string, data: UpdateOrderInput): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update order');
    return response.json();
  },

  /**
   * Delete an order permanently
   */
  async deleteOrder(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete order');
  }
};
