import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { loginUser } from "@/api/auth";
import { useRouter } from "next/router";

interface LoginFormState {
  email: string;
  password: string;
}

const Login = () => {
  const { updateUser } = useContext(AuthContext);

  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await loginUser(formState.email, formState.password);
      setLoading(false);

      updateUser(data.user);
      setFormState({});
      router.push("/");

      localStorage.setItem("access_token", data.token);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

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
