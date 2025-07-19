import * as Yup from "yup";

export const addSubscriptionValidationSchema = Yup.object({
  name: Yup.string().required("Plan name is required"),
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
  numberOfSpaces: Yup.number()
    .typeError("Spaces must be a number")
    .min(1, "At least 1 space required")
    .required("Number of spaces is required"),
  numberOfManagers: Yup.number()
    .typeError("Managers must be a number")
    .min(1, "At least 1 manager required")
    .required("Number of managers is required"),
  numberOfUsers: Yup.number()
    .typeError("Users must be a number")
    .min(1, "At least 1 user required")
    .required("Number of users is required"),
});
