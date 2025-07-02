import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { ManagerType } from "@/types";
import { enqueueSnackbar } from "notistack";
import { ownerUpdateManagerDetails } from "../api/owner.api";

export const EditManagerModal = function ({
  canShow,
  managerData,
  onClose,
}: {
  canShow: boolean;
  managerData: Partial<ManagerType> | null;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (managerData) {
      setName(managerData.name || "");
      setEmail(managerData.email || "");
    }
  }, [managerData]);

  const handleSubmit = async () => {
    if (!name) {
      enqueueSnackbar("Name cant be empty", { variant: "warning" });
      return;
    }
    if (!email) {
      enqueueSnackbar("email cant be empty", { variant: "warning" });
      return;
    }
    console.log("Saving:", { name, email });
    const res = await ownerUpdateManagerDetails({ name, email });
    if (res.success) {
      enqueueSnackbar("Manager updation went succesfull", {
        variant: "success",
      });
      onClose();
    } else {
      enqueueSnackbar("something went wrong, Try later", { variant: "error" });
      console.warn(res.message);
    }
  };

  return (
    <Dialog open={canShow} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Manager Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
