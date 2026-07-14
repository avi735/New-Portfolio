import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ThreeBackground from './components/ThreeBackground';
import Preloader from './components/Preloader';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Avinash Kumar | QA Automation & Full-Stack Engineer',
  description:
    'QA Automation Engineer, Full-Stack Developer, and AI Integration Specialist. Building scalable platforms and automating complex systems.',
  keywords: [
    'QA Automation',
    'Selenium',
    'Playwright',
    'Full-Stack Developer',
    'AI Integration',
    'Gemini API',
    'Linux',
    'TestNG',
  ],
  authors: [{ name: 'Avinash Kumar' }],
  creator: 'Avinash Kumar',
  metadataBase: new URL('https://avinashkumar.dev'), // Fallback URL, assuming .dev or similar
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Avinash Kumar | QA Automation & Full-Stack Engineer',
    description: 'Building scalable platforms and automating complex systems.',
    url: 'https://avinashkumar.dev',
    siteName: 'Avinash Kumar Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avinash Kumar | QA Automation & Full-Stack Engineer',
    description: 'Building scalable platforms and automating complex systems.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Avinash Kumar',
  jobTitle: 'QA Automation & Full-Stack Engineer',
  url: 'https://avinashkumar.dev',
  sameAs: [
    'https://www.linkedin.com/in/avinash-kumar-a1444a31b/',
    'https://github.com/avi735'
  ]
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      style={{ backgroundColor: '#080c18' }}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-100">
        <Preloader />
        <ThreeBackground />
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
