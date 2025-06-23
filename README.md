# 🚀 Node.js Framework Performance Comparison

Comprehensive performance benchmark comparing Express.js, Fastify, Koa, and Next.js frameworks under identical conditions.

## 📊 Performance Results Summary

| Framework | GET RPS | POST RPS | Avg Latency (GET/POST) | Throughput (GET/POST) | Performance Score |
|-----------|---------|----------|------------------------|----------------------|-------------------|
| **Koa** 🏆 | **24,024** | **24,777** | **41ms / 40ms** | **7.74MB/s / 9.16MB/s** | **⭐⭐⭐⭐⭐** |
| **Fastify** | 12,208 | 9,857 | 81ms / 101ms | 4.77MB/s / 4.33MB/s | **⭐⭐⭐⭐** |
| **Express** | 9,476 | 8,671 | 105ms / 115ms | 3.71MB/s / 3.81MB/s | **⭐⭐⭐** |
| **Next.js** | 2,167 | 5,298 | 460ms / 188ms | 0.80MB/s / 2.22MB/s | **⭐** |

### 🎯 Key Performance Differences
- **Koa is 2.5x faster** than Express for GET requests
- **Koa is 2.9x faster** than Express for POST requests  
- **Fastify is 29% faster** than Express for GET requests
- **Next.js is 21x slower** than Koa (designed for different use cases)

## 🚀 Quick Start

### Start All Servers
```bash
# Terminal 1 - Express (Port 3000)
yarn express

# Terminal 2 - Fastify (Port 3001)
yarn fastify

# Terminal 3 - Koa (Port 3003)
yarn koa

# Terminal 4 - Next.js (Port 3002)
yarn dev

# Terminal 5 - Run Benchmark
./benchmark.sh
```

## 🔧 Test Configuration
- **Concurrent Connections:** 100
- **Test Duration:** 30 seconds
- **Pipelining Factor:** 10
- **Load Testing Tool:** Fastify's `autocannon`

## 📋 Test Endpoints

All frameworks implement identical endpoints:

### Health Check
- `GET /health` - Server status check

### User API
- `GET /api/users/123` - Retrieve user data
- `POST /api/users` - Create new user

## 🧪 Manual Testing Commands

### Express (Port 3000)
```bash
# Health check
curl http://localhost:3000/health

# Get user
curl http://localhost:3000/api/users/123

# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","age":25}'
```

### Fastify (Port 3001)
```bash
# Health check
curl http://localhost:3001/health

# Get user
curl http://localhost:3001/api/users/123

# Create user
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","age":25}'
```

### Koa (Port 3003)
```bash
# Health check
curl http://localhost:3003/health

# Get user
curl http://localhost:3003/api/users/123

# Create user
curl -X POST http://localhost:3003/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","age":25}'
```

### Next.js (Port 3002)
```bash
# Health check
curl http://localhost:3002/api/health

# Get user
curl http://localhost:3002/api/users/123

# Create user
curl -X POST http://localhost:3002/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","age":25}'
```

## 🏆 Detailed Performance Analysis

### Koa - Performance Champion
✅ **Strengths:**
- Highest requests per second (24K+ RPS)
- Lowest latency (~40ms average)
- Best throughput (7-9 MB/s)
- Modern async/await architecture
- Minimal overhead

⚠️ **Considerations:**
- Smaller ecosystem
- More manual setup required
- Less middleware availability

### Fastify - Balanced Performance
✅ **Strengths:**
- Excellent performance (12K+ RPS)
- Rich plugin ecosystem
- Built-in TypeScript support
- Schema-based validation
- Production-ready features

🎯 **Best for:** SaaS platforms, APIs requiring validation

### Express - Industry Standard
✅ **Strengths:**
- Mature ecosystem
- Extensive middleware library
- Great documentation
- Large community support
- Battle-tested in production

🎯 **Best for:** Teams prioritizing stability and ecosystem

### Next.js - Full-Stack Framework
✅ **Strengths:**
- Excellent for full-stack React apps
- Built-in SSR/SSG capabilities
- Great developer experience
- Integrated deployment options

⚠️ **Note:** Not optimized for API-only workloads

## 🎯 Framework Selection Guide

### Choose **Koa** when:
- Maximum performance is critical
- Building high-throughput APIs
- You prefer modern async/await patterns
- Minimal overhead is important

### Choose **Fastify** when:
- You want performance + rich ecosystem
- Schema-based validation is needed
- Built-in TypeScript support matters
- Building SaaS platforms or complex APIs

### Choose **Express** when:
- Team familiarity is most important
- Extensive middleware ecosystem needed
- Legacy system integration required
- Stability over raw performance

### Choose **Next.js** when:
- Building full-stack React applications
- SSR/SSG capabilities are needed
- APIs are secondary to frontend
- Vercel deployment is preferred

## 📈 Performance Metrics Explained

- **RPS (Requests Per Second):** Higher is better
- **Latency:** Lower is better (milliseconds)
- **Throughput:** Higher is better (MB/s data transfer)
- **Pipelining:** Multiple requests over single connection

## 🔄 Running Your Own Tests

1. Clone the repository
2. Install dependencies: `yarn install`
3. Start desired servers (see Quick Start)
4. Run benchmark: `./benchmark.sh`
5. Results will display in terminal

## 📝 Notes

- Results may vary based on system specifications
- Network conditions can affect performance
- Application complexity impacts real-world performance
- Database operations typically become the bottleneck in production

## 🛠️ Requirements

- Node.js 16+
- Yarn package manager
- Unix-like system for benchmark script

## 📄 License

MIT License - Feel free to use and modify for your projects.