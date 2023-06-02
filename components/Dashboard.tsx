import { fetchGuilds } from "@/api/guild";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";

const Dashboard = () => {
  const [guilds, setGuilds] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        if (token) {
          const { data } = await fetchGuilds(token);

          setGuilds(data.guilds);
          setLoading(false);
        } else {
          setGuilds([]);
          setLoading[false];
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    })();
  }, [token, user]);

  return (
    <div>
      <h1>Your Guilds</h1>
      <ul>
        {guilds?.map((guild) => {
          return <li>{guild.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Dashboard;
