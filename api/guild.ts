const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const fetchGuilds = async (token: string) => {
  const res = await fetch(`${BASE_URL}/guilds`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  if (res.status !== 200) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const data = await res.json();

  return data;
};
