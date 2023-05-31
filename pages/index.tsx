import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import Landing from "@/components/Landing";

export default function Home() {
  const { user } = useContext(AuthContext);

  if (!user?.userId) {
    return <Landing />;
  }

  return (
    <>
      <h1>Hello! {user?.username}</h1>
    </>
  );
}
