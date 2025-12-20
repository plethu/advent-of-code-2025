import { day, Solver } from "@/lib/day";

const { run, readLines } = day(import.meta.path);

type Range = {
  start: number;
  end: number;
};

export const readRanges = (input: string) => {
  return input.split(",").map((r) => {
    const [start, end] = r.split("-");
    return {
      start: parseInt(start),
      end: parseInt(end),
    } satisfies Range;
  });
};

export const toSequences = (ranges: Range[]) => {
  return ranges.map((r) => {
    return Array.from(Array(r.end - r.start + 1).keys()).map(
      (i) => i + r.start,
    );
  });
};

// could be cleaned up to use a regex approach similar to part 2
// but i wanna be honest about the hacky rubbish way i solved this
export const isValidIdForPart1 = (id: number) => {
  const str = `${id}`;
  const len = str.length;

  // odd number of chars can't have repeats
  if (len % 2 !== 0) {
    return true;
  }

  const halfIndex = len / 2;
  const start = str.slice(0, halfIndex);
  const end = str.substring(halfIndex);

  return start !== end;
};

export const sumOfFilteredSequences = (
  input: string,
  filter: (id: number) => boolean,
) => {
  return toSequences(readRanges(input))
    .flat()
    .filter(filter)
    .reduceRight((acc, cur) => acc + cur, 0);
};

export const part1: Solver = async (input) => {
  return sumOfFilteredSequences(input, (id) => !isValidIdForPart1(id));
};

export const isValidIdForPart2 = (id: number) => {
  // checks for *at least* one instance of an arbitrary digit capture group
  // this SUCKED to figure out
  return !/^(\d+)\1+$/.test(`${id}`);
};

export const part2: Solver = async (input) => {
  return sumOfFilteredSequences(input, (id) => !isValidIdForPart2(id));
};

export const solution = { part1, part2 };

if (import.meta.main) {
  await run(solution);
}
