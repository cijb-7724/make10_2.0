import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  const [titleColor, setTitleColor] = useState("text-blue-600");

  // 色をトグルする関数
  const toggleColor = () => {
    setTitleColor((prevColor) =>
      prevColor === "text-blue-600" ? "text-red-600" : "text-blue-600"
    );
  };

  return (
    <>
      <h1>hoge</h1>
      <p className={`${titleColor} font-bold text-5xl`}>
        Hello Tailwind
      </p>
      <button
        onClick={toggleColor}
        className="mt-4 px-4 py-2 bg-gray-600 rounded"
      >
        Toggle Color
      </button>
    </>
  );
}
