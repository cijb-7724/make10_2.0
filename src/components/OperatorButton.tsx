import React from 'react';

interface OperatorButtonProps {
  value: string;
  color: string;
  onClick: () => void;
}

const OperatorButton: React.FC<OperatorButtonProps> = ({ value, color, onClick }) => {
  return (
    <button
      className={`${color} text-white text-2xl h-16 rounded`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default OperatorButton;
