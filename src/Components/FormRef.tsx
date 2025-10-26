import { useEffect, useRef } from "react";

const FormRef = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Enter") {
        if (document.activeElement === nameRef.current) {
          emailRef.current?.focus();
        } else if (document.activeElement === emailRef.current) {
          passwordRef.current?.focus();
        } else if (document.activeElement === passwordRef.current) {
          alert("Form submited ");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input ref={nameRef} type="text" name="name" id="name" />
        <input ref={emailRef} type="email" name="email" id="email" />
        <input
          ref={passwordRef}
          type="password"
          name="password"
          id="password"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={() => nameRef.current?.focus()}>name focus</button>
        <button onClick={() => emailRef.current?.focus()}>email focus</button>
        <button onClick={() => passwordRef.current?.focus()}>
          password focus
        </button>
      </div>
    </div>
  );
};

export default FormRef;
