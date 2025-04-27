import { Formik, Field, Form, ErrorMessage } from "formik";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ownerForgetPassword } from "@/redux/slices/ownerSlice";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { forgetPasswordService } from "../api/owner.api";
import { ForgetPasswordValidationSchema } from "../validation/owner.validation";

export default function ForgetPassword() {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const initialValues = { email: "" };

  const handleSubmit = async (values: { email: string }) => {
    setIsSubmitting(true);
    dispatch(ownerForgetPassword({ forgetPasswordEmail: values.email }));

    const response = await forgetPasswordService(values);
    if (response.success) {
      enqueueSnackbar("Reset password has been sent to your email", {
        variant: "success",
      });
    } else {
      if ("status" in response) {
        if (response.status === 404) {
          enqueueSnackbar("Invalid email", { variant: "error" });
        }
        console.error(response.status + " : " + response.message);
      } else {
        enqueueSnackbar("Try again later", {
          variant: "error",
        });
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700 shadow-2xl rounded-xl">
        <CardHeader className="space-y-2 p-6">
          <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-gray-400 text-center text-sm md:text-base">
            Enter your email to receive a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <Formik
            initialValues={initialValues}
            validationSchema={ForgetPasswordValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid }) => (
              <Form className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-200"
                  >
                    Email Address
                  </Label>
                  <Field
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-400 text-xs mt-1"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
