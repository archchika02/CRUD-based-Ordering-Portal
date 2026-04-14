import { Router } from 'express';
import * as orderController from '../controllers/orderController';

/**
 * RESTful Routes for Order Management
 * Defined in Phase 3 API Specification
 */
const router = Router();

// GET all orders
router.get('/', orderController.getAllOrders);

// GET single order
router.get('/:id', orderController.getOrderById);

// POST create new order
router.post('/', orderController.createOrder);

// PUT update existing order
router.put('/:id', orderController.updateOrder);

// DELETE order
router.delete('/:id', orderController.deleteOrder);

export default router;
