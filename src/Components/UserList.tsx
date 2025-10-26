// UserList.jsx
import { type User } from "./UsersContainer";

type UserListProps = {
  loading: boolean;
  error: string | null;
  onReload?: () => void;
  users: User[];
};

const UserList = ({ loading, error, users, onReload }: UserListProps) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div>
          <p style={{ color: "crimson" }}>Error: {error}</p>
        </div>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} style={{ display: "flex", gap: "8px" }}>
              <strong>{user.name}</strong> — <span>{user.role}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Footer with Refresh always visible */}
      <div style={{ marginTop: 8 }}>
        <button onClick={() => onReload && onReload()}>Refresh</button>
      </div>
    </div>
  );
};

export default UserList;
