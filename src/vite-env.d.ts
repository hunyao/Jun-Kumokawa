/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_API_CLIENT_ID: string;
  readonly VITE_GITHUB_API_REDIRECT_URI: string;
  readonly VITE_GITHUB_API_SCOPE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
