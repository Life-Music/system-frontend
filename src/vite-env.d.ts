/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_STUDIO_ENDPOINT_AUTH: string;
  readonly VITE_VAPID_KEY: string;
  readonly VITE_BUILD_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
