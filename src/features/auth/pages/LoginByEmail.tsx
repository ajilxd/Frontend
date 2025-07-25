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
import { useSocket } from "@/hooks/useSocket";
import { managerLoginSuccess } from "@/redux/slices/managerSlice";
import { userLoginSuccess } from "@/redux/slices/userSlice";

import { authlogin, authSendOtp } from "../api/auth.api";
import { useNotification } from "@/shared/hooks/useNotification";

const LoginByEmail: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [role, setRole] = useState<"user" | "manager" | "">("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasClickedSendOTP, setHasClickedSendOTP] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { connectSocket } = useSocket();
  const  {connectNotificationSocket}=useNotification()

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
        console.log("managerData after login",managerData)

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
                image: managerData.image,
                ownerId: managerData.ownerId,
                ownerName: managerData.ownerName,
                ownerIsSubscribed: managerData.ownerSubscription.name
                  ? true
                  : false,
                ownerSubscribedPlan: managerData.ownerSubscription.name,
                companyName: managerData.companyName ?? "",
                companyId: managerData.companyId ?? "",
              },
            })
          );
          localStorage.setItem("activeRole", "manager");
          localStorage.setItem("managerAccessToken", managerAccessToken);
          connectSocket({
            userId: managerData.id,
            senderImageUrl: managerData.image,
            senderName: managerData.name,
          });
          connectNotificationSocket({consumerId:managerData.id,consumerImageUrl:managerData.image,consumerName:managerData.name,consumerRole:"manager",companyId:managerData.companyId,consumerLastActive:""+new Date(),consumerSpaces:managerData.spaces,companyName:managerData.companyName})
          setTimeout(() => navigate("/manager/dashboard"), 1500);
        }
      } else if (role === "user") {
        const userAccessToken = response.data.accessToken;
        const userData = response.data.data;
        console.log("user data found",userData)
        if (!userAccessToken) {
          return console.warn("No accesstoken found,Try login again");
        }
        if (!userData) {
          return console.warn("NO user data found");
        }

        if (response.success) {
          dispatch(
            userLoginSuccess({
              accessToken: userAccessToken,
              data: {
                id: userData.id,
                name: userData.name,
                image: userData.image,
                email: userData.email,
                managerImage: userData.managerImage,
                managerName: userData.managerName,
                ownerId: userData.ownerId,
                ownerIsSubscribed: userData.ownerSubscription.name
                  ? true
                  : false,
                ownerSubscribedPlan: userData.ownerSubscription.name,
                companyId:userData.companyId??"",
                companyName:userData.companyName??"",
                ownerName: userData.ownerName,
              },
            })
          );
          localStorage.setItem("activeRole", "user");
          localStorage.setItem("userAccessToken", userAccessToken);
          connectSocket({
            userId: userData.id,
            senderName: userData.name,
            senderImageUrl: userData.image,
          });
          connectNotificationSocket({consumerId:userData.id,consumerImageUrl:userData.image,consumerName:userData.name,consumerRole:"user",companyId:userData.companyId,consumerLastActive:""+new Date(),consumerSpaces:userData.spaces,companyName:userData.companyName})
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
