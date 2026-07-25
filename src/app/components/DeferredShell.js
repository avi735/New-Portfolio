'use client';

/**
 * DeferredShell — Client Component that lazily loads ONLY Three.js.
 * (Preloader is imported synchronously in layout.js for correct LCP behaviour.)
 *
 * Why ssr:false here and not in a Server Component:
 *   Next.js 16 forbids ssr:false dynamic() in Server Components.
 */
import dynamic from 'next/dynamic';

const ThreeBackground = dynamic(() => import('./ThreeBackground'), {
  ssr: false,
  loading: () => null,
});

export default function DeferredShell() {
  return <ThreeBackground />;
}
