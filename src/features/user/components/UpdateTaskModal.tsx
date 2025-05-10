import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/redux/store/appStore";
import { TaskType } from "@/types";

import { userUpdateTaskStatus } from "../api/user.api";

export function UpdateTaskModal({
  closeHandler,
  open,
  task,
}: {
  closeHandler: () => void;
  open: boolean;
  task: TaskType;
}) {
  const { spaceid } = useParams();
  const user = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(task?.status);
  if (!task) return;

  const handleSubmit = async (task: TaskType) => {
    const response = await userUpdateTaskStatus(task._id, "status", { status });
    if (response.success) {
      enqueueSnackbar("Task updated successfully", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["user", "tasks", spaceid] });
      queryClient.invalidateQueries({ queryKey: ["user", "tasks", user.id] });
    } else {
      enqueueSnackbar("something went wrong", { variant: "error" });
      console.warn(response.message && response?.message);
    }
  };

  const MySelect = ({ label, options }) => {
    return (
      <div>
        <label className="block text-sm font-medium p-2">{label}</label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={closeHandler}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update status</DialogTitle>
        </DialogHeader>
        <div className="p-3">
          <div className="p-2">
            <MySelect
              label="Status"
              options={[
                { label: "To Do", value: "todo" },
                { label: "In Progress", value: "in_progress" },
                { label: "Review", value: "review" },
                { label: "Done", value: "done" },
                { label: "Cancelled", value: "cancelled" },
              ]}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => handleSubmit(task)}>Update changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
