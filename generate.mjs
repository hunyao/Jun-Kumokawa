import { Octokit } from 'octokit';

const octokit = new Octokit();

console.log(
  `import type { Endpoints, RequestParameters } from "@octokit/types"
import { request } from "./api"

// type AnyFunction = (...args: any[]) => any;
// export type EndpointHandler = <T extends keyof Endpoints, U extends AnyFunction>(options: RequestParameters & Endpoints[T]['parameters']) => ReturnType<typeof request<T, U>>
`,
);

for (const ent of Object.entries(octokit.rest.repos)) {
  if (ent[0] === 'uploadReleaseAsset') continue;

  const { method, url } = ent[1].endpoint.DEFAULTS;
  const methodName = ent[0][0].toUpperCase() + ent[0].slice(1);
  console.log(
    `export const repos${methodName} = (options: RequestParameters & Endpoints['${method} ${url}']['parameters']) => 
  request('${method} ${url}', options)`,
  );
}
for (const ent of Object.entries(octokit.rest.git)) {
  const { method, url } = ent[1].endpoint.DEFAULTS;
  const methodName = ent[0][0].toUpperCase() + ent[0].slice(1);
  console.log(
    `export const git${methodName} = (options: RequestParameters & Endpoints['${method} ${url}']['parameters']) => 
  request('${method} ${url}', options)`,
  );
}
