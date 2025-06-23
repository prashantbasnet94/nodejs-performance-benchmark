// koa-test.ts
import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { performance } from 'perf_hooks';

// Extend Koa's Request interface to include body property
interface RequestWithBody extends Koa.Request {
  body?: any;
}

const app = new Koa();
const router = new Router();

// Memory tracking utility
const getMemoryUsage = () => {
  const used = process.memoryUsage();
  return {
    rss: `${Math.round(used.rss / 1024 / 1024 * 100) / 100} MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100} MB`,
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`,
  };
};

// Validation middleware
const validateUser = async (ctx: Koa.Context, next: Koa.Next) => {
  const { name, email, age } = (ctx.request as RequestWithBody).body;
  
  if (!name || typeof name !== 'string' || name.length < 2) {
    ctx.status = 400;
    ctx.body = { error: 'Name must be at least 2 characters' };
    return;
  }
  
  if (!email || !email.includes('@')) {
    ctx.status = 400;
    ctx.body = { error: 'Valid email required' };
    return;
  }
  
  if (!age || typeof age !== 'number' || age < 18) {
    ctx.status = 400;
    ctx.body = { error: 'Age must be 18 or older' };
    return;
  }
  
  await next();
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
router.get('/health', async (ctx) => {
  ctx.body = { 
    status: 'OK', 
    framework: 'Koa',
    memory: getMemoryUsage(),
    timestamp: new Date().toISOString()
  };
});

router.get('/api/users/:id', async (ctx) => {
  const start = performance.now();
  const userId = parseInt(ctx.params.id);
  
  if (isNaN(userId)) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid user ID' };
    return;
  }
  
  try {
    const user = await fakeDatabase.getUser(userId);
    
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
      return;
    }
    
    const end = performance.now();
    
    ctx.body = {
      data: user,
      processingTime: `${(end - start).toFixed(2)}ms`,
      framework: 'Koa'
    };
  } catch (error: any) {
    console.error('Database error:', error.message);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
});

router.post('/api/users', validateUser, async (ctx) => {
  const start = performance.now();
  const { name, email, age } = (ctx.request as RequestWithBody).body;
  
  const newUser = {
    id: Math.floor(Math.random() * 1000),
    name,
    email,
    age,
    createdAt: new Date().toISOString()
  };
  
  const end = performance.now();
  
  ctx.status = 201;
  ctx.body = {
    message: 'User created successfully',
    user: newUser,
    processingTime: `${(end - start).toFixed(2)}ms`,
    framework: 'Koa'
  };
});

// Apply middleware
app.use(bodyParser());

// Error handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error: any) {
    console.error('Global error:', error.message);
    ctx.status = 500;
    ctx.body = { error: 'Something went wrong!' };
  }
});

// Apply routes
app.use(router.routes());
app.use(router.allowedMethods());

// 404 handler
app.use(async (ctx) => {
  ctx.status = 404;
  ctx.body = { error: 'Route not found' };
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`🚀 Koa server running on http://localhost:${PORT}`);
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