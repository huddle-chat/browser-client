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
      console.log("FIRING IN DASHBOARD");
      try {
        console.log("the token in dashboard", token);
        if (token) {
          const { data } = await fetchGuilds(token);
          console.log("the data", data);
          setGuilds(data.guilds);
          setLoading(false);
        } else {
          console.log("no guilds for some reason");
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
