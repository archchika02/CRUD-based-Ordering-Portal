import dotenv from 'dotenv';
import app from './app';

// Load Environment Variables
dotenv.config();

/**
 * Server Configuration
 * Loads settings and starts the HTTP listener
 */
const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || 'development';

// Start the Express Server
app.listen(PORT, () => {
  console.log('------------------------------------------------');
  console.log(`Server running in ${ENV} mode`);
  console.log(`Listening on: http://localhost:${PORT}`);
  console.log('------------------------------------------------');
});
