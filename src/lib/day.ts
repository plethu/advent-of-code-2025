import { dirname, join } from 'path';
import pc from 'picocolors';

type Result = string | number | bigint | boolean | null | undefined;

export type Solver = (input: string) => Promise<Result>;

export interface Solution {
  part1: Solver;
  part2: Solver;
}

export interface TestCase {
  file: string;
  part1?: Result;
  part2?: Result;
}

const DIVIDER = pc.dim('─'.repeat(40));

export const day = (importMetaPath: string) => {
  const dayDir = dirname(importMetaPath);
  const dayNum = dayDir.split('/').pop() ?? '';

  const readInput = (filename = 'input.txt') =>
    Bun.file(join(dayDir, filename)).text();

  const readLines = (input: string) =>
    input.trim().split('\n');

  const readNumbers = (input: string) =>
    readLines(input).map(Number);

  const getInput = async () => {
    const arg = Bun.argv[2];

    if (!arg) {
      console.log(pc.dim(`Input: ${dayNum}/input.txt`));
      return readInput();
    }

    try {
      const content = await Bun.file(arg).text();
      console.log(pc.dim(`Input: ${arg}`));
      return content;
    } catch {
      console.log(pc.dim('Input: direct'));
      return arg;
    }
  };

  const run = async ({ part1, part2 }: Solution) => {
    const input = await getInput();

    console.log(pc.bold(`\nDay ${dayNum}`));
    console.log(DIVIDER);
    console.log(`\tPart 1  ${pc.cyan(String(await part1(input)))}`);
    console.log(`\tPart 2  ${pc.cyan(String(await part2(input)))}`);
  };

  return {
    dayNum,
    readInput,
    readLines,
    readNumbers,
    run,
  };
};