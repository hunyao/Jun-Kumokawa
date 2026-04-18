/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_API_CLIENT_ID: string;
  readonly VITE_GITHUB_API_REDIRECT_URI: string;
  readonly VITE_GITHUB_API_SCOPE: string;
  readonly VITE_API_ENDPOINT: string;
}

// biome-ignore lint/correctness/noUnusedVariables: reason
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
