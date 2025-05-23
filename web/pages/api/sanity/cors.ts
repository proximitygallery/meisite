import { NextApiRequest, NextApiResponse } from 'next';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://meisite.vercel.app',
  'https://www.meisite.vercel.app',
  'https://meisite-proximitygallery.vercel.app',
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check the origin
  const origin = req.headers.origin;
  
  // Set CORS headers if origin is allowed
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // For actual requests
  res.status(200).json({ message: 'CORS configured for Sanity' });
} 