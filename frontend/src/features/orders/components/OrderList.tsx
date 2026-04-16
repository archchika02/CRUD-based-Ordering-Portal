import React from 'react';
import { Order } from '../../../types/order';
import { formatDate } from '../../../utils/dateUtils';

interface OrderListProps {
  orders: Order[];
  onEdit: (order: Order) => void;
  onDelete: (id: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onEdit, onDelete }) => {
  if (orders.length === 0) {
    return (
      <div className="no-orders text-muted">
        <p>No orders currently registered in the database.</p>
      </div>
    );
  }

  return (
    <div className="order-list-container">
      <div className="list-header">
        <h3>Order Registry</h3>
        <span className="count-badge">{orders.length} Total Orders</span>
      </div>
      
      <div className="table-wrapper high-density">
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Placed</th>
              <th>Customer Information</th>
              <th>Shipping Address</th>
              <th>Product</th>
              <th>Category</th>
              <th>Est. Ship</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                {/* Order Identity */}
                <td className="id-cell">{order.id}</td>

                {/* Placed Date */}
                <td className="date-cell">{formatDate(order.createdAt)}</td>
                
                {/* Customer Details */}
                <td>
                  <div className="customer-info">
                    <span className="customer-name">{order.customerName}</span>
                    <span className="customer-contact">{order.customerContact}</span>
                  </div>
                </td>

                {/* Delivery Location */}
                <td className="address-cell">
                  <div className="shipping-address-text">{order.shippingAddress}</div>
                </td>
                
                {/* Product Details */}
                <td>{order.item}</td>
                <td><span className="category-tag">{order.category}</span></td>

                {/* Estimated Delivery */}
                <td className="date-cell highlight">{formatDate(order.estimatedShippingDate)}</td>
                
                {/* Financials */}
                <td className="total-cell">Rs. {order.totalAmount.toLocaleString()}</td>
                
                {/* Status Indicator */}
                <td>
                  <span className={`status-badge status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                
                {/* Control Actions */}
                <td className="actions-cell">
                  <button 
                    onClick={() => onEdit(order)} 
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(order.id)} 
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
