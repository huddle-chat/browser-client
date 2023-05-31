import Link from "next/link";

const Landing = () => {
  return (
    <div>
      <h1>Welcome to huddle.</h1>
      <Link href="/register">Get Started</Link>
    </div>
  );
};

export default Landing;
