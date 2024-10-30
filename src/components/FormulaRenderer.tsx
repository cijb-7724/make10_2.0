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
    const container = document.getElementById("math-container");

    if (container) {
      if (formulaNode?.result === -1) {
        container.innerText = "ここに答えが表示されます";
      } else if (formulaNode?.result === -2) {
        container.innerText = "解が見つかりませんでした";
      } else if (formulaNode?.result === -3) {
        container.innerText = "計算中...";
      } else {
        const texCode = convertToTex(formulaNode);
        katex.render(texCode, container, {
          throwOnError: false,
        });
      }
    }
  }, [formulaNode]);

  return (
    <div
      id="math-container"
      className="formula-container"
      style={{
        fontSize: "1.7rem",
        fontFamily: "'STIX Two Math', 'Times New Roman', serif"
      }}
    />
  );
};

export default FormulaRenderer;
