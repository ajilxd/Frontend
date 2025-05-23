// components/SignOutButton.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { adminLogOutService } from "@/features/admin/api/admin.api";
import { managerLogout } from "@/features/manager/api/manager.api";
import { ownerLogoutService } from "@/features/owner/api/owner.api";
import { userLogout } from "@/features/user/api/user.api";
import { useSocket } from "@/hooks/useSocket";
import { adminLogOutSuccess } from "@/redux/slices/adminSlice";
import { managerLogOutSuccess } from "@/redux/slices/managerSlice";
import { ownerLogOutSuccess } from "@/redux/slices/ownerSlice";
import { userLogOutSuccess } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store/appStore";

type SignoutModalProps = {
  user: string;
};

export const SignOutModal: React.FC<SignoutModalProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const { disconnectSocket } = useSocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const managerId = useSelector((state: RootState) => state.manager.id);
  const userId = useSelector((state: RootState) => state.user.id);

  const handleSignOut = async () => {
    console.log("logging out", user);
    if (user === "owner") {
      const res = await ownerLogoutService();
      if (res.success) {
        localStorage.removeItem("ownerAccessToken");
        dispatch(ownerLogOutSuccess());
        navigate("/owner/signin");
      } else {
        console.error(res.message);
      }
    } else if (user === "admin") {
      const res = await adminLogOutService();
      if (res.success) {
        localStorage.removeItem("adminAccessToken");
        dispatch(adminLogOutSuccess());
        navigate("/admin/signin");
      } else {
        console.error(res.message);
      }
    } else if (user === "manager") {
      console.log("im manager from the signout model");
      const res = await managerLogout();
      if (res.success) {
        localStorage.removeItem("managerAccessToken");
        dispatch(managerLogOutSuccess());
        disconnectSocket({ userId: managerId });
        navigate("/auth/login-email");
      } else {
        console.error(res.message);
      }
    } else if (user === "user") {
      const res = await userLogout();
      if (res.success) {
        localStorage.removeItem("userAccessToken");
        dispatch(userLogOutSuccess());
        disconnectSocket({ userId: userId });
        navigate("/auth/login-email");
      } else {
        console.error(res.message);
      }
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setOpen(true)}
        className="m-4"
      >
        Sign Out
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Sign Out</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to sign out?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleSignOut}>
              Yes, Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
