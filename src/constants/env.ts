[
  'VITE_GITHUB_API_CLIENT_ID',
  'VITE_GITHUB_API_REDIRECT_URI',
  'VITE_GITHUB_API_SCOPE',
  'VITE_API_ENDPOINT',
  'VITE_REPOSITORY_OWNER',
  'VITE_REPOSITORY_NAME',
  'VITE_CACHE_TTL_MS',
].forEach((key) => {
  if (import.meta.env[key] !== undefined) return;
  throw new Error(`Env \`${key}\` is missing.`);
});
export const ENV = {
  GITHUB_API_CLIENT_ID: import.meta.env.VITE_GITHUB_API_CLIENT_ID,
  GITHUB_API_REDIRECT_URI: import.meta.env.VITE_GITHUB_API_REDIRECT_URI,
  GITHUB_API_SCOPE: import.meta.env.VITE_GITHUB_API_SCOPE,
  API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT,
  REPOSITORY_OWNER: import.meta.env.VITE_REPOSITORY_OWNER,
  REPOSITORY_NAME: import.meta.env.VITE_REPOSITORY_NAME,
  CACHE_TTL_MS: Number(import.meta.env.VITE_CACHE_TTL_MS),
} as const;
