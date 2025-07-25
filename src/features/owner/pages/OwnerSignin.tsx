import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { ownerLoginSuccess } from "@/redux/slices/ownerSlice";

import { ownerOtpRequestService, ownerSigninService } from "../api/owner.api";
import OAuth from "../components/Oauth";
import { OwnerSigninValidationSchema } from "../validation/owner.validation";
import { Button } from "@/components/ui/button";
import OtpModal from "../components/Modal/OtpModal";

const OwnerSignin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string>("");
  const [, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const [showVerificationBtn, setShowVerificationBtn] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleRequestVerificationEmail = async () => {
    const response = await ownerOtpRequestService(email);
    if (response.success) {
      enqueueSnackbar("Otp has been sent to your email", {
        variant: "success",
      });
      setShowOtpModal(true);
    } else {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      console.error(response?.message);
    }
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setEmail(values.email);
    const response = await ownerSigninService(values);
    setLoading(true);

    if (response.success) {
      const {
        subscription = {},
        stripe_customer_id,
        _id,
        email,
      } = response.data.data;
      const { accessToken } = response.data;
      enqueueSnackbar("login success", { variant: "success" });
      dispatch(
        ownerLoginSuccess({
          accessToken,
          subscription: subscription,
          _id,
          stripe_customer_id,
          email,
        })
      );
      localStorage.setItem("ownerAccessToken", accessToken);
      setIsSubmitting(true);
      setLoading(false);
      setError("");
      navigate("/owner/dashboard");
    } else {
      if ("status" in response) {
        console.log(response.status);
        if (response.status == 400) {
          setError("Invalid email or password");
        }

        if (response.status === 404) {
          setError("Invalid email or password");
        }

        if (response.status == 403) {
          setError(response.message);
        }

        if (response.status == 412) {
          setShowVerificationBtn(true);
          setError("Email verification is required");
        }
      }
      setLoading(false);
    }
  };
  return (
    <>
      <OtpModal
        email={email}
        visibility={showOtpModal}
        onClose={() => setShowOtpModal(false)}
      ></OtpModal>
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
                xmlns="http://www.w3.org/2000/svg"
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

          <div className="w-full md:w-1/2 bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg flex items-center justify-center">
            <div className="w-full max-w-md space-y-6">
              <h2 className="text-3xl font-semibold text-center">Sign In</h2>

              <OAuth />

              <div className="flex items-center my-4">
                <hr className="flex-1 border-gray-600" />
                <span className="px-3 text-gray-400">or</span>
                <hr className="flex-1 border-gray-600" />
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={OwnerSigninValidationSchema}
                onSubmit={handleSubmit}
              >
                <Form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-500"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-1 text-sm text-red-400 bg-red-900/30 border border-red-500 px-3 py-1 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-500"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-sm text-red-400 bg-red-900/30 border border-red-500 px-3 py-1 rounded-md"
                    />
                  </div>

                  <div className="text-sm text-indigo-400 hover:underline">
                    <Link to="/owner/forget-password">Forgot password?</Link>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 p-2 rounded-md hover:bg-indigo-700 transition duration-200"
                    disabled={isSubmitting}
                  >
                    Sign In
                  </button>
                </Form>
              </Formik>

              {error && (
                <div className="mt-4 text-sm text-red-300 bg-red-900/20 border border-red-600 px-4 py-3 rounded-lg text-center space-y-3">
                  {showVerificationBtn ? (
                    <>
                      <p>{error}</p>
                      <Button
                        className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200"
                        onClick={handleRequestVerificationEmail}
                      >
                        Request OTP Verification
                      </Button>
                    </>
                  ) : (
                    <p>{error}</p>
                  )}
                </div>
              )}

              <p className="text-center text-sm text-gray-400">
                Don’t have an account?{" "}
                <Link to="/owner/signup">
                  <span className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    Sign up
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerSignin;
