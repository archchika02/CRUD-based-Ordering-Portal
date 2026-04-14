# Ordering Portal API Specification

This document defines the RESTful interface for the Ordering Portal backend.

## General Information
- **Base URL**: `http://localhost:5000/api`
- **Content-Type**: `application/json`
- **Encoding**: UTF-8
- **Naming Convention**: `camelCase`

---

## Endpoints

### 1. List All Orders
Retrieves all orders from the registry.

- **URL**: `/orders`
- **Method**: `GET`
- **Success Response**:
  - **Code**: 200 OK
  - **Body**: `Order[]` (Array of Order objects)

### 2. Get Order Details
Retrieves a single order by its ID.

- **URL**: `/orders/:id`
- **Method**: `GET`
- **Success Response**:
  - **Code**: 200 OK
  - **Body**: `Order`
- **Error Response**:
  - **Code**: 404 NOT FOUND
  - **Body**: `{ "error": "Order not found" }`

### 3. Create New Order
Submits a new order to the registry.

- **URL**: `/orders`
- **Method**: `POST`
- **Request Body**: `CreateOrderInput`
- **Success Response**:
  - **Code**: 201 CREATED
  - **Body**: `Order` (The newly created object including generated ID and timestamp)
- **Error Response**:
  - **Code**: 400 BAD REQUEST
  - **Body**: `{ "error": "Missing required fields" }`

### 4. Update Order
Modifies an existing order. Typically used for status updates or address changes.

- **URL**: `/orders/:id`
- **Method**: `PUT`
- **Request Body**: `UpdateOrderInput`
- **Success Response**:
  - **Code**: 200 OK
  - **Body**: `Order` (The updated object)
- **Error Response**:
  - **Code**: 404 NOT FOUND
  - **Body**: `{ "error": "Order not found" }`

### 5. Delete Order
Removes a record from the registry permanently.

- **URL**: `/orders/:id`
- **Method**: `DELETE`
- **Success Response**:
  - **Code**: 200 OK
  - **Body**: `{ "success": true, "message": "Order deleted successfully" }`
- **Error Response**:
  - **Code**: 404 NOT FOUND
  - **Body**: `{ "error": "Order not found" }`

---

## Data Models (Shared)

Refer to [shared/order.ts](file:///c:/Users/archc/Desktop/CRUD-based%20Ordering%20Portal/shared/order.ts) for the exact TypeScript interfaces:

- `Order`: Full record structure.
- `CreateOrderInput`: Fields required for creation (excludes auto-generated fields).
- `UpdateOrderInput`: Partial fields allowed for status/detail updates.
