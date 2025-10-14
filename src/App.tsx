import "./App.css";
import AutoComplete from "./Components/AutoComplete";
import Navbar from "./Components/Navbar";
import UseRef from "./Components/UseRef";
import { CAR_BRANDS } from "./constants";

function App() {
  return (
    <div
      style={{ display: "flex", alignItems: "center", justifyItems: "center" }}
    >
      <Navbar />
      <UseRef />
    </div>
  );
}

export default App;
