// src/components/FormulaRenderer.tsx
import React, { useEffect } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import { FormulaNode, convertToTex } from "../utils/convertToTex";

interface FormulaRendererProps {
  formulaNode: FormulaNode;
}

const FormulaRenderer: React.FC<FormulaRendererProps> = ({ formulaNode }) => {
  useEffect(() => {
    const texCode = convertToTex(formulaNode);
    const container = document.getElementById("math-container");

    if (container) {
      katex.render(texCode, container, {
        throwOnError: false,
      });
    }
  }, [formulaNode]);

  return <div id="math-container" className="formula-container" />;
};

export default FormulaRenderer;
