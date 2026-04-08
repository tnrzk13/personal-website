export function lazyPlayback(video: HTMLVideoElement) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    },
    { threshold: 0.25, rootMargin: "200px" },
  );

  observer.observe(video);

  return {
    destroy() {
      observer.disconnect();
    },
  };
}
