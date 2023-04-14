import { AuthContext } from "@/context/auth";
import { useContext } from "react";

export default function Home() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <h1>Hello! {currentUser.userId ? currentUser.username : "Guest!"}</h1>
    </>
  );
}
