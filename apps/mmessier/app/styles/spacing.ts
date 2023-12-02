import spacingSCSS from './spacing.module.scss';
// import { Breakpoint } from '../../types';

enum Breakpoint {
  SMALL = 'small',
  MEDIUM = 'medium',
  DEFAULT = 'default',
}
export const spacingLevel = (level: number, breakpoint: Breakpoint) => {
  let baseSpacing = Number(spacingSCSS.defaultSpacing);
  if (breakpoint === Breakpoint.SMALL) {
    baseSpacing = Number(spacingSCSS.smallSpacing);
  } else if (breakpoint === Breakpoint.MEDIUM) {
    baseSpacing = Number(spacingSCSS.mediumSpacing);
  }
  return baseSpacing * level;
};
