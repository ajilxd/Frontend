import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Field } from "formik";
import { useField, Formik, Form } from "formik";
import { enqueueSnackbar } from "notistack";
import * as React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { AddTaskType } from "@/types";

import { managerAddTask } from "../api/manager.api";
import { TasksTagsOption } from "../constants";
import { addTaskvalidationSchema } from "../validation";
import { useQueryClient } from "@tanstack/react-query";

const MyInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      <Input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyTextarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      <Textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, name, options }) => {
  const [field, , helpers] = useField(name);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      <Select
        value={field.value || ""}
        onValueChange={(val) => helpers.setValue(val)}
      >
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt: { value: string; label: string }) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const MyCheckbox = ({
  name,
  label,
  description,
}: {
  name: string;
  label: string;
  description: string;
}) => {
  const [field, , helpers] = useField({ name, type: "checkbox" });

  return (
    <div className="flex items-start gap-3 border p-4 rounded-md">
      <Checkbox
        checked={field.value}
        onCheckedChange={(val) => helpers.setValue(val)}
      />
      <div className="space-y-1">
        <p className="font-medium">{label}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};

export const ManagerCreateTasks: React.FC = () => {
  const queryClient = useQueryClient();
  const manager = useSelector((state: RootState) => state.manager);
  const [tags, setTags] = React.useState<string[]>([]);
  const { spaceid } = useParams();
  const { data: spaces } = useManagerSpacesQuery(manager.id);
  const { data: users } = useManagerUsersQuery(manager.id);

  const space = spaces?.find((item) => item._id === spaceid);

  if (!space) {
    console.warn("Failed to resolve the space");
    throw new Error("Something went wrong");
  }

  const handleTagsChange = (selected: OptionType[] | null) => {
    if (selected) {
      const values = selected.map((option) => option.value);
      setTags(values);
      console.log("Selected tags:", values);
    } else {
      console.log("No tags selected");
    }
  };

  const handleSubmit = async (data: Partial<AddTaskType>) => {
    const assignee = users
      ?.filter(
        (member) => data.assignees && data.assignees.includes(member._id)
      )
      .map((member) => ({
        id: member._id,
        name: member.name,
        email: member.email,
        avatarUrl: member.image,
      }));

    const result = {
      ...data,
      spaceId: spaceid,
      spaceName: space?.name,
      creatorId: manager.id,
      creatorName: manager.profile.name ?? "",
      assignee,
      tags,
    };

    const response = await managerAddTask(result);

    if (response.success) {
      enqueueSnackbar("Task added successfully", { variant: "success" });
      queryClient.invalidateQueries({
        queryKey: ["manager", "tasks", spaceid],
      });
      queryClient.invalidateQueries({
        queryKey: ["manager", "tasks", manager.id],
      });
    } else {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        status: "",
        priority: "",
        assignees: [],
        dueDate: "",
        tags: "",
        archived: false,
      }}
      validationSchema={addTaskvalidationSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
        setTags([]);
      }}
    >
      {() => (
        <Form className="space-y-6">
          <MyInput
            name="name"
            label="Task Name"
            placeholder="Enter task name"
          />
          <MyTextarea
            name="description"
            label="Description"
            placeholder="What needs to be done?"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MySelect
              name="status"
              label="Status"
              options={[
                { label: "To Do", value: "todo" },
                { label: "In Progress", value: "in_progress" },
                { label: "Review", value: "review" },
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
            <Label>Select all tags that match </Label>
            <AnimatedSelect
              options={TasksTagsOption}
              handleChangeFunction={handleTagsChange}
            />
          </div>

          <MyInput name="dueDate" label="Due Date" type="date" />

          <div className="space-y-2">
            <label className="text-sm font-medium block">
              Assign to Members
            </label>
            <div className="space-y-3 pl-2">
              {space.team?.members?.map((user) => (
                <div
                  key={user.userId}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <Field
                    type="checkbox"
                    name="assignees"
                    value={String(user.userId)}
                    className="form-checkbox"
                  />
                  <Avatar className="w-8 h-8 rounded-full border">
                    <AvatarImage
                      src={user.image || ""}
                      alt={user.memberName}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <AvatarFallback className="flex items-center justify-center text-xs font-semibold bg-muted text-muted-foreground w-full h-full rounded-full">
                      {user.memberName
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{user.memberName}</span>
                </div>
              ))}
            </div>
          </div>

          <MyCheckbox
            name="archived"
            label="Archive this task"
            description="Archived tasks won’t appear in the active list"
          />

          <Button type="submit" className="w-full">
            Create Task
          </Button>
        </Form>
      )}
    </Formik>
  );
};
