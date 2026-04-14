import { Order } from '../../../shared/order';

/**
 * In-Memory Data Store for Orders
 * Serves as the central registry for all transactions handled by the server
 */
export let orders: Order[] = [
  {
    id: 'ORD-1024',
    customerName: 'Alice Smith',
    customerEmail: 'alice@example.com',
    customerContact: '+94 77 123 4567',
    item: 'MacBook Pro 14"',
    category: 'Electronics',
    price: 199999,
    quantity: 1,
    totalAmount: 199999,
    shippingAddress: 'No. 42, Galle Road, Colombo 03, Sri Lanka',
    status: 'Shipped',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ORD-1025',
    customerName: 'John Miller',
    customerEmail: 'john.m@provider.net',
    customerContact: '+94 71 987 6543',
    item: 'Ergonomic Desk',
    category: 'Furniture',
    price: 45000,
    quantity: 2,
    totalAmount: 90000,
    shippingAddress: '158/A, Kandy Road, Kiribathgoda, Sri Lanka',
    status: 'Processing',
    createdAt: new Date().toISOString(),
  },
];
