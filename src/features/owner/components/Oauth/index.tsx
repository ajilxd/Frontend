import axios from "axios";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { baseUrl } from "@/constants/app";
import { ownerLoginSuccess } from "@/redux/slices/ownerSlice";

import app from "../../../../firebase-config";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleGoogleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;
      const res = await axios.post(
        `${baseUrl}/owner/google`,
        {
          name: displayName,
          email: email,
        },
        { withCredentials: true }
      );
      console.log("response from server", res.data);
      const { accessToken } = res.data;
      if (!accessToken) {
        throw new Error("No access token found on response");
      }
      localStorage.setItem("activeRole", "owner");
      localStorage.setItem("ownerAccessToken", accessToken);
      dispatch(ownerLoginSuccess(res.data.data));
      navigate("/owner/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && "status" in error) {
        if (error.status === 403) {
          enqueueSnackbar("Account is blocked", { variant: "error" });
        }
      }
      console.error("couldn't connect with Google");
    }
  }

  return (
    <button
      onClick={handleGoogleClick}
      className="w-full bg-white text-gray-800 p-3 rounded-lg flex items-center justify-center hover:bg-gray-100 transition duration-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
    >
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="currentColor"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="currentColor"
        />
        <path
          d="M5.84 14.09c-.22-.66-.34-1.36-.34-2.09s.12-1.43.34-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          fill="currentColor"
        />
      </svg>
      Sign in with Google
    </button>
  );
}

export default OAuth;
