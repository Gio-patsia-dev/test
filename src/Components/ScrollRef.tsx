import { useEffect, useRef } from "react";

const ScrollRef = () => {
  const scrollDownRef = useRef<number>(0);
  const scrollUpRef = useRef<number>(0);
  useEffect(() => {
    const scrollListiner = (e: WheelEvent) => {
      const direction = e.deltaY > 0 ? "down" : "up";
      if (direction === "down") {
        scrollDownRef.current++;
        console.log(`Scroll-Down:${scrollDownRef.current}`);
      } else {
        scrollUpRef.current++;
        console.log(`Scroll-Up:${scrollUpRef.current}`);
      }
    };
    window.addEventListener("wheel", scrollListiner);
    return () => {
      window.removeEventListener("wheel", scrollListiner);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(`Scrolled Down:${scrollDownRef.current}:Times`);
      console.log(`Scrolled Up:${scrollUpRef.current}:Times`);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div></div>;
};

export default ScrollRef;
