// src/utils/convertToTex.ts
export type FormulaNode = {
  operator?: string;
  left?: FormulaNode | number;
  right?: FormulaNode | number;
  result: number;
};

// TEX表現に変換する関数
export function convertToTex(node: FormulaNode | number): string {
  if (typeof node === "number") {
    return node.toString();
  }

  const left = node.left ? convertToTex(node.left) : "";
  const right = node.right ? convertToTex(node.right) : "";

  switch (node.operator) {
    case "add":
      return `${left} + ${right}`;
    case "sub":
      return `${left} - ${right}`;
    case "mul":
      return `${left} \\times ${right}`;
    case "div":
      return `\\frac{${left}}{${right}}`;
    case "exp":
      return `{${left}}^{${right}}`;
    case "log":
      return `\\log_{${left}}${right}`;
    default:
      return "";
  }
}
