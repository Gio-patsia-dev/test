import { useEffect, useState } from "react";
import type { PaginatedData } from "./DebounceFilter";
import { UserData } from "./UserData";

const PaginatedComponent = () => {
  const [data, setData] = useState<PaginatedData | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const api = "https://dummyjson.com/users?limit=10&skip=0";

  // inital fething
  useEffect(() => {
    const getData = async () => {
      try {
        setFetching(true);
        const response = await fetch(api);
        const responseData = await response.json();
        setData(responseData.users);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <h1>test</h1>
      {/*<UserData users={data?.users} fetching={fetching} />*/}
    </>
  );
};

export default PaginatedComponent;
