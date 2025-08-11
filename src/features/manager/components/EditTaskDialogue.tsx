import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, useField } from "formik";
import { enqueueSnackbar } from "notistack";
import * as React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useManagerSpacesQuery } from "@/queries/managers/spaces/useManagerSpacesQuery";
import { useManagerUsersQuery } from "@/queries/managers/users/useManagerUsersQuery";
import { RootState } from "@/redux/store/appStore";
import { AnimatedSelect, OptionType } from "@/shared/components/AnimatedSelect";
import { AddTaskType, TaskType } from "@/types";

import { managerUpdateTask } from "../api/manager.api";
import { TasksTagsOption } from "../constants";
import { addTaskvalidationSchema } from "../validation";

export const EditTaskDialog = ({
  task,
  canShow,
  closeHandler,
}: {
  task: TaskType;
  canShow: boolean;
  closeHandler: () => void;
}) => {
  React.useEffect(() => {
    setOpen(canShow);
  }, [canShow]);
  const queryClient = useQueryClient();
  const manager = useSelector((state: RootState) => state.manager);
  const { spaceid } = useParams();
  const { data: users } = useManagerUsersQuery(manager.id);
  const { data: spaces } = useManagerSpacesQuery(manager.id);
  const space = spaces?.find((item) => item._id === spaceid);

  const [tags, setTags] = React.useState<string[]>([""]);
  const [open, setOpen] = React.useState<boolean>(canShow);

  const handleTagsChange = (selected: OptionType[] | null) => {
    console.log("tags", tags);
    const values = selected?.map((opt) => opt.value) || [];
    setTags(values);
  };
  if (!task) return null;

  const handleSubmit = async (data: Partial<AddTaskType>) => {
    const assignee = users
      ?.filter((member) => data.assignees?.includes(member._id))
      .map((member) => ({
        id: member._id,
        name: member.name,
        email: member.email,
        avatarUrl: member.image,
      }));

    const payload = {
      ...task,
      ...data,
      assignee,
      tags,
    };

    const response = await managerUpdateTask(task._id, payload);
    if (response.success) {
      enqueueSnackbar("Task updated successfully", { variant: "success" });
      queryClient.invalidateQueries({
        queryKey: ["manager", "tasks", task._id],
      });
      queryClient.invalidateQueries({
        queryKey: ["manager", "tasks", spaceid],
      });
      queryClient.invalidateQueries({
        queryKey: ["manager", "tasks", manager.id],
      });
      closeHandler();
    } else {
      enqueueSnackbar("Update failed", { variant: "error" });
    }
  };

  const MyInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium">{label}</label>
        <Input {...field} {...props} />
        {meta.touched && meta.error && (
          <div className="text-red-500 text-sm">{meta.error}</div>
        )}
      </div>
    );
  };

  const MyTextarea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium">{label}</label>
        <Textarea {...field} {...props} />
        {meta.touched && meta.error && (
          <div className="text-red-500 text-sm">{meta.error}</div>
        )}
      </div>
    );
  };

  const MySelect = ({ label, name, options }) => {
    const [field, , helpers] = useField(name);
    return (
      <div>
        <label className="block text-sm font-medium">{label}</label>
        <Select value={field.value || ""} onValueChange={helpers.setValue}>
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            name: task.name || "",
            description: task.description || "",
            status: task.status || "",
            priority: task.priority || "",
            assignees: task.assignee?.map((a) => a?.id) || [],
            dueDate: task.dueDate?.split("T")[0] || "",
            tags: task.tags || [],
            archived: task.archived || false,
          }}
          validationSchema={addTaskvalidationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6">
              <MyInput name="name" label="Task Name" />
              <MyTextarea name="description" label="Description" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MySelect
                  name="status"
                  label="Status"
                  options={[
                    { label: "To Do", value: "todo" },
                    { label: "In Progress", value: "in_progress" },
                    { label: "Done", value: "done" },
                    { label: "Cancelled", value: "cancelled" },
                  ]}
                />
                <MySelect
                  name="priority"
                  label="Priority"
                  options={[
                    { label: "Low", value: "low" },
                    { label: "Medium", value: "medium" },
                    { label: "High", value: "high" },
                  ]}
                />
              </div>

              <Label>Select tags</Label>
              <AnimatedSelect
                defaultValues={
                  task.tags &&
                  task.tags.map((tag) => ({ label: tag, value: tag }))
                }
                options={TasksTagsOption}
                handleChangeFunction={handleTagsChange}
              />

              <MyInput name="dueDate" label="Due Date" type="date" />

              <div className="space-y-2">
                <Label>Assign to Members</Label>
                <div className="space-y-3 pl-2 flex">
                  {space?.team?.members.map((user) => (
                    <div
                      key={user.userId}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-muted"
                    >
                      <Field
                        type="checkbox"
                        name="assignees"
                        value={String(user.userId)}
                      />
                      <Avatar className="w-8 h-8 rounded-full border">
                        <AvatarImage
                          src={user.image || ""}
                          alt={user.memberName}
                        />
                        <AvatarFallback>
                          {user.memberName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{user.memberName}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
