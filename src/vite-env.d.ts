/// <reference types="vite/client" />

// Extend Vite's ImportMetaEnv with your environment variables
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  // Add more VITE_ variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Image modules
declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}