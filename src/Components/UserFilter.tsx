import type { User } from "./UsersContainer";

type UserFilterProps = {
  user: User[];
};

const UserFilter = ({ user }: UserFilterProps) => {
  return (
    <div>
      <select>
        {user?.map((user) => (
          <option key={user.id}>{user.name}</option>
        ))}
      </select>
    </div>
  );
};

export default UserFilter;
