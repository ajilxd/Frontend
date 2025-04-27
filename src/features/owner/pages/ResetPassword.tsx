import { Formik, Field, Form, ErrorMessage } from "formik";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetOwnerForgetPassword } from "@/redux/slices/ownerSlice";
import { RootState } from "@/redux/store/appStore";

import { resetPasswordService } from "../api/owner.api";
import { ResetPasswordValidationSchema } from "../validation/owner.validation";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgetPasswordEmail = useSelector(
    (state: RootState) => state.owner.forgetPasswordEmail
  );
  const { token } = useParams();

  console.log(`resetting password for ${forgetPasswordEmail}`);
  const email = forgetPasswordEmail;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values: { password: string }) => {
    setIsSubmitting(true);
    try {
      if (typeof token === "string" && email) {
        const res = await resetPasswordService({
          email,
          password: values.password,
          token,
        });
        console.log(token, email);
        console.log(res);
        enqueueSnackbar(
          res.success
            ? "Password successfully reset!"
            : "Something went wrong, please try again.",
          {
            variant: res.success ? "success" : "error",
          }
        );
        dispatch(resetOwnerForgetPassword());
        setTimeout(() => {
          navigate("/owner/signin");
        }, 1500);
      }
    } catch (err) {
      enqueueSnackbar("An error occurred. Please try again.", {
        variant: "error",
      });
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-950 p-4">
      <Card className="w-full max-w-md shadow-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <CardHeader className="space-y-2 p-6 sm:p-8">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Reset Your Password
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Create a new password for your account
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <Formik
            initialValues={{ password: "", confirmpassword: "" }}
            onSubmit={handleSubmit}
            validationSchema={ResetPasswordValidationSchema}
          >
            {({ isValid, dirty }) => (
              <Form className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      New Password
                    </Label>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter new password"
                      className="w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 dark:text-red-400 text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmpassword"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Confirm Password
                    </Label>
                    <Field
                      as={Input}
                      id="confirmpassword"
                      name="confirmpassword"
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                    />
                    <ErrorMessage
                      name="confirmpassword"
                      component="div"
                      className="text-red-500 dark:text-red-400 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting || !isValid || !dirty}
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
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Resetting...
                    </span>
                  ) : (
                    "Reset Password"
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
