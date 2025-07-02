import { Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ownerSignupService } from "../api/owner.api";
import OtpModal from "../components/Modal/OtpModal";
import { OwnerSignupValidationSchema } from "../validation/owner.validation";

const OwnerSignup: React.FC = () => {
  const [visibility, setVisibility] = useState(false);
  const [, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [signupError, setSignupError] = useState<string | null>(null);

  const initialValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);

    const response = await ownerSignupService(values);
    if (response.success) {
      setVisibility(true);
      setEmail(values.email.toLowerCase());
      setTimeout(() => {
        setSignupError("");
      }, 2500);
    } else {
      if ("status" in response) {
        if (response.status == 409) {
          setSignupError("Already an account is registered with this email");
        }

        if (response.status == 500) {
          setSignupError("Something went wrong try again later - server error");
        }
      }
    }

    setLoading(false);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen flex items-center justify-center">
        <div className="flex w-full max-w-4xl h-screen">
          {/* Left Side */}
          <div className="hidden md:flex w-1/2 bg-gradient-to-t from-blue-900 to-indigo-800 p-10 items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                Welcome to Fluentawork
              </h1>
              <p className="text-lg mb-6">
                Streamline your projects with ease and elegance.
              </p>
              <svg
                className="w-64 h-64 mx-auto"
                viewBox="0 0 200 200"
                fill="none"
              >
                <path
                  d="M50 20 C70 10 130 10 150 20 C170 30 180 70 150 100 C130 130 70 130 50 100 C30 70 20 30 50 20"
                  stroke="white"
                  strokeWidth="5"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="50"
                  stroke="white"
                  strokeWidth="5"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Right Side: Signup Form */}
          <div className="w-full md:w-1/2 bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg flex items-center justify-center">
            <div className="w-full max-w-md space-y-6">
              <h2 className="text-3xl font-semibold text-center">Sign Up</h2>

              <Formik
                initialValues={initialValues}
                validationSchema={OwnerSignupValidationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
                        placeholder="Enter your name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.name && errors.name && (
                        <div className="mt-1 text-sm text-red-400 bg-red-900/30 border border-red-500 px-3 py-1 rounded-md">
                          {errors.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
                        placeholder="Enter your email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.email && errors.email && (
                        <div className="mt-1 text-sm text-red-400 bg-red-900/30 border border-red-500 px-3 py-1 rounded-md">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.password && errors.password && (
                        <div className="mt-1 text-sm text-red-400 bg-red-900/30 border border-red-500 px-3 py-1 rounded-md">
                          {errors.password}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
                        placeholder="Confirm your password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <div className="mt-1 text-sm text-red-400 bg-red-900/30 border border-red-500 px-3 py-1 rounded-md">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-indigo-600 p-2 rounded-md hover:bg-indigo-700 transition duration-200"
                    >
                      Sign Up
                    </button>
                  </form>
                )}
              </Formik>
              {signupError ? (
                <p className="text-red-500 text-sm text-center">
                  {signupError}
                </p>
              ) : (
                <p className="text-center text-gray-400 text-sm">
                  Already have an account?{" "}
                  <Link to={"/owner/signin"}>
                    <span className="text-indigo-600 hover:underline">
                      Sign in
                    </span>
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <OtpModal
        email={email}
        visibility={visibility}
        onClose={() => setVisibility(false)}
      />
    </>
  );
};

export default OwnerSignup;
