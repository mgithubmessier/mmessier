export const MAX_SHAPE_SIDE = 60;
export const VERTICAL_SHAPE_SPREAD_MULTIPLIER = 3;
export const VERTICAL_SPREAD =
  MAX_SHAPE_SIDE * VERTICAL_SHAPE_SPREAD_MULTIPLIER;
export const DRAG_COEFFICIENT = 150;
export const ADDITION_RATE = 10000;

export const getSlideAnimationDuration = () => {
  return window.innerHeight * DRAG_COEFFICIENT;
};
