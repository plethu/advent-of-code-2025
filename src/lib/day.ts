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

  const readInput = (filename = 'input.txt'): Promise<string> =>
    Bun.file(join(dayDir, filename)).text();

  const readLines = async (filename?: string): Promise<string[]> =>
    (await readInput(filename)).trim().split('\n');

  const readNumbers = async (filename?: string): Promise<number[]> =>
    (await readLines(filename)).map(Number);

  const test = (label: string, actual: Result, expected: Result): boolean => {
    const passed = JSON.stringify(actual) === JSON.stringify(expected);
    const icon = passed ? pc.green('PASS') : pc.red('FAIL');

    const comparison = passed
      ? pc.dim(`${actual} == ${expected}`)
      : `${pc.yellow(String(actual))} != ${pc.cyan(String(expected))}`;

    console.log(`\t${icon}  ${label}`);
    console.log(`\t\t${comparison}`);

    if (!passed) { 
        process.exitCode = 1; 
    }

    return passed;
  };

  const runTests = async ({ part1, part2 }: Solution, cases: TestCase[]): Promise<void> => {
    console.log(pc.bold(`\nTests: Day ${dayNum}`));
    console.log(DIVIDER);

    for (const { file, part1: expected1, part2: expected2 } of cases) {
      const input = await readInput(file);
      const suffix = pc.dim(`(${file})`);

      for (const [part, solver, expected] of [
        ['Part 1', part1, expected1],
        ['Part 2', part2, expected2],
      ] as const) {
        if (expected !== undefined) {
          test(`\t${part} ${suffix}\n`, await solver(input), expected);
        }
      }
    }
  };

  const getInput = async (): Promise<string> => {
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

  const run = async ({ part1, part2 }: Solution): Promise<void> => {
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
    runTests,
    test,
  };
};