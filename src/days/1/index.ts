import { day, Solver } from "@/lib/day";

const { run, readLines } = day(import.meta.path);

const INITIAL_STATE = {
    rotation: 50,
    zeroes: 0,
};

// 0-99
const WRAPS_AT = 100;

export const readRotations = (input: string) => {
  const lines = readLines(input);
  return lines.map((line) => {
    const [dir, amount] = [line.charAt(0), parseInt(line.slice(1))];
    switch (dir) {
      case "R":
        return amount;
      case "L":
        return -amount;
      default:
        throw new Error(`Invalid direction: ${dir}`);
    }
  });
};

// wraps 0-99 - you need the +100 and second modulo to properly handle negatives
export const wrap = (rot: number) => ((rot % WRAPS_AT) + WRAPS_AT) % WRAPS_AT;

export const timesWrapped = (
    currentRotation: number,
    rotatingBy: number
) => {
    const end = currentRotation + rotatingBy;

    // for positive rotations, we just count the number of full rotations
    if (rotatingBy >= 0) {
        // e.g. 1050 / 100 = 10.5 (10 full rotations, 0.5 of 100 remaining)
        return Math.floor(end / WRAPS_AT);
    }

    // because currentRotation is already wrapped, if we're positive here then we haven't crossed
    // the zero boundary
    if (end > 0) {
        return 0;
    }

    /**
     * negative is trickier, take:
     * L60, you go from 50 to -10, which crosses the zero boundary
     * BUT L60 when starting from 0 is just a single -60, which doesn't cross the zero boundary
     */
    const crossedZero = currentRotation === 0 ? 0 : 1;
    const wraps = Math.floor(-end / WRAPS_AT);
    return crossedZero + wraps;
};

export const part1: Solver = async (input) => {
  const rotations = readRotations(input);

  let {
    rotation: initial,
    zeroes,
  } = INITIAL_STATE;

  const rotate = (by: number) => {
    initial = wrap(initial + by);

    if (initial === 0) {
      zeroes++;
    }
  };

  rotations.forEach(rotate);

  return zeroes;
};

export const part2: Solver = async (input) => {
  const rotations = readRotations(input);

  let {
    rotation: initial,
    zeroes,
  } = INITIAL_STATE;

  for (const rotation of rotations) {
    const modified = initial + rotation;

    const n = timesWrapped(initial, rotation);
    zeroes += n;

    initial = wrap(modified);
  }

  return zeroes;
};

export const solution = { part1, part2 };

if (import.meta.main) {
  await run(solution);
}