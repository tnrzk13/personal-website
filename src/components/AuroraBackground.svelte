<script lang="ts">
    type BlobGroup = 'top' | 'career' | 'bottom';

    const BLOB_GROUPS: Record<BlobGroup, { id: number; top: string }[]> = {
        top:    [{ id: 1, top: '10%' }, { id: 2, top: '17%' }, { id: 3, top: '67%' }],
        career: [{ id: 4, top: '9%' }, { id: 9, top: '23%' }, { id: 5, top: '40%' }, { id: 6, top: '69%' }, { id: 7, top: '100%' }],
        bottom: [{ id: 10, top: '20%' }, { id: 8, top: '31%' }, { id: 11, top: '60%' }, { id: 12, top: '77%' }],
    };

    let { group, freezeHeight = false }: { group: BlobGroup, freezeHeight?: boolean } = $props();

    let auroraEl: HTMLDivElement;
    let frozenHeightPx = $state(0);
    let visible = $state(false);

    $effect(() => {
        if (!freezeHeight || !auroraEl?.parentElement) return;
        const updateHeight = () => { frozenHeightPx = auroraEl.parentElement!.clientHeight; };
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    });

    $effect(() => {
        if (!auroraEl) return;
        const observer = new IntersectionObserver(
            ([entry]) => { visible = entry.isIntersecting; },
            { rootMargin: '200px' }
        );
        observer.observe(auroraEl);
        return () => observer.disconnect();
    });
</script>

<div
    class="aurora"
    class:paused={!visible}
    aria-hidden="true"
    bind:this={auroraEl}
    style={freezeHeight && frozenHeightPx ? `height: ${frozenHeightPx}px` : undefined}
