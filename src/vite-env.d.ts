/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string
  readonly VITE_STUDIO_ENDPOINT_AUTH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}