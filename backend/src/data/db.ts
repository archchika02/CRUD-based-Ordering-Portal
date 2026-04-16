import Database from 'better-sqlite3';

/**
 * Database Connection Configuration
 * Initializes the SQLite database file in the backend root
 */
const db = new Database('database.sqlite');

// Set pragmas for better performance and safety
db.pragma('journal_mode = WAL');

/**
 * Schema Initialization
 * Ensures the orders table exists with the correct structure
 */
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customerName TEXT NOT NULL,
    customerEmail TEXT NOT NULL,
    customerContact TEXT NOT NULL,
    item TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    totalAmount REAL NOT NULL,
    shippingAddress TEXT NOT NULL,
    status TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    estimatedShippingDate TEXT NOT NULL DEFAULT ''
  )
`);

/**
 * Migration: Ensure estimatedShippingDate exists and is populated
 */
try {
  // Check if column exists by trying to select it
  db.prepare('SELECT estimatedShippingDate FROM orders LIMIT 1').get();
} catch (e) {
  // Column doesn't exist, add it
  console.log('🔄 Migrating database: Adding estimatedShippingDate column...');
  db.exec('ALTER TABLE orders ADD COLUMN estimatedShippingDate TEXT NOT NULL DEFAULT ""');
}

// Populate empty estimatedShippingDate for legacy records
const fixLegacy = db.prepare(`
  UPDATE orders 
  SET estimatedShippingDate = datetime(createdAt, '+3 days') 
  WHERE estimatedShippingDate = '' OR estimatedShippingDate IS NULL
`);
fixLegacy.run();

/**
 * Seeding Logic
 * Populates the database with initial records if it is empty
 */
const checkCount = db.prepare('SELECT COUNT(*) as count FROM orders').get() as { count: number };

if (checkCount.count === 0) {
  console.log('🌱 Seeding database with initial records...');
  
  const insert = db.prepare(`
    INSERT INTO orders (
      id, customerName, customerEmail, customerContact, item, category, 
      price, quantity, totalAmount, shippingAddress, status, createdAt,
      estimatedShippingDate
    ) VALUES (
      @id, @customerName, @customerEmail, @customerContact, @item, @category, 
      @price, @quantity, @totalAmount, @shippingAddress, @status, @createdAt,
      @estimatedShippingDate
    )
  `);

  const initialData = [
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
      estimatedShippingDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
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
      estimatedShippingDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  initialData.forEach(data => insert.run(data));
  console.log('✅ Database seeded successfully.');
}

export default db;
