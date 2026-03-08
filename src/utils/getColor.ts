import Color from 'color';

/**
 * Returns a lightened or darkened color based on the given RGB code and level
 *
 * @param {number[]} code RGB color code
 * @param {number} level Intensity of lightening/darkening (multiplied by 0.1)
 * @returns {Color} adjusted color
 */
export const getColor = (code: number[], level: number) => {
  const baseColor = Color.rgb(code);
  if (baseColor.isDark()) {
    return baseColor.lighten(0.1 * level);
  } else {
    return baseColor.darken(0.1 * level);
  }
};
