import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import Landing from "@/components/Landing";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const { user, token } = useContext(AuthContext);

  // if not logged in, user should see default landing page at "/"
  if (!token) {
    return <Landing />;
  }

  // if user is logged in, user will see dashboard with all their guilds/channels
  return (
    <>
      <h1>Hello! {user?.username}</h1>
      <Dashboard />
    </>
  );
}
