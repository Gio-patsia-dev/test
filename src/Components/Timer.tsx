import { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [insRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    // create interval
    if (!insRunning) return;
    const intervalId = window.setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prev) => prev + 1);
          return 0;
        } else {
          return prevSeconds + 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [insRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);

  const handleReset = (autoStart = false) => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
    if (autoStart) {
      setTimeout(() => setIsRunning(true), 0);
    }
  };

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        padding: 12,
        border: "1px solid #ddd",
        borderRadius: 8,
        minWidth: 180,
      }}
    >
      <h3 style={{ margin: 0 }}>Timer</h3>

      <div style={{ fontSize: 22, fontWeight: 600 }}>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {insRunning ? (
          <button onClick={handleStop}>Stop</button>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}
        <button onClick={() => handleReset(false)}>Reset</button>
        <button onClick={() => handleReset(true)}>Reset & Start</button>
      </div>
    </div>
  );
};

export default Timer;
