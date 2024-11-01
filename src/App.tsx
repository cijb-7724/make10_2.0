import React, { useState } from 'react';
import NumberButton from './components/NumberButton';
import OperatorButton from './components/OperatorButton';
import { solve } from './utils/solve';
import FormulaRenderer from "./components/FormulaRenderer";
import { FormulaNode } from "./utils/convertToTex";
import './index.css';  // CSSファイルをインポート

const App: React.FC = () => {
  const [buttonStates, setButtonStates] = useState<boolean[]>([
    true, true, true, false, true, false, true
  ]);

  const getColorClass = (index: number) => (buttonStates[index] ? 'operator-button bg-green-200' : 'operator-button bg-red-200');

  const toggleButtonState = (index: number) => {
    setButtonStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const [displayText, setDisplayText] = useState<string>("");
  const [targetValue, setTargetValue] = useState<string>("10");
  const [isEditingTarget, setIsEditingTarget] = useState<boolean>(false);

  const handleNumberClick = (value: string) => {
    if (isEditingTarget) {
      setTargetValue((prev) => {
        if (prev.length >= 6) return prev;
        return prev + value;
      });
    } else {
      setDisplayText((prev) => {
        const parts = prev.split(" ");
        if (parts.length >= 6) return prev;
        return prev ? `${prev} ${value}` : value;
      });
    }
  };
  
  const handleBackspaceClick = () => {
    if (isEditingTarget) {
      setTargetValue((prev) => {
        if (prev.length === 0) return prev;
        return prev.slice(0, prev.length-1);
      });
    } else {
      setDisplayText((prev) => {
        const parts = prev.split(" ");
        parts.pop();
        return parts.join(" ");
      });
    }
  };

  const handleClearClick = () => {
    if (isEditingTarget) {
      setTargetValue("");
    } else {
      setDisplayText("");
    }
  };

  const [formulaNode, setFormulaNode] = useState<FormulaNode>({
    result: -1,
  });

  const handleSolveClick = () => {
    const newFormulaNode = solve(displayText, buttonStates, targetValue);
    if (newFormulaNode !== null) {
      setFormulaNode(newFormulaNode);
      console.log(newFormulaNode);
    } else {
      console.log("解が見つかりませんでした");
      const notFound = {
        result: -2,
      }
      setFormulaNode(notFound);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-gradient font-dosis">
      <div className="backdrop-blur-lg bg-opacity-30 bg-white rounded-2xl shadow-lg border border-white w-full max-w-md p-6 space-y-4">
        <div className="flex justify-center items-center text-black">
          <FormulaRenderer formulaNode={formulaNode} />
        </div>


        <div className="grid grid-cols-7 gap-2">
          <div
            className="col-span-3 bg-black text-white text-3xl flex items-center justify-center h-16 rounded-lg relative"
            onClick={() => setIsEditingTarget(false)}
          >
            {displayText}
            {!isEditingTarget && (
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500"></div>
            )}
          </div>
          <div className="col-span-1 flex items-center justify-center text-lg text-black">で</div>
          <div
            className="col-span-2 bg-black text-white text-3xl flex items-center justify-center h-16 rounded-lg relative"
            onClick={() => setIsEditingTarget(true)}
          >
            {targetValue}
            {isEditingTarget && (
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500"></div>
            )}
          </div>
          <div className="col-span-1 flex items-center justify-center text-lg text-black">を作る</div>
        </div>

        <div className="calc-buttons space-y-2">
          <div className="grid grid-cols-5 gap-2">
            <button className="calc-button col-span-2" onClick={handleClearClick}>CLEAR</button>
            <button className="calc-button" onClick={handleBackspaceClick}>←</button>
            <OperatorButton value="÷" color={getColorClass(0)} onClick={() => toggleButtonState(0)} />
            <OperatorButton value="*↔︎*" color={getColorClass(1)} onClick={() => toggleButtonState(1)} />
          </div>

          <div className="grid grid-cols-5 gap-2">
            <NumberButton value="7" onClick={handleNumberClick} />
            <NumberButton value="8" onClick={handleNumberClick} />
            <NumberButton value="9" onClick={handleNumberClick} />
            <OperatorButton value="×" color={getColorClass(2)} onClick={() => toggleButtonState(2)} />
            <OperatorButton value="log" color={getColorClass(3)} onClick={() => toggleButtonState(3)} />
          </div>

          <div className="grid grid-cols-5 gap-2">
            <NumberButton value="4" onClick={handleNumberClick} />
            <NumberButton value="5" onClick={handleNumberClick} />
            <NumberButton value="6" onClick={handleNumberClick} />
            <OperatorButton value="-" color={getColorClass(4)} onClick={() => toggleButtonState(4)} />
            <OperatorButton value="^" color={getColorClass(5)} onClick={() => toggleButtonState(5)} />
          </div>

          <div className="grid grid-cols-5 gap-2">
            <NumberButton value="1" onClick={handleNumberClick} />
            <NumberButton value="2" onClick={handleNumberClick} />
            <NumberButton value="3" onClick={handleNumberClick} />
            <OperatorButton value="+" color={getColorClass(6)} onClick={() => toggleButtonState(6)} />
          </div>

          <div className="grid grid-cols-5 gap-2">
            <button
              className="calc-button col-span-3" 
              onClick={() => handleNumberClick("0")}
            >0</button>
            <button
              className="calc-button col-span-2"
              onClick={handleSolveClick}
            >
              SOLVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
