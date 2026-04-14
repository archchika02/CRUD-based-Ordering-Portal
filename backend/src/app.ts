import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import orderRoutes from './routes/orderRoutes';

/**
 * Express Application Instance
 * Configures middleware and base routing
 */
const app: Application = express();

// Middleware Configuration
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing of JSON request bodies

// Base API Health Route
app.get('/api', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Ordering Portal API is online',
    version: '1.0.0'
  });
});

// Mounted Business Routes
app.use('/api/orders', orderRoutes);

export default app;
