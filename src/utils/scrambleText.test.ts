import { describe, expect, it, vi } from "vitest";
import {
  randomScrambleChar,
  createCharLayouts,
  updateEntrance,
  updateHoverGlitch,
  skipToDecoded,
  nextIdleGlitchDelayMs,
  startIdleGlitch,
  updateIdleGlitch,
  type CharLayout,
} from "./scrambleText";

const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?";

function makeChar(overrides: Partial<CharLayout> = {}): CharLayout {
  return {
    char: "A",
    displayChar: "A",
    restX: 0,
    restY: 24,
    entranceDecodeAtMs: 400,
    entranceDecoded: false,
    glitched: false,
    redecodeAtFrame: 0,
    ...overrides,
  };
}

function makeMockCtx(): CanvasRenderingContext2D {
  return {
    measureText: (text: string) => ({ width: text.length * 10 }),
  } as unknown as CanvasRenderingContext2D;
}

describe("randomScrambleChar", () => {
  it("returns a single character from the scramble charset", () => {
    for (let i = 0; i < 50; i++) {
      const ch = randomScrambleChar();
      expect(ch).toHaveLength(1);
      expect(SCRAMBLE_CHARS).toContain(ch);
    }
  });
});

describe("createCharLayouts", () => {
  it("creates one CharLayout per character across all lines", () => {
    const ctx = makeMockCtx();
    const lines = [
      { text: "Hi", width: 20 },
      { text: "Go", width: 20 },
    ];
    const result = createCharLayouts(ctx, lines, 24);
    expect(result).toHaveLength(4);
  });

  it("positions baselines using lineHeight", () => {
    const ctx = makeMockCtx();
    const lines = [
      { text: "AB", width: 20 },
      { text: "CD", width: 20 },
    ];
    const result = createCharLayouts(ctx, lines, 30);
    expect(result[0].restY).toBe(30);
    expect(result[1].restY).toBe(30);
    expect(result[2].restY).toBe(60);
    expect(result[3].restY).toBe(60);
  });

  it("computes restX from measureText of prefix", () => {
    const ctx = makeMockCtx();
    const lines = [{ text: "ABC", width: 30 }];
    const result = createCharLayouts(ctx, lines, 24);
    // mock returns text.length * 10
    expect(result[0].restX).toBe(0); // prefix ""
    expect(result[1].restX).toBe(10); // prefix "A"
    expect(result[2].restX).toBe(20); // prefix "AB"
  });

  it("staggers entranceDecodeAtMs across all chars globally", () => {
    const ctx = makeMockCtx();
    const lines = [
      { text: "AB", width: 20 },
      { text: "CD", width: 20 },
    ];
    const result = createCharLayouts(ctx, lines, 24);
    expect(result[0].entranceDecodeAtMs).toBe(400);
    expect(result[1].entranceDecodeAtMs).toBe(480);
    expect(result[2].entranceDecodeAtMs).toBe(560);
    expect(result[3].entranceDecodeAtMs).toBe(640);
  });

  it("sets spaces to display as space, non-spaces to scrambled char", () => {
    const ctx = makeMockCtx();
    const lines = [{ text: "A B", width: 30 }];
    const result = createCharLayouts(ctx, lines, 24);
    expect(result[1].char).toBe(" ");
    expect(result[1].displayChar).toBe(" ");
    // Non-space chars get a scramble char (not their real char, most of the time)
    expect(result[0].char).toBe("A");
    expect(SCRAMBLE_CHARS).toContain(result[0].displayChar);
  });

  it("initializes all chars as not decoded and not glitched", () => {
    const ctx = makeMockCtx();
    const lines = [{ text: "Hi", width: 20 }];
    const result = createCharLayouts(ctx, lines, 24);
    for (const ch of result) {
      expect(ch.entranceDecoded).toBe(false);
      expect(ch.glitched).toBe(false);
      expect(ch.redecodeAtFrame).toBe(0);
    }
  });
});

