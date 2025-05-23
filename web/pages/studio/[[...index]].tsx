import Head from 'next/head';
import { NextStudio } from 'next-sanity/studio';
import { useEffect, useState } from 'react';
import config from '../../sanity.config';

export default function StudioPage() {
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  
  // Function to fetch debug info
  const fetchDebugInfo = async () => {
    try {
      const response = await fetch('/api/sanity/cors');
      const data = await response.json();
      setDebugInfo({
        corsResponse: data,
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        environment: process.env.NODE_ENV,
        host: window.location.host,
      });
    } catch (err) {
      console.error('Debug info fetch error:', err);
      setDebugInfo({ error: 'Failed to fetch debug info' });
    }
  };

  useEffect(() => {
    // Fetch debug info on mount
    fetchDebugInfo();
    
    // Add global error handler for Sanity-related errors
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', event);
      if (event.message.includes('sanity') || event.message.includes('CORS')) {
        setError('Authentication error with Sanity. Please check your browser console for details.');
      }
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const retryStudio = () => {
    setError(null);
    fetchDebugInfo();
    window.location.reload();
  };

  if (error) {
    return (
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
        <h1>Sanity Studio Error</h1>
        <p style={{ color: 'red' }}>{error}</p>
        
        <div style={{ marginTop: '2rem' }}>
          <h2>Debug Information</h2>
          <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto' }}>
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <h2>Troubleshooting Steps</h2>
          <ol>
            <li>Check that your CORS settings in the Sanity management console include your domain</li>
            <li>Verify that "Allow credentials" is checked for your domain</li>
            <li>Clear your browser cache and cookies</li>
            <li>Try using an incognito/private browsing window</li>
          </ol>
        </div>
        
        <button 
          onClick={retryStudio}
          style={{ 
            marginTop: '1rem', 
            padding: '0.5rem 1rem', 
            background: '#2276FC', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry Studio
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Sanity Studio</title>
        <meta name="description" content="Sanity Studio for Mei Lenehan Portfolio" />
      </Head>
      <NextStudio config={config} />
    </>
  );
}

// Force dynamic to ensure studio always reloads properly
export const dynamic = 'force-dynamic';

// Tell Next.js to use this path for the page
export const metadata = {
  title: 'Sanity Studio | Mei Lenehan Portfolio',
}; 