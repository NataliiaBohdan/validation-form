import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ValidationCodePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //let's pretend the code is "123456"
    if (code === "123456") {
      navigate("/success");
    } else {
      alert("Invalid code");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-6 min-h-screen">
      <h2 className="text-stone-800 text-xl">Check Your Email</h2>
      <p className="text-stone-600 text-center">
        We’ve sent a 6-digit code to <strong>{email}</strong>. <br />
        Enter it below to continue.
      </p>
      <form onSubmit={handleSubmit} className="min-w-72 flex flex-col gap-y-4">
        <input
          type="text"
          name="code"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border-2 py-2 px-3 border-stone-300 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:border-cyan-700"
        />
        <button
          type="submit"
          className="bg-cyan-700 py-2 px-4 text-white hover:bg-cyan-800 transition"
        >
          Verify Code
        </button>
      </form>
    </div>
  );
}
