export const MAX_SHAPE_SIDE = 60;
export const VERTICAL_SHAPE_SPREAD_MULTIPLIER = 3;
// add an additonal 1 there so that the the shape cannot overflow past the spread
export const VERTICAL_SPREAD =
  MAX_SHAPE_SIDE * (VERTICAL_SHAPE_SPREAD_MULTIPLIER + 1);
export const ADDITION_RATE = 25000;

export const getSlideAnimationDuration = () => {
  return Math.ceil((window.innerHeight / VERTICAL_SPREAD + 1) * ADDITION_RATE);
};
