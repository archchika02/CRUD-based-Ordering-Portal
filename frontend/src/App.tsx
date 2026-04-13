import React, { useState } from 'react';
import './styles/global.css';
import { Order, CreateOrderInput } from './types/order';
import OrderForm from './features/orders/components/OrderForm';
import OrderList from './features/orders/components/OrderList';

/**
 * Main Application Component - Corporate Ordering Portal
 * Implements a Dashboard-style layout for professional order management
 */
function App() {
  // In-memory state for orders
  const [orders, setOrders] = useState<Order[]>([
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
  ]);

  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  // Stats calculation for the dashboard overview
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeOrders = orders.filter(o => o.status === 'Processing' || o.status === 'Shipped').length;

  const handleCreateOrUpdate = (input: CreateOrderInput) => {
    const totalAmount = input.price * input.quantity;

    if (editingOrder) {
      setOrders(orders.map(o => o.id === editingOrder.id ? { ...o, ...input, totalAmount } : o));
      setEditingOrder(null);
    } else {
      const newOrder: Order = {
        ...input,
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        totalAmount,
        createdAt: new Date().toISOString(),
      };
      setOrders([...orders, newOrder]);
    }
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm(`Confirm deletion of record ${id}?`)) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  return (
    <div className="app-container">
      {/* Full Width Layout - Sidebar removed */}
      <div className="main-layout full-width">
        <header className="app-header">
          <div className="header-brand">
            <h2>Corporate Ordering Portal</h2>
          </div>
          <div className="user-profile">
            <span className="text-muted">Administrator</span>
          </div>
        </header>

        <main className="app-content">
          {/* Key Metrics Overview */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Total Revenue</span>
              <span className="stat-value">Rs. {totalRevenue.toLocaleString()}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Active Orders</span>
              <span className="stat-value">{activeOrders}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Registry Count</span>
              <span className="stat-value">{orders.length}</span>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* Creation/Editing Panel */}
            <div className="panel">
              <div className="panel-header">
                <h3>Order entry</h3>
                <p className="subtitle">Enter customer details and select products.</p>
              </div>
              <div className="panel-body">
                <OrderForm
                  onSubmit={handleCreateOrUpdate}
                  initialData={editingOrder}
                  onCancel={editingOrder ? () => setEditingOrder(null) : undefined}
                />
              </div>
            </div>

            {/* Data Registry Panel */}
            <div className="panel">
              <div className="panel-header">
                <h3>Database records</h3>
                <p className="subtitle">Overview of all active and past transactions.</p>
              </div>
              <div className="panel-body">
                <OrderList
                  orders={orders}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
