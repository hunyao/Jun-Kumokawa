export const numberFormat = (n: number, short: boolean = false) => {
  const _numberFormat = Intl.NumberFormat('en-US', {
    notation: short ? 'compact' : 'standard',
  });
  return _numberFormat.format(n);
};
