const REVEAL_CLASS = "revealed";

const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type RevealMeta = {
    options?: { delay?: number; propagateTo?: string; propagateDelayMs?: number };
    propagateTimer?: ReturnType<typeof setTimeout>;
    rafId?: number;
};

const nodeMap = new Map<Element, RevealMeta>();

function revealNode(node: HTMLElement, meta: RevealMeta, skipDelay = false) {
    node.classList.add(REVEAL_CLASS);
    const ancestor = meta.options?.propagateTo
        ? node.closest(meta.options.propagateTo)
        : null;
    if (!ancestor) return;

    const delayMs = skipDelay ? 0 : (meta.options?.propagateDelayMs ?? 0);
    if (delayMs > 0) {
        meta.propagateTimer = setTimeout(
            () => ancestor.classList.add(REVEAL_CLASS),
            delayMs
        );
    } else {
        ancestor.classList.add(REVEAL_CLASS);
    }
}

const sharedObserver = new IntersectionObserver(
    (entries) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            const meta = nodeMap.get(entry.target);
            if (!meta) continue;

            revealNode(entry.target as HTMLElement, meta);
            sharedObserver.unobserve(entry.target);
            nodeMap.delete(entry.target);
        }
    },
    { threshold: 0.1 }
);

/** Delay between consecutive sibling reveals within a section */
export const REVEAL_STAGGER_MS = 60;

/** Delay before the first child in a section starts revealing */
export const REVEAL_BASE_DELAY_MS = 50;

/** Convenience: compute the reveal delay for a staggered child */
export function staggerDelayMs(index: number, baseMs = REVEAL_BASE_DELAY_MS): number {
    return baseMs + index * REVEAL_STAGGER_MS;
}

export function reveal(
    node: HTMLElement,
    options?: { delay?: number; propagateTo?: string; propagateDelayMs?: number }
) {
    const meta: RevealMeta = { options };

    if (prefersReducedMotion()) {
        revealNode(node, meta, true);
        return;
    }

    if (options?.delay && options.delay > 0) {
        node.style.transitionDelay = `${options.delay}ms`;
    }

    nodeMap.set(node, meta);
    sharedObserver.observe(node);

    // Browser restores scroll position after mount, so elements above
    // the viewport appear in-viewport at mount time. Check after one
    // frame when scroll restoration has completed.
    meta.rafId = requestAnimationFrame(() => {
        if (node.getBoundingClientRect().bottom <= 0) {
            revealNode(node, meta, true);
            sharedObserver.unobserve(node);
            nodeMap.delete(node);
        }
    });

    return {
        destroy() {
            sharedObserver.unobserve(node);
            nodeMap.delete(node);
            clearTimeout(meta.propagateTimer);
            if (meta.rafId !== undefined) cancelAnimationFrame(meta.rafId);
        },
    };
}
