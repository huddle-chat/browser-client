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
      if (token) {
        await logout(token);
        updateUser(null);
        updateToken(null);
        localStorage.removeItem("access_token");
      }

      if (router.asPath !== "/") {
        router.push("/");
      }
    } catch (e: any) {
      // TODO:
      // create a universal error message component
      // upon catching an error, error component will be updated to reflect the message
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
