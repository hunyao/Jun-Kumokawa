export const overrideSearchParams = (
  searchParams: URLSearchParams,
  overrides: Record<string, string>,
) => {
  return new URLSearchParams({
    ...Object.fromEntries(searchParams.entries()),
    ...overrides,
  });
};
