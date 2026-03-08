import { isBrowserSafari } from "../components/Browser/BrowserCheck.svelte";

export function getImagePath(basePath: string): string {
  return `${basePath}.${isBrowserSafari() ? "png" : "avif"}`;
}
