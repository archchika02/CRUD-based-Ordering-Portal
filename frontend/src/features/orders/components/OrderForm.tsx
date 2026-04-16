// This is the Order Form component
// Refined to support selective product ordering from a pre-defined catalog
import React, { useState, useEffect } from 'react';
import { CreateOrderInput, Order } from '../../../types/order';
import { PRODUCT_CATALOG } from '../../../types/products';

interface OrderFormProps {
  onSubmit: (order: CreateOrderInput) => void;
  initialData?: Order | null;
  onCancel?: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, initialData, onCancel }) => {
  // State for form fields - status is removed from manual selection
  const [formData, setFormData] = useState<CreateOrderInput>({
    customerName: '',
    customerEmail: '',
    customerContact: '',
    item: '',
    category: 'Electronics',
    price: 0,
    quantity: 1,
    shippingAddress: '',
    status: 'Processing',
  });

  // Effect to populate form when entering "Edit Mode" or resetting
  useEffect(() => {
    if (initialData) {
      setFormData({
        customerName: initialData.customerName,
        customerEmail: initialData.customerEmail,
        customerContact: initialData.customerContact,
        item: initialData.item,
        category: initialData.category,
        price: initialData.price,
        quantity: initialData.quantity,
        shippingAddress: initialData.shippingAddress,
        status: initialData.status,
      });
    } else {
      // Default to first product in catalog for new orders
      const defaultProduct = PRODUCT_CATALOG[0];
      setFormData({
        customerName: '',
        customerEmail: '',
        customerContact: '',
        item: defaultProduct.name,
        category: defaultProduct.category,
        price: defaultProduct.price,
        quantity: 1,
        shippingAddress: '',
        status: 'Processing',
      });
    }
  }, [initialData]);

  // Handles production selection logic
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = PRODUCT_CATALOG.find(p => p.name === e.target.value);
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        item: selectedProduct.name,
        category: selectedProduct.category,
        price: selectedProduct.price,
      }));
    }
  };

  // Generic handler for remaining inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset if was create mode
    if (!initialData) {
      const defaultProduct = PRODUCT_CATALOG[0];
      setFormData(prev => ({
        ...prev,
        customerName: '',
        customerEmail: '',
        customerContact: '',
        item: defaultProduct.name,
        category: defaultProduct.category,
        price: defaultProduct.price,
        quantity: 1,
        shippingAddress: '',
      }));
    }
  };

  // Calculated values for the modern summary display
  const currentTotal = formData.price * formData.quantity;

  return (
    <div className="order-form-container">
      <div className="form-header">
        <h3>{initialData ? 'Update Order Details' : 'Place New Corporate Order'}</h3>
        <p className="subtitle">Select products from our authorized corporate catalog.</p>
      </div>

      <form className="order-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Customer Identity */}
          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              placeholder="e.g. Robert Fox"
            />
          </div>
          <div className="form-group">
            <label>Contact Email</label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              required
              placeholder="robert@company.com"
            />
          </div>

          {/* Contact Information */}
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              name="customerContact"
              value={formData.customerContact}
              onChange={handleChange}
              required
              placeholder="+94 XX XXX XXXX"
            />
          </div>

          {/* Product Selection */}
          <div className="form-group">
            <label>Product Item</label>
            <select name="item" value={formData.item} onChange={handleProductChange} className="modern-select">
              {PRODUCT_CATALOG.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Quantity Controls */}
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        </div>

        {/* Shipping Information Section */}
        <div className="form-group full-width">
          <label>Shipping Address</label>
          <textarea
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Enter the full delivery address..."
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1.5px solid var(--border)',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Dynamic Order Summary */}
        <div className="order-summary-card">
          <div className="summary-details">
            <div className="summary-item">
              <span className="label">Category:</span>
              <span className="value tag">{formData.category}</span>
            </div>
            <div className="summary-item">
              <span className="label">Unit Price:</span>
              <span className="value">Rs. {formData.price.toLocaleString()}</span>
            </div>
            <div className="summary-total">
              <span className="label">Total Amount:</span>
              <span className="value highlight">Rs. {currentTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Status field is hidden here but persists in state as 'Processing' */}
          <div className="info-badge">
            Status will be set to <strong>{formData.status}</strong> automatically.
          </div>
        </div>

        {/* Space added above the action buttons as requested */}
        <div className="form-actions" style={{ marginTop: '2.5rem' }}>
          <button type="submit" className="btn-primary">
            {initialData ? 'Confirm Updates' : 'Confirm & Place Order'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn-secondary">
              Go Back
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
