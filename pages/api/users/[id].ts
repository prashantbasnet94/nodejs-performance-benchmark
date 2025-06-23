// pages/api/users/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { performance } from 'perf_hooks';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const start = performance.now();
  const { id } = req.query;
  const userId = parseInt(id as string);
  
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  
  try {
    const user = await fakeDatabase.getUser(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const end = performance.now();
    
    res.status(200).json({
      data: user,
      processingTime: `${(end - start).toFixed(2)}ms`,
      framework: 'Next.js'
    });
  } catch (error: any) {
    console.error('Database error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}