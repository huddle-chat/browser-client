import { CurrentUser } from "@/@types/user";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

interface AuthResponse {
  success: boolean;
  message: string;
  data: null;
}

export async function registerUser(
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  });

  if (res.status !== 200) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const data = await res.json();
  console.log(data);
  return data;
}

interface LoginResponse {
  data: {
    user: CurrentUser;
    token: string;
  };
  message: string;
  success: boolean;
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (res.status !== 200) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const data = await res.json();
  console.log("data", data);
  return data;
}

interface FetchMeResponse {
  data: {
    user: CurrentUser;
  };
  message: string;
  success: boolean;
}

export async function fetchMe(token: string): Promise<FetchMeResponse> {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    const error = await res.json();
    console.log(error);
    throw new Error(error.message);
  }

  const data = await res.json();
  return data;
}

export async function logout(token: string): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    const error = await res.json();
    console.log(error);
    throw new Error(error.message);
  }

  const data = await res.json();
  return data;
}
