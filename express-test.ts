// express-test.ts
import express from 'express';
import { performance } from 'perf_hooks';

const app = express();
app.use(express.json());

// Memory tracking utility
const getMemoryUsage = () => {
  const used = process.memoryUsage();
  return {
    rss: `${Math.round(used.rss / 1024 / 1024 * 100) / 100} MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100} MB`,
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`,
  };
};

// Simple validation middleware (manual) - Fixed with explicit void return type
const validateUser = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const { name, email, age } = req.body;
  
  if (!name || typeof name !== 'string' || name.length < 2) {
    res.status(400).json({ error: 'Name must be at least 2 characters' });
    return;
  }
  
  if (!email || !email.includes('@')) {
    res.status(400).json({ error: 'Valid email required' });
    return;
  }
  
  if (!age || typeof age !== 'number' || age < 18) {
    res.status(400).json({ error: 'Age must be 18 or older' });
    return;
  }
  
  next();
};

// Async error wrapper (required for Express) - Fixed with proper typing
const asyncHandler = (fn: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>) => 
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Fake database
const fakeDatabase = {
  async getUser(id: number): Promise<any> {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 10));
    
    if (id === 999) throw new Error('Database connection failed');
    if (id === 404) return null;
    
    return { 
      id, 
      name: `User ${id}`, 
      email: `user${id}@example.com`,
      createdAt: new Date().toISOString()
    };
  }
};

// Routes
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    framework: 'Express',
    memory: getMemoryUsage(),
    timestamp: new Date().toISOString()
  });
});

// Fixed async handler with explicit Promise<void> return type
app.get('/api/users/:id', asyncHandler(async (req: express.Request, res: express.Response): Promise<void> => {
  const start = performance.now();
  const userId = parseInt(req.params.id);
  
  if (isNaN(userId)) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }
  
  try {
    const user = await fakeDatabase.getUser(userId);
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    const end = performance.now();
    
    res.json({
      data: user,
      processingTime: `${(end - start).toFixed(2)}ms`,
      framework: 'Express'
    });
  } catch (error: any) {
    console.error('Database error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}));

app.post('/api/users', validateUser, (req, res) => {
  const start = performance.now();
  const { name, email, age } = req.body;
  
  const newUser = {
    id: Math.floor(Math.random() * 1000),
    name,
    email,
    age,
    createdAt: new Date().toISOString()
  };
  
  const end = performance.now();
  
  res.status(201).json({
    message: 'User created successfully',
    user: newUser,
    processingTime: `${(end - start).toFixed(2)}ms`,
    framework: 'Express'
  });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error:', err.message);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`);
  console.log(`📊 Initial memory usage:`, getMemoryUsage());
  console.log('\n📋 Available endpoints:');
  console.log(`   GET  http://localhost:${PORT}/health`);
  console.log(`   GET  http://localhost:${PORT}/api/users/:id`);
  console.log(`   POST http://localhost:${PORT}/api/users`);
  console.log('\n🧪 Test commands:');
  console.log(`   curl http://localhost:${PORT}/health`);
  console.log(`   curl http://localhost:${PORT}/api/users/123`);
  console.log(`   curl -X POST http://localhost:${PORT}/api/users -H "Content-Type: application/json" -d '{"name":"John","email":"john@example.com","age":25}'`);
});
