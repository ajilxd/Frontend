import axios from "axios";
import { useState, useEffect } from "react";

import { baseUrl } from "@/constants/app";

const OtpTimer = ({ email }: { email: string }) => {
  const [seconds, setSeconds] = useState(60);
  const resendOtphandler = async () => {
    setSeconds(60);
    await axios.post(`${baseUrl}/owner/resend-otp/`, { email });
  };

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds]);

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const displaySeconds = sec % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      displaySeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div>
      {seconds === 0 ? (
        <button onClick={resendOtphandler}>Resend OTP</button>
      ) : seconds > 0 ? (
        <p className="text-sm"> {formatTime(seconds)}</p>
      ) : (
        "00:00"
      )}
    </div>
  );
};

export default OtpTimer;
