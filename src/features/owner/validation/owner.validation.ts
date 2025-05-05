import * as Yup from "yup";
export const OwnerSignupValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});
export const OwnerSigninValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export const ForgetPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const ResetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const companyDetailsSchema = Yup.object({
  companyName: Yup.string().required("Company name is required"),

  websiteURL: Yup.string().url("Must be a valid URL"),

  description: Yup.string()
    .max(1000, "Description can be at most 1000 characters")
    .required("Descripiton is required"),
  industries: Yup.array().of(Yup.string().trim()),
});

export default companyDetailsSchema;

const SpaceVisibility = ["public", "private", "protected"];
const SpaceStatus = ["active", "inactive", "archived"];

export const SpacevalidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  visibility: Yup.string()
    .oneOf(SpaceVisibility, "Invalid visibility option")
    .required("Visibility is required"),
  status: Yup.string()
    .oneOf(SpaceStatus, "Invalid status option")
    .required("Status is required"),
});

export const editSpaceValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string(),
  visibility: Yup.string().required("Visibility is required"),
  status: Yup.string().required("Status is required"),
  managers: Yup.array()
    .of(Yup.string())
    .min(1, "At least one manager required"),
});
