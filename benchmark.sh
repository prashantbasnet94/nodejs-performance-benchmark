#!/bin/bash

# benchmark.sh - Enhanced Performance Comparison Script
# Tests both GET and POST endpoints for Express, Fastify, and Next.js

echo "🚀 Express vs Fastify vs Koa vs Next.js Performance Comparison"
echo "========================================================"

# Check if autocannon is installed
if ! command -v autocannon &> /dev/null; then
    echo "❌ autocannon not found. Installing globally..."
    npm install -g autocannon
fi

echo ""
echo "📋 Test Configuration:"
echo "   - Concurrent connections: 100"
echo "   - Duration: 30 seconds"
echo "   - GET Endpoint: /api/users/123"
echo "   - POST Endpoint: /api/users"
echo ""

# Function to run GET benchmark
run_get_benchmark() {
    local url=$1
    local name=$2
    local port=$3
    local health_endpoint=$4
    local start_command=$5
    
    echo "🔥 Testing $name GET Performance (Port $port)..."
    echo "   URL: $url/api/users/123"
    
    # Check if server is running
    if curl -s "$url$health_endpoint" > /dev/null; then
        echo "   ✅ Server is running"
        echo "   🏃‍♂️ Running GET benchmark..."
        echo ""
        autocannon -c 100 -d 30 -p 10 "$url/api/users/123"
    else
        echo "   ❌ Server not responding at $url"
        echo "   📝 Start the server first with: $start_command"
    fi
    
    echo ""
    echo "=========================================="
    echo ""
}

# Function to run POST benchmark
run_post_benchmark() {
    local url=$1
    local name=$2
    local port=$3
    local health_endpoint=$4
    local start_command=$5
    
    echo "🔥 Testing $name POST Performance (Port $port)..."
    echo "   URL: $url/api/users"
    
    # Check if server is running
    if curl -s "$url$health_endpoint" > /dev/null; then
        echo "   ✅ Server is running"
        echo "   🏃‍♂️ Running POST benchmark..."
        echo ""
        autocannon -c 100 -d 30 -p 10 \
            -m POST \
            -H "Content-Type: application/json" \
            -b '{"name":"TestUser","email":"test@example.com","age":25}' \
            "$url/api/users"
    else
        echo "   ❌ Server not responding at $url"
        echo "   📝 Start the server first with: $start_command"
    fi
    
    echo ""
    echo "=========================================="
    echo ""
}

# Test Express GET
run_get_benchmark "http://localhost:3000" "Express.js" "3000" "/health" "yarn express"

# Test Express POST
run_post_benchmark "http://localhost:3000" "Express.js" "3000" "/health" "yarn express"

# Test Fastify GET
run_get_benchmark "http://localhost:3001" "Fastify" "3001" "/health" "yarn fastify"

# Test Fastify POST
run_post_benchmark "http://localhost:3001" "Fastify" "3001" "/health" "yarn fastify"

# Test Koa GET
run_get_benchmark "http://localhost:3003" "Koa" "3003" "/health" "yarn koa"

# Test Koa POST
run_post_benchmark "http://localhost:3003" "Koa" "3003" "/health" "yarn koa"

# Test Next.js GET
run_get_benchmark "http://localhost:3002" "Next.js" "3002" "/api/health" "yarn dev"

# Test Next.js POST
run_post_benchmark "http://localhost:3002" "Next.js" "3002" "/api/health" "yarn dev"

echo "🎯 All Benchmarks Complete!"
echo ""
echo "💡 Quick Start Guide:"
echo "   Terminal 1: yarn express    # Starts Express on port 3000"
echo "   Terminal 2: yarn fastify    # Starts Fastify on port 3001" 
echo "   Terminal 3: yarn koa        # Starts Koa on port 3003"
echo "   Terminal 4: yarn dev        # Starts Next.js on port 3002"
echo "   Terminal 5: ./benchmark.sh  # Runs this benchmark script"
echo ""
echo "🧪 Manual Testing Commands:"
echo "   # Express"
echo "   curl http://localhost:3000/health"
echo "   curl http://localhost:3000/api/users/123"
echo "   curl -X POST http://localhost:3000/api/users -H \"Content-Type: application/json\" -d '{\"name\":\"John\",\"email\":\"john@example.com\",\"age\":25}'"
echo ""
echo "   # Fastify"  
echo "   curl http://localhost:3001/health"
echo "   curl http://localhost:3001/api/users/123"
echo "   curl -X POST http://localhost:3001/api/users -H \"Content-Type: application/json\" -d '{\"name\":\"John\",\"email\":\"john@example.com\",\"age\":25}'"
echo ""
echo "   # Koa"
echo "   curl http://localhost:3003/health"
echo "   curl http://localhost:3003/api/users/123"
echo "   curl -X POST http://localhost:3003/api/users -H \"Content-Type: application/json\" -d '{\"name\":\"John\",\"email\":\"john@example.com\",\"age\":25}'"
echo ""
echo "   # Next.js"
echo "   curl http://localhost:3002/api/health"
echo "   curl http://localhost:3002/api/users/123"
echo "   curl -X POST http://localhost:3002/api/users -H \"Content-Type: application/json\" -d '{\"name\":\"John\",\"email\":\"john@example.com\",\"age\":25}'"
echo ""
echo "📊 Performance Metrics to Compare:"
echo "   • Requests per second (req/sec)"
echo "   • Average latency (ms)"
echo "   • Throughput (MB/sec)"
echo "   • Error rate (%)"
echo "   • GET vs POST performance differences"