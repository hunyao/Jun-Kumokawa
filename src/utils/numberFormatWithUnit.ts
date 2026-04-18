export const numberFormatWithUnit = (n: number, unit?: string) => {
  const _numberFormat = Intl.NumberFormat('en-US', {
    style: 'unit',
    unit,
  });
  return _numberFormat.format(n);
};
