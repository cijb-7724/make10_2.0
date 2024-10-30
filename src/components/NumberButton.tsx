import React from 'react';

interface NumberButtonProps {
  value: string;
  onClick: (value: string) => void;
}

const NumberButton: React.FC<NumberButtonProps> = ({ value, onClick }) => {
  return (
    <button
      className="calc-button text-2xl h-16 rounded flex items-center justify-center"
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

export default NumberButton;
