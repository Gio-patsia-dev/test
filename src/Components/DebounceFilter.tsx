import { useEffect, useMemo, useRef, useState } from "react";
import { UserData } from "./UserData";

export interface Hair {
  color: string;
  type: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

export interface Bank {
  cardExpire: string; // e.g. "03/26"
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string; // ISO-like "1996-5-30"
  image: string; // URL
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein?: string;
  ssn?: string;
  userAgent?: string;
  crypto?: Crypto;
  role?: string;
}

export interface PaginatedData {
  users: User[];
  limit: number;
  skip: number;
  total: number;
}

const DebounceFilter = () => {
  const [query, setQuery] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const api = "https://dummyjson.com/users?limit=10&skip=0";
  const [fetching, setFetching] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const initialUsersRef = useRef<User[] | null>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    const id = window.setTimeout(() => {
      setQuery(inputValue);
    }, 300);
    return () => {
      clearTimeout(id);
    };
  }, [inputValue]);

  // initial fetching
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getAll = async () => {
      try {
        setFetching(true);
        const res = await fetch(api, { signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as PaginatedData;
        console.log(data);
        const list = Array.isArray(data.users) ? data.users : [];
        initialUsersRef.current = list;
        setUsers(list);
      } catch (err: any) {
        if (err.name === "AbortError") {
          // aborted — ok
        } else {
          console.error(err);
        }
      } finally {
        setFetching(false);
      }
    };

    getAll();
    return () => controller.abort();
  }, []); // only once on mount

  useEffect(() => {
    if (!query) {
      if (initialUsersRef.current) {
        setUsers(initialUsersRef.current);
      } else {
        setUsers([]);
      }
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;
    const searchUrl = `https://dummyjson.com/users/search?q=${encodeURIComponent(query)}`;

    const doSearch = async () => {
      try {
        setFetching(true);
        const res = await fetch(searchUrl, { signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // data.users is expected
        setUsers(Array.isArray(data.users) ? data.users : []);
      } catch (err: any) {
        if (err.name === "AbortError") {
          // aborted — no problem
        } else {
          console.error(err);
        }
      } finally {
        setFetching(false);
      }
    };

    doSearch();

    return () => {
      controller.abort(); // cleanup: abort this fetch if query changes/unmount
    };
  }, [query]); // <-- ONLY quer

  const filteredData = useMemo(() => users, [users]);

  return (
    <div>
      <div style={{ padding: "30px" }}>
        <input
          style={{ height: "30px", width: "250px" }}
          placeholder="Debounce search"
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <UserData fetching={fetching} users={filteredData} />
    </div>
  );
};

export default DebounceFilter;
