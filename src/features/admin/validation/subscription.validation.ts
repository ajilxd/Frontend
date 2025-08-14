import * as Yup from "yup";

export const addSubscriptionValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[^\s]+$/, "No spaces are allowed")
    .required("Plan name is required"),
  description: Yup.string().required("Description is required"),
  monthlyAmount: Yup.number().when("billingCycleType", {
    is: (val: string) => val === "month" || val === "both",
    then: (schema) =>
      schema
        .typeError("Monthly amount must be a number")
        .required("Monthly amount is required")
        .moreThan(0, "Must be greater than 0"),
  }),
  yearlyAmount: Yup.number().when("billingCycleType", {
    is: "year",
    then: (schema) =>
      schema
        .typeError("Yearly amount must be a number")
        .required("Yearly amount is required")
        .moreThan(0, "Must be greater than 0"),
  }),
  spaceCount: Yup.number()
    .typeError("Spaces must be a number")
    .min(1, "At least 1 space required")
    .max(10, "You can only add upto 10 spaces")
    .required("Number of spaces is required"),
  managerCount: Yup.number()
    .typeError("Managers must be a number")
    .min(1, "At least 1 manager required")
    .max(10, "you can only add 10 managers")
    .required("Number of managers is required"),
  userCount: Yup.number()
    .typeError("Users must be a number")
    .min(1, "At least 1 user required")
    .max(50, "you can only add 50 users")
    .required("Number of users is required"),
});
