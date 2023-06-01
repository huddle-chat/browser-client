import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import { logout } from "@/api/auth";
import { useRouter } from "next/router";

const Navbar = () => {
  const { user, token, updateToken, updateUser } = useContext(AuthContext);
  const router = useRouter();

  const logoutUser = async () => {
    try {
      await logout(token);
      updateToken(null);
      updateUser(null);
      localStorage.removeItem("access_token");
      router.push("/");
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/protected">Protected</Link>
      {user ? (
        <span onClick={logoutUser}>Logout</span>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Sign Up</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
