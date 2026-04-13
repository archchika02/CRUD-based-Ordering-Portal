// This is the Product Catalog
// Pre-defined set of products available for ordering

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

export const PRODUCT_CATALOG: Product[] = [
  { id: 'P1', name: 'MacBook Pro 14"', category: 'Electronics', price: 1999.99 },
  { id: 'P2', name: 'MacBook Air M2', category: 'Electronics', price: 1199.00 },
  { id: 'P3', name: 'Dell XPS 15', category: 'Electronics', price: 1599.00 },
  { id: 'P4', name: 'Ergonomic Chair', category: 'Furniture', price: 299.00 },
  { id: 'P5', name: 'Standing Desk', category: 'Furniture', price: 499.00 },
  { id: 'P6', name: 'Leather Sofa', category: 'Furniture', price: 899.00 },
  { id: 'P7', name: 'Coffee Machine', category: 'Appliances', price: 129.50 },
  { id: 'P8', name: 'Wireless Headphones', category: 'Electronics', price: 349.00 },
];
