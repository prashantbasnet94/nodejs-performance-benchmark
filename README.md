# Express vs Fastify Performance Comparison

Simple performance benchmark comparing Express.js and Fastify frameworks.

## 🚀 Quick Start

### Run Express Server
```bash
yarn express
```
Server runs on http://localhost:3000

### Run Fastify Server
```bash
yarn fastify
```
Server runs on http://localhost:3001

### Run Performance Test
```bash
./benchmark.sh
```

## 📊 Results

| Framework | Requests/sec | Latency | Winner |
|-----------|-------------|---------|---------|
| Express   | 5,104       | 195ms   |         |
| Fastify   | 6,206       | 160ms   | **🏆 21% faster** |

## 🔧 Test Endpoints

- `GET /health` - Server status
- `GET /api/users/123` - Get user data
- `POST /api/users` - Create user

## 📝 Test Commands

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

Replace `3000` with `3001` to test Fastify.

## 🎯 Summary

Fastify handles **21% more requests** with **18% lower latency** than Express in identical scenarios.
