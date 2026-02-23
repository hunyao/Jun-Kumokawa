import { octokit } from '@lib/index';
import type {
  EndpointKeys,
  Endpoints,
  RequestParameters,
  ResponseHeaders,
} from '@octokit/types';
import { expect, test, vi } from 'vitest';
import { getSha1Digest } from '.';

// biome-ignore lint/suspicious/noExplicitAny: reason
type AnyFunction = (...args: any[]) => any;
type CachedResponse<T> = {
  status: number;
  headers: ResponseHeaders;
  data: T;
};
// biome-ignore lint/suspicious/noExplicitAny: reason
const cache = new Map<string, CachedResponse<any>>();
export const clearRequestCache = () => {
  cache.clear();
};
export const request = async <T extends EndpointKeys>(
  url: T,
  // biome-ignore lint/suspicious/noExplicitAny: reason
  options?: any,
) => {
  const cacheKey = await getSha1Digest(`${url}${JSON.stringify(options)}`);
  const cached = cache.get(cacheKey);
  if (cached) return cached;
  const res = await octokit.request<typeof url>(url, options);
  const cachedRes = {
    status: res.status,
    headers: res.headers,
    data: res.data,
  } satisfies CachedResponse<(typeof res)['data']>;
  cache.set(cacheKey, cachedRes);
  return cachedRes;
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

if (import.meta.vitest) {
  test('requestRecursively: returns empty array when first response has no data', async () => {
    const mockFunc = vi.fn().mockResolvedValue({ data: [] });
    // biome-ignore lint/suspicious/noExplicitAny: test purpose
    const result = await requestRecursively(mockFunc as any, {} as any);
    expect(result).toEqual([]);
    expect(mockFunc).toHaveBeenCalledTimes(1);
    expect(mockFunc).toHaveBeenCalledWith({ per_page: 100, page: 1 });
  });

  test('requestRecursively: fetches single page then stops on empty response', async () => {
    const page1 = { data: [{ id: 1 }, { id: 2 }] };
    const mockFunc = vi
      .fn()
      .mockResolvedValueOnce(page1)
      .mockResolvedValueOnce({ data: [] });
    // biome-ignore lint/suspicious/noExplicitAny: test purpose
    const result = await requestRecursively(mockFunc as any, {} as any);
    expect(result).toEqual([page1]);
    expect(mockFunc).toHaveBeenCalledTimes(2);
    expect(mockFunc).toHaveBeenNthCalledWith(1, { per_page: 100, page: 1 });
    expect(mockFunc).toHaveBeenNthCalledWith(2, { per_page: 100, page: 2 });
  });

  test('requestRecursively: fetches multiple pages until empty response', async () => {
    const page1 = { data: [{ id: 1 }] };
    const page2 = { data: [{ id: 2 }] };
    const mockFunc = vi
      .fn()
      .mockResolvedValueOnce(page1)
      .mockResolvedValueOnce(page2)
      .mockResolvedValueOnce({ data: [] });
    // biome-ignore lint/suspicious/noExplicitAny: test purpose
    const result = await requestRecursively(mockFunc as any, {} as any);
    expect(result).toEqual([page1, page2]);
    expect(mockFunc).toHaveBeenCalledTimes(3);
    expect(mockFunc).toHaveBeenNthCalledWith(3, { per_page: 100, page: 3 });
  });
}
