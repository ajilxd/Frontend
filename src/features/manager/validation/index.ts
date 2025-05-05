import * as Yup from "yup";

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

export const editSpaceValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  visibility: Yup.string()
    .oneOf(["public", "private"])
    .required("Visibility is required"),
  status: Yup.string()
    .oneOf(["active", "inactive"])
    .required("Status is required"),
});
