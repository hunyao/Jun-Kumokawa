/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_API_CLIENT_ID: string;
  readonly VITE_GITHUB_API_REDIRECT_URI: string;
  readonly VITE_GITHUB_API_SCOPE: string;
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_REPOSITORY_OWNER: string;
  readonly VITE_REPOSITORY_NAME: string;
  readonly VITE_CACHE_TTL_MS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
