#!/bin/bash

# nextjs-benchmark.sh - Next.js Performance Testing Script

echo "🚀 Next.js Performance Benchmark"
echo "================================="

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
    echo "🔥 Testing Next.js GET Performance (Port 3002)..."
    echo "   URL: http://localhost:3002/api/users/123"
    
    # Check if server is running
    if curl -s "http://localhost:3002/api/health" > /dev/null; then
        echo "   ✅ Server is running"
        echo "   🏃‍♂️ Running GET benchmark..."
        echo ""
        autocannon -c 100 -d 30 -p 10 "http://localhost:3002/api/users/123"
    else
        echo "   ❌ Server not responding at http://localhost:3002"
        echo "   📝 Start the server first with: yarn dev"
    fi
    
    echo ""
    echo "=========================================="
    echo ""
}

# Function to run POST benchmark
run_post_benchmark() {
    echo "🔥 Testing Next.js POST Performance (Port 3002)..."
    echo "   URL: http://localhost:3002/api/users"
    
    # Check if server is running
    if curl -s "http://localhost:3002/api/health" > /dev/null; then
        echo "   ✅ Server is running"
        echo "   🏃‍♂️ Running POST benchmark..."
        echo ""
        autocannon -c 100 -d 30 -p 10 \
            -m POST \
            -H "Content-Type: application/json" \
            -b '{"name":"TestUser","email":"test@example.com","age":25}' \
            "http://localhost:3002/api/users"
    else
        echo "   ❌ Server not responding at http://localhost:3002"
        echo "   📝 Start the server first with: yarn dev"
    fi
    
    echo ""
    echo "=========================================="
    echo ""
}

# Run benchmarks
run_get_benchmark
run_post_benchmark

echo "🎯 Next.js Benchmark Complete!"
echo ""
echo "💡 Quick Start:"
echo "   Terminal 1: yarn dev              # Starts Next.js on port 3002"
echo "   Terminal 2: ./nextjs-benchmark.sh # Runs this benchmark script"
echo ""
echo "🧪 Manual Testing Commands:"
echo "   curl http://localhost:3002/api/health"
echo "   curl http://localhost:3002/api/users/123"
echo "   curl -X POST http://localhost:3002/api/users -H \"Content-Type: application/json\" -d '{\"name\":\"John\",\"email\":\"john@example.com\",\"age\":25}'"
echo ""
echo "📊 Performance Metrics:"
echo "   • Requests per second (req/sec)"
echo "   • Average latency (ms)"
echo "   • Throughput (MB/sec)"
echo "   • Error rate (%)"