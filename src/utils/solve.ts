// src/utils/solve.ts
import { nextPermutation } from "./nextPermutation";
import { generateCombinations } from "./generateCombinations";
export const solve = (displayText: string, buttonStates: boolean[], targetValue: string) => {
  const parts = displayText.split(" ").map(Number);
  let n = parts.length;
  if (targetValue.length === 0) target = 0;
  else target = Number(targetValue);

  operations = [];
  if (buttonStates[0]) operations.push(div);
  if (buttonStates[2]) operations.push(mul);
  if (buttonStates[4]) operations.push(sub);
  if (buttonStates[6]) operations.push(add);
  if (buttonStates[3]) operations.push(log);
  if (buttonStates[5]) operations.push(exp);

  if (buttonStates[1]) parts.sort((a, b) => a-b);
  do {
    let nodes: FormulaNode[] = parts.map(value => ({ result: value }));
    for (const combination of generateCombinations(n-1, operations)) {
      let resultNode = main(n, nodes, combination);
      if (resultNode) {
        console.log("復元された式:", buildFormula(resultNode));
        return resultNode;
      }
    }
    if (!buttonStates[1]) break;
  } while(nextPermutation(parts));

  return null;
};

let target = 10;
type FormulaNode = {
  operator?: string;
  left?: FormulaNode;
  right?: FormulaNode;
  result: number;
};

function main(
  n: number,
  arr: FormulaNode[],
  ope: ((a: number, b: number) => number)[],
  formulaNode?: FormulaNode
): FormulaNode | null {
  if (n === 1) {
    if (arr[0].result === target) return formulaNode ?? null;
    else return null;
  }

  for (let i=0; i<n-1; ++i) {
    let narr = [...arr];
    let nope = [...ope];
    const node: FormulaNode = {
      operator: getOperatorName(nope[i]),
      left: arr[i],
      right: narr[i + 1],
      result: nope[i](narr[i].result, narr[i + 1].result),
    };
    narr[i] = node;
    
    narr.splice(i+1, 1);
    nope.splice(i, 1);

    let ans = main(n-1, narr, nope, node);
    if (ans !== null) {
      return ans;
    }
  }
  return null;
}

// 式を復元するための関数
function buildFormula(node: FormulaNode): string {
  if (node.operator === undefined) return node.result.toString();
  if (!node) return "";

  const left = node.left !== undefined ? buildFormula(node.left) : "";
  const right = node.right !== undefined ? buildFormula(node.right) : "";
  const operator = node.operator ? node.operator : "";

  return `(${left} ${operator} ${right})`;
}

let operations: ((a: number, b: number) => number)[] = [];
function add(a: number, b: number) { return a + b; }
function sub(a: number, b: number) { return a - b; }
function mul(a: number, b: number) { return a * b; }
function div(a: number, b: number) { return a / b; }
function log(a: number, b: number) { return Math.log(b) / Math.log(a);}
function exp(a: number, b: number) { return a ** b; }

function getOperatorName(func: (a: number, b: number) => number): string {
  if (func === add) return "add";
  if (func === sub) return "sub";
  if (func === mul) return "mul";
  if (func === div) return "div";
  if (func === log) return "log";
  if (func === exp) return "exp";
  return "";
}
