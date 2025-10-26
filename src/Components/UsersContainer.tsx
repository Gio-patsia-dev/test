// UsersContainer.jsx
import { useEffect, useState } from "react";
import UserList from "./UserList";
import { fetchSim } from "../hooks/useUser";
import UserFilter from "./UserFilter";

export type User = {
  id: number;
  name: string;
  role: string;
};

export type ResolveType = {
  status: boolean;
  data: User[];
};

const UsersContainer = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async (opts?: { failChance?: number }) => {
    try {
      setError(null);
      setLoading(true);
      const result = await fetchSim({
        delay: 1500,
        failChance: opts?.failChance ?? 0,
      });
      if (result.status) setUsers(result.data);
    } catch (err) {
      // normalize error to string
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  // initial fetch on mount
  useEffect(() => {
    getData(); // default no failure
  }, []);

  const reload = async () => {
    // example: sometimes simulate failure on reload (10%):
    await getData({ failChance: 0.1 });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <UserList
        users={users}
        loading={loading}
        error={error}
        onReload={reload}
      />
      <UserFilter user={users} />
    </div>
  );
};

export default UsersContainer;
