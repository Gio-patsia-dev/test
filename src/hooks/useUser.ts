import type { ResolveType, User } from "../Components/UsersContainer";

// small fake fetch with optional failure chance
export function fetchSim({
  delay = 1500,
  failChance = 0.0,
} = {}): Promise<ResolveType> {
  const data: User[] = [
    { id: 1, name: "Giorgi", role: "Developer" },
    { id: 2, name: "Nika", role: "Designer" },
    { id: 3, name: "Saba", role: "PM" },
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const willFail = Math.random() < failChance;
      if (willFail) {
        reject(new Error("Ups, something went wrong (simulated)"));
      } else {
        resolve({ status: true, data });
      }
    }, delay);
  });
}
