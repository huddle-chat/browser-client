export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/v1/auth/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
}
