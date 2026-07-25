/** @type {import('next').NextConfig} */
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Security headers to fix Best Practices audit issues:
// CSP, X-Frame-Options, COOP, Referrer-Policy, Permissions-Policy
const securityHeaders = [
  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Clickjacking protection (also handles XFO audit)
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Referrer info control
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Cross-Origin Opener Policy (handles COOP audit)
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  // Permissions policy
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Content Security Policy (handles XSS audit)
  // Note: 'unsafe-eval' is needed for Three.js WebGL shader compilation
  // Note: 'unsafe-inline' is required by Next.js runtime + Tailwind
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
      "worker-src blob: 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig = {
  reactCompiler: true,
  // Supabase credentials are loaded from .env.local — do NOT hardcode them here.

  // Silence the workspace-root inference warning when running dev with --webpack
  turbopack: {
    root: __dirname,
  },

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