>
    {#each BLOB_GROUPS[group] as blob (blob.id)}
        <div class="aurora-blob blob-{blob.id}" style="top: {blob.top}"></div>
    {/each}
</div>

<style>
    .aurora {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
    }

    .aurora-blob {
        position: absolute;
        mix-blend-mode: screen;
        will-change: transform;
    }

    /* Blob 1 - Cyan, top-left */
    .blob-1 {
        width: 700px;
        height: 550px;
        left: 10%;
        background: radial-gradient(ellipse at 30% 40%, rgba(109, 213, 250, 1) 0%, rgba(109, 213, 250, 0.4) 50%, transparent 70%);
        filter: blur(50px);
        opacity: 0.4;
        border-radius: 40% 60% 55% 45% / 55% 40% 60% 50%;
        animation: blob-1 17s ease-in-out infinite;
    }

    /* Blob 2 - Pink, top-right */
    .blob-2 {
        width: 640px;
        height: 520px;
        right: 8%;
        background: radial-gradient(ellipse at 65% 35%, rgba(252, 165, 241, 1) 0%, rgba(252, 165, 241, 0.4) 50%, transparent 70%);
        filter: blur(50px);
        opacity: 0.35;
        border-radius: 55% 45% 50% 50% / 45% 55% 45% 55%;
        animation: blob-2 23s ease-in-out infinite;
    }

    /* Blob 3 - Purple, upper-mid left */
    .blob-3 {
        width: 750px;
        height: 600px;
        left: 5%;
        background: radial-gradient(ellipse at 40% 65%, rgba(142, 45, 226, 1) 0%, rgba(142, 45, 226, 0.4) 50%, transparent 70%);
        filter: blur(55px);
        opacity: 0.3;
        border-radius: 45% 55% 60% 40% / 50% 45% 55% 50%;
        animation: blob-3 29s ease-in-out infinite;
    }

    /* Blob 4 - Orange, mid-left */
    .blob-4 {
        width: 650px;
        height: 520px;
        left: 15%;
        background: radial-gradient(ellipse at 70% 30%, rgba(240, 184, 102, 1) 0%, rgba(240, 184, 102, 0.4) 50%, transparent 70%);
        filter: blur(70px);
        opacity: 0.38;
        border-radius: 60% 40% 45% 55% / 40% 60% 50% 50%;
        animation: blob-4 19s ease-in-out infinite;
    }

    /* Blob 5 - Blue, mid-right */
    .blob-5 {
        width: 750px;
        height: 600px;
        right: 3%;
        background: radial-gradient(ellipse at 35% 55%, rgba(5, 117, 230, 1) 0%, rgba(5, 117, 230, 0.4) 50%, transparent 70%);
        filter: blur(75px);
        opacity: 0.42;
        border-radius: 50% 50% 55% 45% / 55% 45% 40% 60%;
        animation: blob-5 31s ease-in-out infinite;
    }

    /* Blob 6 - Cyan, mid-left */
    .blob-6 {
        width: 700px;
        height: 580px;
        left: 8%;
        background: radial-gradient(ellipse at 60% 45%, rgba(109, 213, 250, 1) 0%, rgba(109, 213, 250, 0.4) 50%, transparent 70%);
        filter: blur(75px);
        opacity: 0.4;
        border-radius: 42% 58% 48% 52% / 52% 48% 58% 42%;
        animation: blob-6 37s ease-in-out infinite;
    }

    /* Blob 7 - Pink, lower-center */
    .blob-7 {
        width: 720px;
        height: 580px;
        left: 25%;
        background: radial-gradient(ellipse at 25% 60%, rgba(252, 165, 241, 1) 0%, rgba(252, 165, 241, 0.4) 50%, transparent 70%);
        filter: blur(80px);
        opacity: 0.4;
        border-radius: 58% 42% 52% 48% / 48% 52% 42% 58%;
        animation: blob-7 41s ease-in-out infinite;
    }

    /* Blob 8 - Purple, lower-right */
    .blob-8 {
        width: 750px;
        height: 600px;
        right: 5%;
        background: radial-gradient(ellipse at 55% 30%, rgba(142, 45, 226, 1) 0%, rgba(142, 45, 226, 0.4) 50%, transparent 70%);
        filter: blur(80px);
        opacity: 0.4;
        border-radius: 45% 55% 42% 58% / 58% 42% 55% 45%;
        animation: blob-8 43s ease-in-out infinite;
    }

    /* Blob 9 - Orange, mid-right */
    .blob-9 {
        width: 650px;
        height: 530px;
        right: 10%;
        background: radial-gradient(ellipse at 45% 70%, rgba(240, 184, 102, 1) 0%, rgba(240, 184, 102, 0.4) 50%, transparent 70%);
        filter: blur(70px);
        opacity: 0.35;
        border-radius: 52% 48% 58% 42% / 42% 58% 48% 52%;
        animation: blob-9 47s ease-in-out infinite;
    }

    /* Blob 10 - Cyan, lower-left */
    .blob-10 {
        width: 700px;
        height: 560px;
        left: 5%;
        background: radial-gradient(ellipse at 30% 50%, rgba(109, 213, 250, 1) 0%, rgba(109, 213, 250, 0.4) 50%, transparent 70%);
        filter: blur(80px);
        opacity: 0.38;
        border-radius: 48% 52% 45% 55% / 55% 45% 52% 48%;
        animation: blob-10 53s ease-in-out infinite;
    }

    /* Blob 11 - Blue, bottom-center */
    .blob-11 {
        width: 720px;
        height: 580px;
        left: 20%;
        background: radial-gradient(ellipse at 65% 40%, rgba(5, 117, 230, 1) 0%, rgba(5, 117, 230, 0.4) 50%, transparent 70%);
        filter: blur(80px);
        opacity: 0.4;
        border-radius: 55% 45% 52% 48% / 45% 55% 48% 52%;
        animation: blob-11 59s ease-in-out infinite;
    }

    /* Blob 12 - Orange, bottom-right */
    .blob-12 {
        width: 680px;
        height: 540px;
        right: 8%;
        background: radial-gradient(ellipse at 50% 65%, rgba(240, 184, 102, 1) 0%, rgba(240, 184, 102, 0.4) 50%, transparent 70%);
        filter: blur(75px);
        opacity: 0.38;
        border-radius: 42% 58% 55% 45% / 50% 50% 42% 58%;
        animation: blob-12 61s ease-in-out infinite;
    }

    @keyframes blob-1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(25vw, 5vh) scale(1.12, 0.95); }
        50% { transform: translate(15vw, -8vh) scale(0.88, 1.06); }
        75% { transform: translate(30vw, 10vh) scale(1.05, 0.92); }
    }

    @keyframes blob-2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(-20vw, 8vh) scale(0.9, 1.08); }
        50% { transform: translate(-10vw, 25vh) scale(1.14, 0.93); }
        75% { transform: translate(-25vw, 5vh) scale(0.92, 1.04); }
    }

    @keyframes blob-3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        20% { transform: translate(20vw, -5vh) scale(1.08, 0.94); }
        40% { transform: translate(10vw, 10vh) scale(0.88, 1.06); }
        60% { transform: translate(25vw, 5vh) scale(1.12, 0.9); }
        80% { transform: translate(5vw, -10vh) scale(0.93, 1.08); }
    }

    @keyframes blob-4 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(-15vw, -10vh) scale(1.1, 0.92); }
        50% { transform: translate(-25vw, 5vh) scale(0.9, 1.08); }
        75% { transform: translate(10vw, -15vh) scale(1.06, 0.95); }
    }

    @keyframes blob-5 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        20% { transform: translate(-15vw, -10vh) scale(1.08, 0.92); }
        40% { transform: translate(-5vw, 8vh) scale(0.88, 1.06); }
        60% { transform: translate(-20vw, -5vh) scale(1.1, 0.93); }
        80% { transform: translate(-10vw, 12vh) scale(0.93, 1.06); }
    }

    @keyframes blob-6 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(20vw, -8vh) scale(1.08, 0.93); }
        50% { transform: translate(30vw, 5vh) scale(0.9, 1.08); }
        75% { transform: translate(10vw, -12vh) scale(1.1, 0.92); }
    }

    @keyframes blob-7 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        20% { transform: translate(-18vw, 6vh) scale(0.92, 1.06); }
        40% { transform: translate(-8vw, -10vh) scale(1.1, 0.92); }
        60% { transform: translate(-22vw, 3vh) scale(0.88, 1.05); }
        80% { transform: translate(-5vw, -8vh) scale(1.06, 0.94); }
    }

    @keyframes blob-8 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(15vw, -6vh) scale(1.12, 0.93); }
        50% { transform: translate(25vw, 8vh) scale(0.9, 1.06); }
        75% { transform: translate(8vw, -10vh) scale(1.06, 0.94); }
    }

    @keyframes blob-9 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(-18vw, 6vh) scale(1.08, 0.93); }
        50% { transform: translate(-8vw, -8vh) scale(0.92, 1.06); }
        75% { transform: translate(-22vw, 10vh) scale(1.1, 0.9); }
    }

    @keyframes blob-10 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        20% { transform: translate(-12vw, 8vh) scale(0.9, 1.06); }
        40% { transform: translate(8vw, -6vh) scale(1.1, 0.92); }
        60% { transform: translate(-18vw, 10vh) scale(0.93, 1.08); }
        80% { transform: translate(5vw, -12vh) scale(1.08, 0.94); }
    }

    @keyframes blob-11 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(15vw, -8vh) scale(1.1, 0.93); }
        50% { transform: translate(-10vw, 6vh) scale(0.9, 1.06); }
        75% { transform: translate(20vw, 10vh) scale(1.06, 0.94); }
    }

    @keyframes blob-12 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        20% { transform: translate(-20vw, -5vh) scale(1.08, 0.93); }
        40% { transform: translate(-10vw, 8vh) scale(0.88, 1.06); }
        60% { transform: translate(-25vw, -8vh) scale(1.12, 0.9); }
        80% { transform: translate(-8vw, 5vh) scale(0.93, 1.06); }
    }

    @media (max-width: 767px) {
        .blob-1 {
            width: 420px; height: 330px;
            filter: blur(35px); opacity: 0.32;
        }
        .blob-2 {
            width: 385px; height: 310px;
            filter: blur(35px); opacity: 0.28;
        }
        .blob-3 {
            width: 450px; height: 360px;
            filter: blur(38px); opacity: 0.24;
        }
        .blob-4 {
            width: 390px; height: 310px;
            filter: blur(45px); opacity: 0.30;
        }
        .blob-5 {
            width: 450px; height: 360px;
            filter: blur(48px); opacity: 0.34;
        }
        .blob-6 {
            width: 420px; height: 350px;
            filter: blur(48px); opacity: 0.32;
        }
        .blob-7 {
            width: 430px; height: 350px;
            filter: blur(50px); opacity: 0.32;
        }
        .blob-8 {
            width: 450px; height: 360px;
            filter: blur(50px); opacity: 0.32;
        }
        .blob-9 {
            width: 390px; height: 320px;
            filter: blur(45px); opacity: 0.28;
        }
        .blob-10 {
            width: 420px; height: 335px;
            filter: blur(50px); opacity: 0.30;
        }
        .blob-11 {
            width: 430px; height: 350px;
            filter: blur(50px); opacity: 0.32;
        }
        .blob-12 {
            width: 410px; height: 325px;
            filter: blur(48px); opacity: 0.30;
        }
    }

    .aurora.paused .aurora-blob {
        animation-play-state: paused;
    }

    @media (prefers-reduced-motion: reduce) {
        .aurora-blob {
            animation: none;
        }
    }
</style>
