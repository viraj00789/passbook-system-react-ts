import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Maglo from "../assets/maglo.svg";
import auth from "../assets/auth-bg.png";
import Input from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function ForgotPassword() {
  const router = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;
    router("/");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-dark-blue">
      {/* LEFT SIDE – FORM */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo */}
          <div className="lg:text-start text-center">
            <img
              src={Maglo}
              alt="Passbook Logo"
              width={50}
              height={40}
              className="bg-white rounded-2xl mx-auto lg:mx-0"
            />
            <h2 className="mt-8 text-2xl font-bold tracking-tight text">
              Forgot Password
            </h2>
            <p className="text mt-2 text-sm font-medium opacity-70">
              Forgot Password? Please enter your email
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
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

            {/* Button */}
            <Button buttonType="submit" title="Send" />
            <Link to="/sign-in">
              <p className="text-md text-center font-medium text-primary-600 hover:text-primary-700">
                Back to Sign In
              </p>
            </Link>
          </form>

          {/* Link */}
        </div>
      </div>

      {/* RIGHT SIDE – IMAGE */}
      <div className="relative hidden lg:block h-[calc(100vh)] w-full">
        <img src={auth} alt="Hero Image" className="object-cover" />
      </div>
    </div>
  );
}
