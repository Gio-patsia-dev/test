import type { User } from "./DebounceFilter";

type UserDataProps = {
  users: User[];
  fetching: boolean;
};

export const UserData = ({ users, fetching }: UserDataProps) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {fetching ? (
        "Filtering Data"
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {users.map((user) => (
            <div
              style={{
                width: "30%",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2px",
                backgroundColor: "lightgray",
                borderRadius: "20px",
                cursor: "pointer",
              }}
              key={user.id}
            >
              <h4 style={{ fontSize: "16px" }}>{user.firstName}</h4>
              <p style={{ fontSize: "12px" }}>
                Company:{user.company.department}
              </p>
            </div>
          ))}
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <button style={{ height: "30px", cursor: "pointer" }}>Load More</button>
      </div>
    </div>
  );
};
