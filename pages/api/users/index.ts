// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { performance } from 'perf_hooks';

// Validation function
const validateUser = (body: any) => {
  const { name, email, age } = body;
  
  if (!name || typeof name !== 'string' || name.length < 2) {
    return 'Name must be at least 2 characters';
  }
  
  if (!email || !email.includes('@')) {
    return 'Valid email required';
  }
  
  if (!age || typeof age !== 'number' || age < 18) {
    return 'Age must be 18 or older';
  }
  
  return null;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const start = performance.now();
  
  // Validate request body
  const validationError = validateUser(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }
  
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
    framework: 'Next.js'
  });
}