describe("updateEntrance", () => {
  it("returns false when not all chars are decoded yet", () => {
    const chars = [
      makeChar({ char: "A", entranceDecodeAtMs: 400, entranceDecoded: false }),
      makeChar({ char: "B", entranceDecodeAtMs: 480, entranceDecoded: false }),
    ];
    const result = updateEntrance(chars, 450);
    expect(result).toBe(false);
  });

  it("decodes chars left-to-right based on elapsed time", () => {
    const chars = [
      makeChar({ char: "A", entranceDecodeAtMs: 400, entranceDecoded: false, displayChar: "X" }),
      makeChar({ char: "B", entranceDecodeAtMs: 480, entranceDecoded: false, displayChar: "Y" }),
      makeChar({ char: "C", entranceDecodeAtMs: 560, entranceDecoded: false, displayChar: "Z" }),
    ];
    updateEntrance(chars, 450);
    expect(chars[0].displayChar).toBe("A");
    expect(chars[0].entranceDecoded).toBe(true);
    expect(chars[1].entranceDecoded).toBe(false);
    expect(chars[2].entranceDecoded).toBe(false);
  });

  it("returns true when all chars are decoded", () => {
    const chars = [
      makeChar({ char: "A", entranceDecodeAtMs: 400 }),
      makeChar({ char: "B", entranceDecodeAtMs: 480 }),
    ];
    const result = updateEntrance(chars, 600);
    expect(result).toBe(true);
    expect(chars[0].displayChar).toBe("A");
    expect(chars[1].displayChar).toBe("B");
  });

  it("always marks spaces as decoded", () => {
    const chars = [
      makeChar({ char: " ", entranceDecodeAtMs: 400, entranceDecoded: false }),
    ];
    updateEntrance(chars, 0);
    expect(chars[0].entranceDecoded).toBe(true);
  });

  it("scrambles undecoded non-space chars each call", () => {
    const chars = [
      makeChar({ char: "A", entranceDecodeAtMs: 1000, entranceDecoded: false }),
    ];
    updateEntrance(chars, 0);
    expect(SCRAMBLE_CHARS).toContain(chars[0].displayChar);
    expect(chars[0].entranceDecoded).toBe(false);
  });
});

describe("updateHoverGlitch", () => {
  it("glitches chars within radius of cursor", () => {
    const chars = [
      makeChar({ char: "A", restX: 50, restY: 50, entranceDecoded: true }),
    ];
    // Place cursor right at the char position
    updateHoverGlitch(chars, 50, 50, 10, 16);
    expect(chars[0].glitched).toBe(true);
    expect(chars[0].displayChar).not.toBe("A");
  });

  it("does not glitch chars outside radius", () => {
    const chars = [
      makeChar({ char: "A", restX: 500, restY: 500, entranceDecoded: true, displayChar: "A" }),
    ];
    updateHoverGlitch(chars, 0, 0, 10, 16);
    expect(chars[0].glitched).toBe(false);
    expect(chars[0].displayChar).toBe("A");
  });

  it("skips spaces", () => {
    const chars = [
      makeChar({ char: " ", restX: 50, restY: 50, displayChar: " " }),
    ];
    updateHoverGlitch(chars, 50, 50, 10, 16);
    expect(chars[0].glitched).toBe(false);
    expect(chars[0].displayChar).toBe(" ");
  });

  it("schedules redecode when cursor is null for glitched chars", () => {
    // Use index > 0 so the stagger formula produces a non-zero value
    // (index 0 gets stagger 0 and immediately redecodes in the same call)
    const chars = [
      makeChar({ char: "X", glitched: false }),
      makeChar({ char: "A", glitched: true, redecodeAtFrame: 0 }),
    ];
    updateHoverGlitch(chars, null, null, 100, 16);
    expect(chars[1].redecodeAtFrame).toBeGreaterThan(100);
  });

  it("redecodes glitched chars once frameCount reaches redecodeAtFrame", () => {
    const chars = [
      makeChar({ char: "A", glitched: true, redecodeAtFrame: 50, displayChar: "X" }),
    ];
    updateHoverGlitch(chars, null, null, 50, 16);
    expect(chars[0].displayChar).toBe("A");
    expect(chars[0].glitched).toBe(false);
    expect(chars[0].redecodeAtFrame).toBe(0);
  });

  it("keeps scrambling glitched chars before their redecode frame", () => {
    const chars = [
      makeChar({ char: "A", glitched: true, redecodeAtFrame: 100, displayChar: "X" }),
    ];
    updateHoverGlitch(chars, null, null, 50, 16);
    expect(chars[0].glitched).toBe(true);
    expect(SCRAMBLE_CHARS).toContain(chars[0].displayChar);
  });

  it("schedules staggered redecode when glitched char moves outside radius", () => {
    const chars = [
      makeChar({ char: "A", restX: 200, restY: 50, glitched: true, redecodeAtFrame: 0, entranceDecoded: true }),
    ];
    // Cursor is far from restX=200, so char is outside radius but was glitched
    updateHoverGlitch(chars, 0, 50, 100, 16);
    expect(chars[0].redecodeAtFrame).toBeGreaterThan(100);
  });
});

