import { useEffect, useState } from "react";

export type CarBrandsTypeOption = {
  id: string;
  label: string;
  meta?: string;
};

type AutoCompleteProps = {
  options: CarBrandsTypeOption[]; // Full list to filter on the client
  onSelect(option: CarBrandsTypeOption): void; // Called when user picks an option
  placeholder?: string;
  debounceMs?: number; // default in params
  className?: string;
};

export default function AutoComplete({
  onSelect,
  options,
  placeholder = "Search…",
  debounceMs = 300,
  className,
}: AutoCompleteProps) {
  const [input, setInput] = useState<string>("");
  const [filtered, setFiltered] = useState<CarBrandsTypeOption[]>([]);
  const [status, setStatus] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const clear = () => {
    setInput("");
    setStatus("");
    setOpen(false);
    setFiltered([]);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const q = input.trim().toLowerCase();

      if (!q) {
        setFiltered([]);
        setStatus("");
        setOpen(false);
        return;
      }

      const next = options.filter((opt) => opt.label.toLowerCase().includes(q));

      if (next.length > 0) {
        setFiltered(next);
        setStatus(`Found brand (${next.length})`);
        setOpen(true);
      } else {
        setFiltered([]);
        setStatus("Sorry, nothing found!");
        setOpen(false);
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [debounceMs, input, options]);

  return (
    <div style={{ display: "flex", gap: 21 }} className={className}>
      <div style={{ width: 500, display: "flex", flexDirection: "column" }}>
        <input
          name="car-brand"
          value={input}
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />

        {open && (
          <ul
            style={{
              backgroundColor: "#eee",
              marginTop: 8,
              padding: 8,
              borderRadius: 6,
              listStyle: "none",
            }}
          >
            <p style={{ margin: "4px 0 8px 0", fontSize: 12 }}>{status}</p>

            {filtered.map((brand) => (
              <li
                key={brand.id}
                className="autocomplete-list-item"
                style={{
                  display: "flex",
                  gap: 6,
                  padding: 6,
                  cursor: "pointer",
                  borderRadius: 4,
                }}
                onClick={() => {
                  onSelect(brand);
                  setInput(brand.label);
                  setOpen(false);
                }}
              >
                {brand.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <button onClick={clear}>Clear</button>
      </div>
    </div>
  );
}
