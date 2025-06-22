#!/bin/bash

# benchmark.sh - Performance comparison script

echo "🚀 Express vs Fastify Performance Comparison"
echo "=============================================="

# Check if autocannon is installed
if ! command -v autocannon &> /dev/null; then
    echo "❌ autocannon not found. Installing globally..."
    npm install -g autocannon
fi

echo ""
echo "📋 Test Configuration:"
echo "   - Concurrent connections: 100"
echo "   - Duration: 30 seconds"
echo "   - Endpoint: /api/users/123"
echo ""

# Function to run benchmark
run_benchmark() {
    local url=$1
    local name=$2
    local port=$3
    
    echo "🔥 Testing $name (Port $port)..."
    echo "   URL: $url"
    
    # Check if server is running
    if curl -s "$url/health" > /dev/null; then
        echo "   ✅ Server is running"
        echo "   🏃‍♂️ Running benchmark..."
        autocannon -c 100 -d 30 -p 10 "$url/api/users/123"
    else
        echo "   ❌ Server not responding at $url"
        echo "   📝 Start the server first with: yarn $name"
    fi
    
    echo ""
    echo "----------------------------------------"
    echo ""
}

# Test Express
run_benchmark "http://localhost:3000" "express" "3000"

# Test Fastify  
run_benchmark "http://localhost:3001" "fastify" "3001"

echo "🎯 Benchmark Complete!"
echo ""
echo "💡 To start servers manually:"
echo "   Terminal 1: yarn express"
echo "   Terminal 2: yarn fastify"
echo "   Terminal 3: ./benchmark.sh"
