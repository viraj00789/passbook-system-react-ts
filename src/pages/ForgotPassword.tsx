import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Maglo from "../assets/maglo.svg";
import auth from "../assets/auth-bg.png";
import Input from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { FaArrowLeft } from "react-icons/fa";

type Errors = {
  email?: string;
};

export default function ForgotPassword() {
  const router = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    // fake success flow
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
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              placeholder="Enter the email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ email: e.target.value });
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              error={errors.email}
              required
            />

            <Button
              buttonType="submit"
              title="Send"
              className="w-full bg-primary text-gray-900 font-bold"
              buttonPadding="p-2"
            />

            <Link
              to="/sign-in"
              className="flex gap-3 items-center justify-center"
            >
              <FaArrowLeft size={18} className="text-primary" />
              <p className="text-md text-center font-medium text-primary-600 hover:text-primary-700">
                Back to Sign In
              </p>
            </Link>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE – IMAGE */}
      <div className="hidden lg:block">
        <img
          src={auth}
          alt="Hero"
          className="object-cover h-screen w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}
