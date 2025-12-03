import { describe, it, expect } from "bun:test";
import { part1, part2, readRotations, timesWrapped, wrap } from "./index";
import { day } from "@/lib/day";

const {
  readInput,
} = day(import.meta.path);

describe("day 1", () => {
  describe('readRotations', () => {
    it('will read the rotations from the input', () => {
      const result = readRotations('L50\nR50\nL1000\nR1000');
      expect(result).toEqual([-50, 50, -1000, 1000]);
    });
  });

  describe('wrap', () => {
    it.each([1050, -950])('will wrap the rotation to the correct value ($value)', (value) => {
      expect(wrap(value)).toEqual(50);
    });

    it.each([-1, -101])('will correctly handle negative values ($value)', (value) => {
      expect(wrap(value)).toEqual(99);
    });
  });

  describe('timesWrapped', () => {
  });

  describe('part 1', () => {
    it.each([
      'R49\nL98', // should set back to 1 without having hit zero
      'R1', // 51
      'L1', // 49
      'R51', // clamps back to 1, never hits zero exactly
      'L51', // clamps back to 99, never hits zero exactly
    ])('will not have rotated if it is not incremented by a multiple of 100', async (input) => {
      const result = await part1(input);
      expect(result).toEqual(0);
    });

    it.each([
      {
        input: 'R50\nL100\nR50\nR50\nR15\nL12', // 50 -> 0 -> 0 -> 50 -> 0 -> 15 -> 27
        expected: 3,
      },
    ])('will count each time a zero is hit after a rotation', async ({input, expected}) => {
      const result = await part1(input);
      expect(result).toEqual(expected);
    });

    it('will solve for the input', async () => {
      const result = await part1(await readInput());
      expect(result).toEqual(1172);
    });
  });

  describe('part 2', () => {
    it.each([
      'R49', // 99
      'L49', // 1
      'R13\nL12\nR38\nL27\nR22', // 50 -> 63 -> 51 -> 89 -> 62 -> 84
    ])('will not have rotated if no increment would clamp the value', async (input) => {
      const result = await part2(input);
      expect(result).toEqual(0);
    });

    it.each([
      {
        input: 'L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82',
        expected: 6,
      },
      {
        input: 'L50\nR50',
        expected: 1,
      },
      {
        input: 'L50\nL50',
        expected: 1,
      },
      {
        input: 'R50\nL50',
        expected: 1,
      },
      {
        input: 'R50\nR50',
        expected: 1,
      },
      {
        input: 'L150\nL50',
        expected: 2,
      },
      {
        input: 'L150\nR50',
        expected: 2,
      },
      {
        input: 'R150\nL50',
        expected: 2,
      },
      {
        input: 'R150\nR50',
        expected: 2,
      }
    ])('will count each time it wraps from a rotation in either direction with $input', async ({input, expected}) => {
      const result = await part2(input);
      expect(result).toBe(expected);
    });
  });
});
