export function createExpandable(hasExtra: (() => boolean) | boolean = true) {
  const getHasExtra = typeof hasExtra === "function" ? hasExtra : () => hasExtra;
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
      if (getHasExtra() && lastPointerType !== "mouse") expanded = !expanded;
    },
    onpointerenter(e: PointerEvent) {
      if (getHasExtra() && e.pointerType === "mouse") expanded = true;
    },
    onpointerleave(e: PointerEvent) {
      if (getHasExtra() && e.pointerType === "mouse") expanded = false;
    },
  };
}
