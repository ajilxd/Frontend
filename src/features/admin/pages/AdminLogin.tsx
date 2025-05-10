import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LOGIN_IMAGE_ADMIN_URL } from "@/constants/images";
import { adminLoginSuccess } from "@/redux/slices/adminSlice";
import { setActiveRole } from "@/redux/slices/globalSlice";

import { adminSignInService } from "../api/admin.api";
import { adminSigninValidationSchema } from "../validation/admin.validation";

const AdminLogin: React.FC = () => {
  const [loginError, setLoginError] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };

  async function handleAdminSignInSubmit(values: typeof initialValues) {
    const res = await adminSignInService(values);
    if (res.success) {
      dispatch(adminLoginSuccess({ accessToken: res.data.accessToken }));
      localStorage.setItem("activeRole", "admin");
      localStorage.setItem("adminAccessToken", res.data.accessToken);
      dispatch(setActiveRole({ activeRole: "admin" }));
      enqueueSnackbar(res.message, { variant: "success" });
      setTimeout(() => navigate("/admin/dashboard"), 500);
    } else {
      if ("status" in res) {
        if (res.status === 404) {
          enqueueSnackbar(res.message, { variant: "error" });
          setLoginError(res.message);
        } else if (res.status === 401) {
          enqueueSnackbar(res.message, { variant: "error" });
          setLoginError(res.message);
        } else {
          enqueueSnackbar(res.message, { variant: "error" });
          setLoginError(res.message);
        }
      }
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 bg-gray-900 p-12 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <p className="text-gray-400">Welcome Admin! Sign in to continue</p>
          </div>

          <div className="space-y-6">
            <Formik
              initialValues={initialValues}
              validationSchema={adminSigninValidationSchema}
              onSubmit={handleAdminSignInSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleSubmit,
                handleBlur,
                handleChange,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Your email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-1 bg-gray-800 border-gray-700 text-white"
                    />
                    {touched.email && errors.email && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Password
                    </label>
                    <div className="flex justify-between items-center">
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    {touched.password && errors.password && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isSubmitting}
                  >
                    Sign In
                  </Button>

                  <div className="text-red-500 text-sm mt-1">{loginError}</div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 bg-gray-100">
        <img
          src={LOGIN_IMAGE_ADMIN_URL}
          alt="admin login image"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
    </div>
  );
};

export default AdminLogin;
