import { useState } from "react";

interface InputProps {
  handleButtonClick: (val: string) => void;
}

const Input: React.FC<InputProps> = ({ handleButtonClick }) => {
  const [value, setValue] = useState("");
  const btn = () => {
    handleButtonClick(value);
  };
  return (
    <div className="flex items-center justify-center h-32 relative">
      <div className="w-64 relative">
        <input
          type="text"
          placeholder="Enter your text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="w-full py-2 px-3 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
        />
        <button className="absolute top-2 right-3 text-gray-400" onClick={btn}>
          🔍
        </button>
      </div>
    </div>
  );
};

export default Input;
