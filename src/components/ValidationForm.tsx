import { useState } from "react";
import { useNavigate } from "react-router-dom";
type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function ValidationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const validate = (): Partial<FormData> => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      navigate("/validate", { state: { email: formData.email } });
    }
  };

  return (
    <div className="flex flex-col gap-y-6 min-w-92 ">
      <h2 className="text-stone-800 text-xl m-auto">Register Now</h2>
      <form
        className="min-w-72 flex flex-col gap-y-4 m-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label className="text-stone-800 pb-1">Your Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={formData.name}
            className="border-1 py-1 border-stone-300 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700 active:border-cyan-700"
            required
          ></input>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-stone-800 pb-1">Your Email</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="border-1 py-1 border-stone-300 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700 active:border-cyan-700"
            required
          ></input>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-stone-800 pb-1">Create Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="border-1 py-1 border-stone-300 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700 active:border-cyan-700"
            required
          ></input>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-stone-800 pb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            className="border-1 border-stone-300 py-1 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700 active:border-cyan-700"
            required
          ></input>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <button
          className="bg-cyan-700 py-2 px-4 text-blue-50 border border-transparent 
             focus:outline-none focus:ring-2 focus:ring-cyan-800 focus:border-cyan-800 
             active:bg-cyan-900 active:ring active:ring-cyan-800"
          type="submit"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
}
