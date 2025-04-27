import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { ownerOtpVerificationService } from "../../api/owner.api";
import OtpTimer from "../OtpTimer";

type OtpModalProps = {
  email: string;
  visibility: boolean;
  onClose: () => void;
};

export default function OtpModal({
  email,
  visibility,
  onClose,
}: OtpModalProps) {
  const navigate = useNavigate();
  const [passkey, setPasskey] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const otp = passkey
      .split("")
      .map((i) => Number(i))
      .join("");

    const response = await ownerOtpVerificationService(email, otp);

    if (response.success) {
      setOtpVerified(true);
      setTimeout(() => {
        onClose();
        navigate("/owner/signin");
      }, 3000);
    } else {
      setOtpError(response.message);
      setTimeout(() => {
        setOtpError("");
      }, 2500);
    }
  };

  if (!visibility) return null;

  return (
    <Dialog open={visibility} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter your OTP</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit}>
              <div className="m-4 flex justify-center">
                <InputOTP maxLength={6} onChange={(value) => setPasskey(value)}>
                  <InputOTPGroup className="shad-otp">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot
                        className="shad-otp-slot"
                        index={index}
                        key={index}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="flex justify-center">
                <OtpTimer email={email} />
              </div>

              <div className="mt-4 flex justify-center">
                <Button
                  type="submit"
                  variant="secondary"
                  className="bg-[#4F46E5] text-white font-medium rounded-md py-3 px-6 shadow-md hover:bg-[#6c5ce7]"
                >
                  Submit OTP
                </Button>
              </div>

              {otpVerified && (
                <p className="mt-2 text-center text-green-500">OTP Verified</p>
              )}

              {otpError && (
                <p className="mt-1 text-center text-red-500">{otpError}</p>
              )}
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
