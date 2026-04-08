const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?";

const DECODE_STAGGER_MS = 80;
const DECODE_START_DELAY_MS = 400;
const GLITCH_RADIUS_PX = 100;
const REDECODE_DELAY_MS = 60;

const IDLE_GLITCH_MIN_MS = 5000;
const IDLE_GLITCH_MAX_MS = 10000;
const IDLE_GLITCH_DURATION_FRAMES = 40;

// Character center is offset from the baseline; these approximate the glyph midpoint
const CHAR_CENTER_Y_OFFSET = 0.35;
const CHAR_CENTER_X_OFFSET = 0.3;
// Controls how staggered the redecode ripple is after cursor leaves
const REDECODE_STAGGER_DIVISOR = 10;
const REDECODE_JITTER_RANGE = 3;
const ASSUMED_FRAME_MS = 16;

export interface CharLayout {
  char: string;
  displayChar: string;
  restX: number;
  restY: number;
  entranceDecodeAtMs: number;
  entranceDecoded: boolean;
  glitched: boolean;
  redecodeAtFrame: number;
}

export function randomScrambleChar(): string {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

/** Build CharLayout array from Pretext line data and canvas measurements. */
export function createCharLayouts(
  ctx: CanvasRenderingContext2D,
  lines: Array<{ text: string; width: number }>,
  lineHeight: number,
): CharLayout[] {
  const result: CharLayout[] = [];
  let charIndex = 0;
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const lineText = lines[lineIdx].text;
    const baselineY = (lineIdx + 1) * lineHeight;
    for (let i = 0; i < lineText.length; i++) {
      const prefix = lineText.slice(0, i);
      const charX = ctx.measureText(prefix).width;
      result.push({
        char: lineText[i],
        displayChar: lineText[i] === " " ? " " : randomScrambleChar(),
        restX: charX,
        restY: baselineY,
        entranceDecodeAtMs: DECODE_START_DELAY_MS + charIndex * DECODE_STAGGER_MS,
        entranceDecoded: false,
        glitched: false,
        redecodeAtFrame: 0,
      });
      charIndex++;
    }
  }
  return result;
}

/** Cycle undecoded characters through random glyphs, lock in left-to-right. Returns true when all decoded. */
export function updateEntrance(chars: CharLayout[], elapsedMs: number): boolean {
  let allDecoded = true;
  for (const ch of chars) {
    if (ch.char === " ") {
      ch.entranceDecoded = true;
      continue;
    }
    if (elapsedMs >= ch.entranceDecodeAtMs) {
      ch.displayChar = ch.char;
      ch.entranceDecoded = true;
    } else {
      ch.displayChar = randomScrambleChar();
      allDecoded = false;
    }
  }
  return allDecoded;
}

/** Scramble characters near cursor, stagger re-decode when cursor leaves. */
export function updateHoverGlitch(
  chars: CharLayout[],
  cursorX: number | null,
  cursorY: number | null,
  frameCount: number,
  fontSizePx: number,
): void {
  const hasCursor = cursorX !== null && cursorY !== null;

  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    if (ch.char === " ") continue;

    if (hasCursor) {
      const charCenterY = ch.restY - fontSizePx * CHAR_CENTER_Y_OFFSET;
      const dx = ch.restX + fontSizePx * CHAR_CENTER_X_OFFSET - cursorX!;
      const dy = charCenterY - cursorY!;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < GLITCH_RADIUS_PX) {
        ch.glitched = true;
        ch.displayChar = randomScrambleChar();
        ch.redecodeAtFrame = 0;
      } else if (ch.glitched && ch.redecodeAtFrame === 0) {
        const distFromEdge = distance - GLITCH_RADIUS_PX;
        const staggerFrames = Math.floor(distFromEdge / REDECODE_STAGGER_DIVISOR) + Math.floor(Math.random() * REDECODE_JITTER_RANGE);
        ch.redecodeAtFrame = frameCount + staggerFrames;
      }
    } else if (ch.glitched && ch.redecodeAtFrame === 0) {
      const staggerFrames = Math.floor(i * REDECODE_DELAY_MS / ASSUMED_FRAME_MS);
      ch.redecodeAtFrame = frameCount + staggerFrames;
    }

    if (ch.glitched && ch.redecodeAtFrame > 0 && frameCount >= ch.redecodeAtFrame) {
      ch.displayChar = ch.char;
      ch.glitched = false;
      ch.redecodeAtFrame = 0;
    } else if (ch.glitched && ch.redecodeAtFrame > 0) {
      ch.displayChar = randomScrambleChar();
    }
  }
}

/** Set all characters to their decoded state (for reduced motion or resize). */
export function skipToDecoded(chars: CharLayout[]): void {
  for (const ch of chars) {
    ch.displayChar = ch.char;
    ch.entranceDecoded = true;
  }
}

// --- Idle glitch (single-character hint) ---

export interface IdleGlitchState {
  charIdx: number;
  redecodeAtFrame: number;
}

export function nextIdleGlitchDelayMs(): number {
  return IDLE_GLITCH_MIN_MS + Math.random() * (IDLE_GLITCH_MAX_MS - IDLE_GLITCH_MIN_MS);
}

/** Scramble one random non-space character. Returns null if no candidates. */
export function startIdleGlitch(
  chars: CharLayout[],
  frameCount: number,
): IdleGlitchState | null {
  const candidates: number[] = [];
  for (let i = 0; i < chars.length; i++) {
    if (chars[i].char !== " " && !chars[i].glitched) candidates.push(i);
  }
  if (candidates.length === 0) return null;
  const idx = candidates[Math.floor(Math.random() * candidates.length)];
  chars[idx].displayChar = randomScrambleChar();
  return { charIdx: idx, redecodeAtFrame: frameCount + IDLE_GLITCH_DURATION_FRAMES };
}

/** Cycle the idle-glitched character through random glyphs, redecode when done. */
export function updateIdleGlitch(
  chars: CharLayout[],
  frameCount: number,
  state: IdleGlitchState,
): IdleGlitchState | null {
  const ch = chars[state.charIdx];
  if (frameCount >= state.redecodeAtFrame) {
    ch.displayChar = ch.char;
    return null;
  }
  ch.displayChar = randomScrambleChar();
  return state;
}
