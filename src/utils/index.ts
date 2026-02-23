export const numberFormat = (n: number, short: boolean = false) => {
  const _numberFormat = Intl.NumberFormat('en-US', {
    notation: short ? 'compact' : 'standard',
  });
  return _numberFormat.format(n);
};
export const numberFormatWithUnit = (n: number, unit?: string) => {
  const _numberFormat = Intl.NumberFormat('en-US', {
    style: 'unit',
    unit,
  });
  return _numberFormat.format(n);
};

export * from './api';
export * from './b64ToBuf';
export * from './b64ToUtf8';
export * from './extractPageInfo';
export * from './filterByText';
export * from './genRange';
export * from './getAllCommitCounts';
export * from './getContentType';
export * from './getSha1Digest';
