import React, { useState, useEffect } from 'react';
import './styles/global.css';
import { Order, CreateOrderInput } from './types/order';
import OrderForm from './features/orders/components/OrderForm';
import OrderList from './features/orders/components/OrderList';
import { api } from './services/api';

/**
 * Main Application Component - Corporate Ordering Portal
 * Implements a Dashboard-style layout for professional order management
 */
function App() {
  // Application State
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Initial Data Fetch
   * Retrieves the order registry from the backend on mount
   */
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await api.fetchOrders();
        setOrders(data);
        setError(null);
      } catch (err) {
        setError('Failed to load order registry. Please ensure the backend server is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // Stats calculation for the dashboard overview
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeOrders = orders.filter(o => o.status === 'Processing' || o.status === 'Shipped').length;

  /**
   * Create or Update Handler
   * Communicates with the backend and synchronizes local state on success
   */
  const handleCreateOrUpdate = async (input: CreateOrderInput) => {
    try {
      if (editingOrder) {
        // Update existing record
        const updated = await api.updateOrder(editingOrder.id, input);
        setOrders(orders.map(o => o.id === editingOrder.id ? updated : o));
        setEditingOrder(null);
      } else {
        // Create new record
        const created = await api.createOrder(input);
        setOrders(prev => [...prev, created]);
      }
    } catch (err) {
      alert('Error saving order. Please check your connection.');
      console.error(err);
    }
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Delete Handler
   * Permanently removes a record after user confirmation
   */
  const handleDelete = async (id: string) => {
    if (window.confirm(`Confirm deletion of record ${id}?`)) {
      try {
        await api.deleteOrder(id);
        setOrders(orders.filter(o => o.id !== id));
      } catch (err) {
        alert('Could not delete the order. It may have already been removed.');
        console.error(err);
      }
    }
  };

  // Loading and Error UI Overlays
  if (loading) return <div className="app-status-message">Connecting to database...</div>;
  if (error) return <div className="app-status-message error">{error}</div>;

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
