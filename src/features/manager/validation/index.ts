import * as Yup from "yup";

export const addUservalidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  name: Yup.string().required("Name is required"),
  role: Yup.string().required("Role is required"),
});
