const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?";

export const DECODE_STAGGER_MS = 80;
export const DECODE_START_DELAY_MS = 400;
export const GLITCH_RADIUS_PX = 100;
const REDECODE_DELAY_MS = 60;

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
  for (const ch of chars) {
    if (ch.char === " ") continue;

    if (cursorX !== null && cursorY !== null) {
      const charCenterY = ch.restY - fontSizePx * 0.35;
      const dx = ch.restX + fontSizePx * 0.3 - cursorX;
      const dy = charCenterY - cursorY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < GLITCH_RADIUS_PX) {
        ch.glitched = true;
        ch.displayChar = randomScrambleChar();
        ch.redecodeAtFrame = 0;
      } else if (ch.glitched && ch.redecodeAtFrame === 0) {
        const distFromEdge = distance - GLITCH_RADIUS_PX;
        const staggerFrames = Math.floor(distFromEdge / 10) + Math.floor(Math.random() * 3);
        ch.redecodeAtFrame = frameCount + staggerFrames;
      }
    } else if (ch.glitched && ch.redecodeAtFrame === 0) {
      const charIdx = chars.indexOf(ch);
      const staggerFrames = Math.floor(charIdx * REDECODE_DELAY_MS / 16);
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
