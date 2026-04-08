import { canHover } from "./canHover";

export function createExpandable(hasExtra: boolean = true) {
  let expanded = $state(false);

  return {
    get expanded() {
      return expanded;
    },
    onclick() {
      if (hasExtra && !canHover) expanded = !expanded;
    },
    onmouseenter() {
      if (hasExtra && canHover) expanded = true;
    },
    onmouseleave() {
      if (hasExtra && canHover) expanded = false;
    },
  };
}
