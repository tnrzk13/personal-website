import { isBrowserSafari } from "./browser";

export function getImagePath(basePath: string): string {
  return `${basePath}.${isBrowserSafari() ? "png" : "avif"}`;
}
