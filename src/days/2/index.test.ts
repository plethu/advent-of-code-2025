import { describe, it, expect } from "bun:test";
import {
  isValidIdForPart1,
  isValidIdForPart2,
  part1,
  part2,
  readRanges,
  sumOfFilteredSequences,
  toSequences,
} from "./index";

describe("day 2", () => {
  describe("readRanges", () => {
    it.each([
      {
        input: "11-22,95-115,998-1012,1188511880-1188511890",
        output: [
          { start: 11, end: 22 },
          { start: 95, end: 115 },
          { start: 998, end: 1012 },
          { start: 1188511880, end: 1188511890 },
        ] satisfies ReturnType<typeof readRanges>,
      },
    ])("will correctly parse ranges", ({ input, output }) => {
      expect(readRanges(input)).toEqual(output);
    });
  });

  describe("toSequences", () => {
    it("will correctly convert a range to a sequence", () => {
      expect(
        toSequences([
          { start: 11, end: 15 },
          { start: 998, end: 1003 },
        ]),
      ).toEqual([
        [11, 12, 13, 14, 15],
        [998, 999, 1000, 1001, 1002, 1003],
      ]);
    });
  });

  describe("isValidIdForPart1", () => {
    it("will be valid with odd number of chars", () => {
      expect(isValidIdForPart1(103)).toBeTrue();
    });

    it("will be valid if numbers don't repeat", () => {
      expect(isValidIdForPart1(1030)).toBeTrue();
    });

    it("will not be valid if numbers repeat", () => {
      expect(isValidIdForPart1(1010)).toBeFalse();
    });
  });

  describe("part1", () => {
    it("will sum invalid IDs", async () => {
      // 11, 22, 1010
      const input = "11-22,999-1012";
      expect(await part1(input)).toEqual(1043);
    });
  });

  describe("isValidIdForPart2", () => {
    it.each([123456, 131179])(
      "will be valid without repeats of digit sequences at least twice",
      () => {
        expect(isValidIdForPart2(123456)).toBeTrue();
      },
    );

    it.each([
      11, 22, 999, 1010, 1188511885, 222222, 446446, 38593859, 565656,
      824824824, 2121212121,
    ])("will be invalid if numbers repeat at least twice (%d)", (n) => {
      expect(isValidIdForPart2(n)).toBeFalse();
    });

    it("will not have an invalid value in given range", () => {
      const seq = toSequences(readRanges("1698522-1698528")).flat();
      expect(seq.filter(isValidIdForPart2).length).toEqual(seq.length);
    });
  });

  describe("part2", () => {
    it("will sum invalid IDs", async () => {
      const input = [
        "11-22",
        "95-115",
        "998-1012",
        "1188511880-1188511890",
        "222220-222224",
        "1698522-1698528",
        "446443-446449",
        "38593856-38593862",
        "565653-565659",
        "824824821-824824827",
        "2121212118-2121212124",
      ].join(",");

      expect(await part2(input)).toEqual(4174379265);
    });
  });
});
