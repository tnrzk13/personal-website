import { SM_SCREEN_PX } from './breakpoints';

let _isMobile = $state(window.innerWidth < SM_SCREEN_PX);
window.addEventListener('resize', () => {
  _isMobile = window.innerWidth < SM_SCREEN_PX;
});

export const isMobile = {
  get value() { return _isMobile; }
};
