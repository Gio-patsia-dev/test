import { useMemo, useState } from "react";

const FilteredList = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

  const filteredData = useMemo(() => {
    if (!inputValue) return items;
    return items.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, items]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "lightgray",
        width: "600px",
      }}
    >
      <input
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        style={{ height: "30px" }}
        type="text"
        placeholder="Search"
      />
      <ul
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          width: "90%",
          height: "200px",
          overflowY: "scroll",
          flexWrap: "wrap",
        }}
      >
        {filteredData.map((item, index) => (
          <li style={{ padding: "12px", width: "10%" }} key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredList;
