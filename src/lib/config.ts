/**
 * Environment Configuration
 * 
 * Create a .env.local file in the root directory with:
 * NEXT_PUBLIC_API_URL=http://localhost:8000/api
 */

export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  appName: "CTF Platform",
  appDescription: "Capture The Flag Challenges Platform",
  
  // Query settings
  defaultStaleTime: 1000 * 60 * 5, // 5 minutes
  
  // Pagination
  defaultPageSize: 20,
  
  // Flag format
  flagPrefix: "CTF{",
  flagSuffix: "}",
};

export default config;
