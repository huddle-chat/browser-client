import { useState } from "react";
import { registerUser } from "@/api/auth";

const Register = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = await registerUser(
      formState.username,
      formState.email,
      formState.password
    );
    setLoading(false);
    console.log(data);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />

        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          value={formState.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          value={formState.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
