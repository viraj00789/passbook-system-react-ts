import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Maglo from "../assets/maglo.svg";
import auth from "../assets/auth-bg.png";

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("auth");
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) return;

    localStorage.setItem("auth", JSON.stringify({ email }));

    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-dark-blue text">
      {/* LEFT SIDE */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="lg:text-start text-center">
            <img
              src={Maglo}
              alt="Passbook Logo"
              width={50}
              height={40}
              className="bg-white rounded-2xl mx-auto lg:mx-0 "
            />
            <h2 className="mt-8 text-2xl font-bold">Welcome back</h2>
            <p className="mt-2 text-sm opacity-70">
              Welcome back! Please enter your details
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              placeholder="Enter the email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Enter the password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Input id="remember" name="remember" type="checkbox" />
                <span className="text-sm">Remember me</span>
              </div>

              <Link to="/forgot-password" className="text-sm text-primary-600">
                Forgot password?
              </Link>
            </div>

            <Button
              buttonType="submit"
              title="Sign In"
              className="w-full bg-primary text-gray-900 font-bold"
            />
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:block">
        <img
          src={auth}
          alt="Hero"
          className="object-cover h-[calc(100vh)] w-full"
        />
      </div>
    </div>
  );
}
