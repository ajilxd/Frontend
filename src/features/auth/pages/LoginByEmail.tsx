import clsx from "clsx";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { managerLoginSuccess } from "@/redux/slices/managerSlice";

import { authlogin, authSendOtp } from "../api/auth.api";
import { userLoginSuccess } from "@/redux/slices/userSlice";

const LoginByEmail: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [role, setRole] = useState<"user" | "manager" | "">("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasClickedSendOTP, setHasClickedSendOTP] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!role) {
      setError("Please select your role.");
      return;
    }
    setIsLoading(true);
    setError(null);
    const response = await authlogin({ email, otp, role });

    if (response.success) {
      const { role } = response.data.data;
      if (role === "manager") {
        const managerAccessToken = response.data.accessToken;
        const managerData = response.data.data;
        console.log(managerData);
        if (!managerAccessToken) {
          return console.warn("No accesstoken found,Try login again");
        }
        if (!managerData) {
          return console.warn("NO managerdata found");
        }

        if (managerAccessToken && managerData) {
          dispatch(
            managerLoginSuccess({
              accessToken: managerAccessToken,
              data: {
                id: managerData.id,
                name: managerData.name,
                email: managerData.email,
                image: managerData.image || "",
                ownerId: managerData.ownerId,
                ownerName: managerData.ownerName,
                ownerIsSubscribed: managerData.ownerSubscription.name
                  ? true
                  : false,
                ownerSubscribedPlan: managerData.ownerSubscription.name,
                company: managerData.companyName ?? "",
                companyId: managerData.companyId ?? "",
              },
            })
          );
          localStorage.setItem("managerAccessToken", managerAccessToken);
          setTimeout(() => navigate("/manager/dashboard"), 1500);
        }
      } else if (role === "user") {
        const userAccessToken = response.data.accessToken;
        const userData = response.data.data;
        if (!userAccessToken) {
          return console.warn("No accesstoken found,Try login again");
        }
        if (!userData) {
          return console.warn("NO user data found");
        }

        if (response.success) {
          console.log("userData", userData);
          console.log("accesstoken", userAccessToken);
          dispatch(
            userLoginSuccess({
              accessToken: userAccessToken,
              data: {
                id: userData.id,
                managerImage: userData.managerImage,
                managerName: userData.managerName,
                ownerId: userData.ownerId,
                ownerIsSubscribed: userData.ownerSubscription.name
                  ? true
                  : false,
                ownerSubscribedPlan: userData.ownerSubscription.name,
                company: "",
                ownerName: userData.ownerName,
              },
            })
          );

          localStorage.setItem("userAccessToken", userAccessToken);
          setTimeout(() => navigate("/user/dashboard"), 1500);
        }
      }

      enqueueSnackbar("Login successful", { variant: "success" });
    } else {
      setError(response.message);
    }
    setIsLoading(false);
    setTimeout(() => setError(""), 1500);
  };

  const handleSendOTP = async () => {
    setHasClickedSendOTP(true);
    const response = await authSendOtp(email, role);
    if (response.success) {
      enqueueSnackbar("Otp sent to your email successfully", {
        variant: "success",
      });
    } else {
      console.log(response);
      if ("status" in response) {
        if (response.status === 401 || response.status === 404) {
          enqueueSnackbar("No " + role + " account with this email", {
            variant: "error",
          });
        }
      } else {
        enqueueSnackbar("Something went wrong. Try again", {
          variant: "error",
        });
        console.warn(response.message);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 dark:from-blue-700 dark:to-purple-900 opacity-5 rounded-lg"></div>
        <CardHeader className="space-y-1 text-center z-10 relative">
          <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
            Sign In
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Enter your email and OTP to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="z-10 relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-4"
          >
            {/* Role Selector */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 text-center">
                as
              </p>
              <div className="flex justify-center gap-4">
                {["user", "manager"].map((r) => (
                  <Button
                    key={r}
                    type="button"
                    variant="outline"
                    onClick={() => setRole(r as "user" | "manager")}
                    className={clsx(
                      "capitalize",
                      role === r
                        ? "bg-blue-600 text-white dark:bg-blue-700"
                        : "bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
                    )}
                  >
                    {r}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                pick a role to login
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-white dark:bg-slate-900"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="otp"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  One-Time Password
                </label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleSendOTP}
                  disabled={!email}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-0 h-auto"
                >
                  {hasClickedSendOTP ? "Resend Code" : "Send Code"}
                </Button>
              </div>
              <Input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={!email}
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
                className="w-full bg-white dark:bg-slate-900"
              />
            </div>

            {error && (
              <div className="text-red-500 dark:text-red-400 text-sm text-center py-1">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-700 dark:to-purple-800 dark:hover:from-blue-800 dark:hover:to-purple-900 transition-all duration-300 shadow-md"
              disabled={isLoading || email.length === 0 || otp.length < 6}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginByEmail;
