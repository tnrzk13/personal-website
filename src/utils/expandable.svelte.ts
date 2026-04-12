export function createExpandable(hasExtra: boolean = true) {
  let expanded = $state(false);
  let lastPointerType = "";

  return {
    get expanded() {
      return expanded;
    },
    onpointerdown(e: PointerEvent) {
      lastPointerType = e.pointerType;
    },
    onclick() {
      if (hasExtra && lastPointerType !== "mouse") expanded = !expanded;
    },
    onpointerenter(e: PointerEvent) {
      if (hasExtra && e.pointerType === "mouse") expanded = true;
    },
    onpointerleave(e: PointerEvent) {
      if (hasExtra && e.pointerType === "mouse") expanded = false;
    },
  };
}
