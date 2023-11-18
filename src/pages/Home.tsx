import React, { useState } from "react";
import Input from "../components/Input";
import Table from "../components/Table";

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const handleButtonClick = (value: string) => {
    setQuery(value);
  };

  return (
    <div className="bg-gray-100">
      <div className="input shadow-md fixed w-screen bg-white">
        <Input handleButtonClick={handleButtonClick} />
      </div>

      <div className="">
        <Table query={query} />
      </div>
    </div>
  );
};
export default Home;
