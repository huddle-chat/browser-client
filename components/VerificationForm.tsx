import { verifyEmail } from "@/api/auth";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const VerificationForm = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyEmail(user?.email, code);
      if (res.success) {
        updateUser({ ...user, isVerified: true });
        router.push("/");
      } else {
        setError(res.message);
      }
    } catch (error) {
      setError(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <label htmlFor="code">Verification Code:</label>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></input>
      <button type="submit" disabled={code.length < 6 || code.length > 6}>
        Submit
      </button>
    </form>
  );
};

export default VerificationForm;
