import { useRef,useEffect } from "react";

const UseRef = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    inputRef.current?.focus()
    console.log(inputRef.current)
  })
  return (
    <div>
      <input id="input" ref={inputRef} type="text"  />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </div>
  );
};

export default UseRef;
