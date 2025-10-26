import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  const [countHistory, setCountHistory] = useState<number[]>([]);

  const increase = () => {
    const newCount = count + 1;
    setCount(newCount);
    setCountHistory((prev) => [...prev, newCount]);
  };
  const decrease = () => {
    const newCount = count - 1;
    setCount(newCount);
    setCountHistory((prev) => [...prev, newCount]);
  };

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ textAlign: "center" }}>{count.toString()}</h1>
      <div>
        <button onClick={decrease}>-1</button>
        <button onClick={increase}>+1</button>
      </div>
      <button
        onClick={() => {
          setCount(0);
          setCountHistory([]);
        }}
      >
        reset
      </button>
      {countHistory.length > 0 && (
        <p>History: {countHistory.slice(-5).join(", ")}</p>
      )}{" "}
    </div>
  );
};

export default Counter;
