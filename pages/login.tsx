import React, { useState } from "react";
import { loginUser } from "@/api/auth";

interface LoginFormState {
  email: string;
  password: string;
}

const Login = () => {
  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await loginUser(formState.email, formState.password);
      console.log(data);
      setLoading(false);
      // TODO
      // Add context to hold the current user information
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>{error}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          value={formState.email}
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={formState.password}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
