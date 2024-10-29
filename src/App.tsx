import React, { useState } from 'react';
import NumberButton from './components/NumberButton';
import OperatorButton from './components/OperatorButton';
import { solve } from './utils/solve';

const App: React.FC = () => {
  // 初期状態: 四則演算（÷, ×, -, +）がtrue、それ以外がfalse
  const [buttonStates, setButtonStates] = useState<boolean[]>([
    true, false, true, false, true, false, true
  ]);

  // buttonStatesに基づいて色を設定
  const getColor = (index: number) => (buttonStates[index] ? 'bg-green-300' : 'bg-red-500');

  // ボタンの状態をトグルする関数
  const toggleButtonState = (index: number) => {
    setButtonStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const [displayText, setDisplayText] = useState<string>("");
  
  const handleNumberClick = (value: string) => {
    setDisplayText((prev) => {
      const parts = prev.split(" ");
      if (parts.length >= 7) {
        return prev; // 7個以上の場合、何も追加しない
      }
      return prev ? `${prev} ${value}` : value;
    });
  };
  
  const handleBackspaceClick = () => {
    setDisplayText((prev) => {
      const parts = prev.split(" ");
      parts.pop(); // 最後の要素を削除
      return parts.join(" ");
    });
  };

  const handleClearClick = () => {
    setDisplayText("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 w-full">
      <div className="p-4 bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="grid grid-cols-6 gap-2">
          <div className="col-span-3 bg-black text-white text-2xl flex items-center justify-center h-16 rounded">
            {displayText}
          </div>
          <div className="col-span-1 flex items-center justify-center text-lg text-black">で</div>
          <div className="col-span-1 bg-black text-white text-2xl flex items-center justify-center h-16 rounded">10</div>
          <div className="col-span-1 flex items-center justify-center text-lg text-black">を作る</div>
        </div>

        <div className="calc-buttons space-y-2 mt-4">
          <div className="calc-button-row grid grid-cols-5 gap-2">
            <button className="calc-button bg-black text-white text-2xl h-16 rounded col-span-2" onClick={handleClearClick}>C</button>
            <button className="calc-button bg-black text-white text-2xl h-16 rounded" onClick={handleBackspaceClick}>←</button>
            <OperatorButton value="÷" color={getColor(0)} onClick={() => toggleButtonState(0)} />
            <OperatorButton value="*↔︎*" color={getColor(1)} onClick={() => toggleButtonState(1)} />
          </div>

          <div className="calc-button-row grid grid-cols-5 gap-2">
            <NumberButton value="7" onClick={handleNumberClick} />
            <NumberButton value="8" onClick={handleNumberClick} />
            <NumberButton value="9" onClick={handleNumberClick} />
            <OperatorButton value="×" color={getColor(2)} onClick={() => toggleButtonState(2)} />
            <OperatorButton value="log" color={getColor(3)} onClick={() => toggleButtonState(3)} />
          </div>

          <div className="calc-button-row grid grid-cols-5 gap-2">
            <NumberButton value="4" onClick={handleNumberClick} />
            <NumberButton value="5" onClick={handleNumberClick} />
            <NumberButton value="6" onClick={handleNumberClick} />
            <OperatorButton value="-" color={getColor(4)} onClick={() => toggleButtonState(4)} />
            <OperatorButton value="^" color={getColor(5)} onClick={() => toggleButtonState(5)} />
          </div>

          <div className="calc-button-row grid grid-cols-5 gap-2">
            <NumberButton value="1" onClick={handleNumberClick} />
            <NumberButton value="2" onClick={handleNumberClick} />
            <NumberButton value="3" onClick={handleNumberClick} />
            <OperatorButton value="+" color={getColor(6)} onClick={() => toggleButtonState(6)} />
          </div>

          <div className="calc-button-row grid grid-cols-5 gap-2">
            <button
              className="calc-button bg-black text-white text-2xl h-16 rounded flex items-center justify-center col-span-3" 
              onClick={() => handleNumberClick("0")}
            >0</button>
            <button
              className="calc-button bg-black text-white text-2xl h-16 rounded col-span-2"
              onClick={() => solve(displayText, buttonStates)}
            >SOLVE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
