const REVEAL_CLASS = "revealed";

const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function reveal(
    node: HTMLElement,
    options?: { delay?: number; propagateTo?: string; propagateDelayMs?: number }
) {
    let propagateTimer: ReturnType<typeof setTimeout> | undefined;

    const revealNode = (skipDelay = false) => {
        node.classList.add(REVEAL_CLASS);
        const ancestor = options?.propagateTo
            ? node.closest(options.propagateTo)
            : null;
        if (!ancestor) return;

        const delayMs = skipDelay ? 0 : (options?.propagateDelayMs ?? 0);
        if (delayMs > 0) {
            propagateTimer = setTimeout(
                () => ancestor.classList.add(REVEAL_CLASS),
                delayMs
            );
        } else {
            ancestor.classList.add(REVEAL_CLASS);
        }
    };

    if (prefersReducedMotion()) {
        revealNode(true);
        return;
    }

    const delayMs = options?.delay ?? 0;
    if (delayMs > 0) {
        node.style.transitionDelay = `${delayMs}ms`;
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                revealNode();
                observer.unobserve(node);
            }
        },
        { threshold: 0.1 }
    );

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
            clearTimeout(propagateTimer);
        },
    };
}
