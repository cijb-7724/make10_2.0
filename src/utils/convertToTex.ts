// src/utils/convertToTex.ts
export type FormulaNode = {
  operator?: string;
  left?: FormulaNode;
  right?: FormulaNode;
  result: number;
};

// 演算子の優先順位を定義
const precedence: { [key: string]: number } = {
  "add": 1,
  "sub": 1,
  "mul": 2,
  "div": 2,
  "exp": 3,
  "log": 3,
};

// TEX表現に変換する関数
export function convertToTex(node: FormulaNode, parentPrecedence: number = 0): string {
  if (node.operator === undefined) return node.result.toString();
  if (!node) return "";

  const currentPrecedence = precedence[node.operator];

  // 左右のノードを再帰的に展開
  const left = node.left ? convertToTex(node.left, currentPrecedence) : "";
  const right = node.right ? convertToTex(node.right, currentPrecedence) : "";

  // 括弧が必要な場合は括弧で囲む
  const leftExpr = (node.left && node.left.operator && precedence[node.left.operator] < currentPrecedence)
    ? `(${left})`
    : left;
  const rightExpr = (node.right && node.right.operator && precedence[node.right.operator] <= currentPrecedence)
    ? `(${right})`
    : right;

  // TEXコードを演算子ごとに生成
  switch (node.operator) {
    case "add":
      return `${leftExpr} + ${rightExpr}`;
    case "sub":
      return `${leftExpr} - ${rightExpr}`;
    case "mul":
      return `${leftExpr} \\times ${rightExpr}`;
    case "div":
      return `\\frac{${leftExpr}}{${rightExpr}}`;
    case "exp":
      return `{${leftExpr}}^{${rightExpr}}`;
    case "log":
      return `\\log_{${leftExpr}}${rightExpr}`;
    default:
      return node.result.toString();
  }
}
