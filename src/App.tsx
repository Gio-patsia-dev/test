import { useEffect, useState } from "react";
import "./App.css";
import PaginatedComponent from "./Components/Paginated";

function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PaginatedComponent />
    </div>
  );
}

export default App;
