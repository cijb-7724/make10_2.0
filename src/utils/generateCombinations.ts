// 長さkのすべての組み合わせを生成するジェネレーター関数
export function* generateCombinations(k: number, operations: ((a: number, b: number) => number)[]): Generator<((a: number, b: number) => number)[]> {
  const currentCombination: ((a: number, b: number) => number)[] = Array(k);

  // 再帰的に組み合わせを生成
  function* backtrack(index: number): Generator<((a: number, b: number) => number)[]> {
    if (index === k) {
      yield [...currentCombination];
      return;
    }

    for (let i = 0; i < operations.length; i++) {
      currentCombination[index] = operations[i];
      yield* backtrack(index + 1);
    }
  }

  yield* backtrack(0);
}
