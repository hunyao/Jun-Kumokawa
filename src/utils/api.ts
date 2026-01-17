import { octokit } from '@lib/index';
import type {
  EndpointKeys,
  Endpoints,
  RequestParameters,
} from '@octokit/types';
import { getSha1Digest } from '.';

// biome-ignore lint/suspicious/noExplicitAny: reason
type AnyFunction = (...args: any[]) => any;
// biome-ignore lint/suspicious/noExplicitAny: reason
const cache = new Map<string, any>();
export const request = async <T extends EndpointKeys>(
  url: T,
  // biome-ignore lint/suspicious/noExplicitAny: reason
  options?: any,
) => {
  const cacheKey = await getSha1Digest(`${url}${JSON.stringify(options)}`);
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  const res = await octokit.request<typeof url>(url, options);
  cache.set(cacheKey, res);
  return res;
};

export const requestRecursively = async <
  T extends keyof Endpoints,
  U extends AnyFunction,
>(
  func: U,
  options: RequestParameters & Endpoints[T]['parameters'],
): Promise<Array<Awaited<ReturnType<typeof func>>>> => {
  let p = 1;
  let arr: Array<Awaited<ReturnType<typeof func>>> = [];

  while (true) {
    const res = await func({ ...options, per_page: 100, page: p });
    if (res.data.length === 0) {
      break;
    } else {
      arr = arr.concat(res);
      p += 1;
    }
  }
  return arr;
};
