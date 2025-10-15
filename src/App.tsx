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
      <main>main content</main>
      <Navbar />
      <UseRef />
    </div>
  );
}

export default App;
