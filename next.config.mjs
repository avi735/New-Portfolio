/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://vvsfizwgqzoesmludgco.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'sb_publishable_X3rKf8e3AVveajAdUGSyBQ_3XzEup7L',
    NEXT_PUBLIC_SUPABASE_TABLE: 'contact_messages',
  },
};

export default nextConfig;
