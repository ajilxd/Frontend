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
