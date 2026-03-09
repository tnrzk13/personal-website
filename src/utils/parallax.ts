export const getContactParallax = (
  layer: number,
  numImgLayers: number,
  imgHeight: number,
  yScroll: number,
  contactYOffset: number
): number => {
  const parallaxDepth = numImgLayers + 4;
  const layerize = (x: number) => (x * layer) / parallaxDepth;
  const reverseLayerize = (x: number) =>
    (x * (parallaxDepth - layer)) / parallaxDepth;
  return Math.max(
    0,
    layerize(imgHeight - yScroll) + reverseLayerize(contactYOffset)
  );
};

export const getLayerScale = (layer: number): string => {
  if (layer >= 7) return " scale(1.04)";
  if (layer >= 5) return " scale(1.02)";
  return "";
};

export const getLayerOpacity = (layer: number): number => {
  if (layer === 0) return 0.85;
  if (layer === 1) return 0.92;
  return 1;
};

export const getLayerOffsetPx = (layer: number): number => {
  if (layer >= 9) return 10;
  if (layer >= 7) return 25;
  if (layer >= 5) return 40;
  if (layer >= 1) return 50;
  return 0;
};
