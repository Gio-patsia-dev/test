import "./App.css";
import AutoComplete from "./Components/AutoComplete";
import UseRef from "./Components/UseRef";
import { CAR_BRANDS } from "./constants";

function App() {
  return (
    <div
      style={{ display: "flex", alignItems: "center", justifyItems: "center" }}
    >
      {/* <AutoComplete
        options={CAR_BRANDS}
        onSelect={() => CAR_BRANDS}
        placeholder="Search car brand"
      /> */}
      <UseRef />
    </div>
  );
}

export default App;
