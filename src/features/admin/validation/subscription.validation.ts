import * as Yup from "yup";

export const addSubscriptionValidationSchema = Yup.object({
  name: Yup.string()
    .required("Plan name is required")
    .max(20, "Plan name must be 20 characters or less"),
  amount: Yup.number()
    .positive("Amount must be positive")
    .required("Amount is required"),
  billingCycle: Yup.string().required("Billing cycle is required"),
  isActive: Yup.boolean().required("Status is required"),
  features: Yup.array().of(Yup.string()).min(1, "Select at least one feature"),
  description: Yup.string()
    .required("description is required")
    .max(500, "Description must be 500 characters or less"),
});
