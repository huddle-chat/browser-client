import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Sign Up</Link>
      <Link href="/protected">Protected</Link>
    </nav>
  );
};

export default Navbar;
