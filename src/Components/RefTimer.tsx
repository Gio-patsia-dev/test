import { useEffect, useRef, useState } from "react";

const RefTimer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const intervalRefId = useRef<number | null>(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    intervalRefId.current = intervalId;

    console.log(intervalId, intervalRefId);

    return () => {
      clearInterval(intervalRefId.current as number);
    };
  }, []);

  return <div>{seconds}</div>;
};

export default RefTimer;
