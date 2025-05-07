import * as Yup from "yup";

export const addUservalidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  name: Yup.string().required("Name is required"),
  role: Yup.string().required("Role is required"),
});

export const addTaskvalidationSchema = Yup.object({
  name: Yup.string().required("Task name is required"),
  description: Yup.string(),
  status: Yup.string().required("Status is required"),
  priority: Yup.string().required("Priority is required"),
  dueDate: Yup.string().nullable(),
  archived: Yup.boolean(),
  assignees: Yup.array().of(Yup.string()),
  tags: Yup.array().of(Yup.string()),
});