describe("skipToDecoded", () => {
  it("sets all displayChars to their real char and marks decoded", () => {
    const chars = [
      makeChar({ char: "H", displayChar: "X", entranceDecoded: false }),
      makeChar({ char: " ", displayChar: " ", entranceDecoded: false }),
      makeChar({ char: "i", displayChar: "Z", entranceDecoded: false }),
    ];
    skipToDecoded(chars);
    expect(chars[0].displayChar).toBe("H");
    expect(chars[0].entranceDecoded).toBe(true);
    expect(chars[1].displayChar).toBe(" ");
    expect(chars[1].entranceDecoded).toBe(true);
    expect(chars[2].displayChar).toBe("i");
    expect(chars[2].entranceDecoded).toBe(true);
  });
});

describe("nextIdleGlitchDelayMs", () => {
  it("returns a value between 5000 and 10000", () => {
    for (let i = 0; i < 100; i++) {
      const delay = nextIdleGlitchDelayMs();
      expect(delay).toBeGreaterThanOrEqual(5000);
      expect(delay).toBeLessThanOrEqual(10000);
    }
  });
});

describe("startIdleGlitch", () => {
  it("scrambles one non-space char and returns state", () => {
    const chars = [
      makeChar({ char: "A", displayChar: "A", glitched: false }),
      makeChar({ char: " ", displayChar: " ", glitched: false }),
      makeChar({ char: "B", displayChar: "B", glitched: false }),
    ];
    const state = startIdleGlitch(chars, 200);
    expect(state).not.toBeNull();
    expect(state!.charIdx === 0 || state!.charIdx === 2).toBe(true);
    expect(state!.redecodeAtFrame).toBe(240); // frameCount + 40
    expect(chars[state!.charIdx].displayChar).not.toBe(chars[state!.charIdx].char);
  });

  it("returns null when all chars are spaces", () => {
    const chars = [
      makeChar({ char: " ", displayChar: " " }),
      makeChar({ char: " ", displayChar: " " }),
    ];
    const state = startIdleGlitch(chars, 100);
    expect(state).toBeNull();
  });

  it("returns null when all non-space chars are already glitched", () => {
    const chars = [
      makeChar({ char: "A", glitched: true }),
    ];
    const state = startIdleGlitch(chars, 100);
    expect(state).toBeNull();
  });
});

describe("updateIdleGlitch", () => {
  it("keeps scrambling before redecodeAtFrame and returns state", () => {
    const chars = [makeChar({ char: "A", displayChar: "X" })];
    const state = { charIdx: 0, redecodeAtFrame: 100 };
    const result = updateIdleGlitch(chars, 50, state);
    expect(result).toBe(state);
    expect(SCRAMBLE_CHARS).toContain(chars[0].displayChar);
  });

  it("redecodes at redecodeAtFrame and returns null", () => {
    const chars = [makeChar({ char: "A", displayChar: "X" })];
    const state = { charIdx: 0, redecodeAtFrame: 100 };
    const result = updateIdleGlitch(chars, 100, state);
    expect(result).toBeNull();
    expect(chars[0].displayChar).toBe("A");
  });

  it("redecodes when frameCount exceeds redecodeAtFrame", () => {
    const chars = [makeChar({ char: "B", displayChar: "X" })];
    const state = { charIdx: 0, redecodeAtFrame: 50 };
    const result = updateIdleGlitch(chars, 200, state);
    expect(result).toBeNull();
    expect(chars[0].displayChar).toBe("B");
  });
});
