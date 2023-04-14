const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

interface RegisterResponse {
  success: boolean;
  message: string;
  data: null;
}

interface CurrentUser {
  avatar: string;
  createdAt: string;
  email: string;
  isVerified: boolean;
  userId: string;
  onlineStatus: number;
  username: string;
}

interface LoginResponse {
  data: CurrentUser;
  message: string;
  success: boolean;
}

export async function registerUser(
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> {
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
