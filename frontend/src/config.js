/**
 * Configuration file that automatically detects environment
 * and provides the appropriate backend URL
 */

const getBackendUrl = () => {
  // First, try to get from environment variables (for local development)
  if (process.env.REACT_APP_BACKEND_URL) {
    return process.env.REACT_APP_BACKEND_URL;
  }

  // For production/deployment, determine based on current hostname
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // If deployed on Vercel
    if (hostname.includes('vercel.app')) {
      return `https://${hostname}`;
    }
    
    // If deployed on Emergent preview
    if (hostname.includes('emergentagent.com')) {
      return `https://${hostname}`;
    }
    
    // For custom domains, use the same domain
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return `${window.location.protocol}//${hostname}`;
    }
  }
  
  // Fallback for local development
  return 'http://localhost:8001';
};

export const BACKEND_URL = getBackendUrl();

export default {
  BACKEND_URL,
};
