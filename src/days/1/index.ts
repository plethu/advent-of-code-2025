import { day, Solver } from "@/lib/day";

const { 
    run,
    runTests,
} = day(import.meta.path);

const part1: Solver = async (input) => {
    const lines = input.trim().split('\n');
    return lines.length;
};

const part2: Solver = async (input) => {
    const lines = input.trim().split('\n');
    return lines.length;
};

const solution = { part1, part2 };

await runTests(solution, [
    { file: 'example.txt', part1: 2, part2: 2 },
]);

await run(solution);