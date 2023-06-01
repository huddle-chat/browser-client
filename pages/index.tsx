import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import Landing from "@/components/Landing";

export default function Home() {
  const { user } = useContext(AuthContext);

  // if not logged in, user should see default landing page at "/"
  if (!user?.userId) {
    return <Landing />;
  }

  // if user is logged in, user will see dashboard with all their guilds/channels
  return (
    <>
      <h1>Hello! {user?.username}</h1>
    </>
  );
}
