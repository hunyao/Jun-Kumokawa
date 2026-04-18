const createApiEndpointURL = (endpoint: string) =>
  `${import.meta.env.VITE_API_ENDPOINT}${endpoint}`;

export const ApiEndpoints = {
  CALLBACK: createApiEndpointURL('/callback'),
  CODE_CHALLENGE: createApiEndpointURL('/code-challenge'),
  PROFILE: createApiEndpointURL('/data/profile'),
  EXPERIENCE: createApiEndpointURL('/data/experience'),
  SKILL: createApiEndpointURL('/data/skills'),
  COW: createApiEndpointURL('/data/cow'),
} as const;
export type ApiEndpoint = keyof typeof ApiEndpoints;
