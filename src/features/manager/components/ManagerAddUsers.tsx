import { useFormik } from "formik";
import { UserPlus } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/redux/store/appStore";

import { managerAddUser } from "../api/manager.api";

export function ManagerAddUsers() {
  const manager = useSelector((state: RootState) => state.manager);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    name: Yup.string().required("Name is required"),
    role: Yup.string().required("Role is required"),
  });

  const handleFormSubmit = async (values: {
    email: string;
    name: string;
    role: string;
  }) => {
    try {
      const response = await managerAddUser({
        ...values,
        managerId: "" + manager.id,
      });

      if (response.success) {
        enqueueSnackbar(response.message, { variant: "success" });
        formik.resetForm();
      } else {
        enqueueSnackbar(response.message || "Something went wrong", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Failed to create user", { variant: "error" });
      console.error("Error creating user:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      role: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-sm border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-slate-500 dark:text-slate-400" />
          <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            Add New User
          </CardTitle>
        </div>
        <CardDescription className="text-slate-500 dark:text-slate-400">
          Create a new user account that will have access to your system.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  User Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  placeholder="John Doe"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-sm text-red-500 dark:text-red-400">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="john@example.com"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-sm text-red-500 dark:text-red-400">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="role"
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Role
              </Label>
              <Select
                name="role"
                value={formik.values.role}
                onValueChange={(value) => {
                  formik.setFieldValue("role", value);
                }}
                onOpenChange={() => {
                  formik.setFieldTouched("role", true);
                }}
              >
                <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="tester">Tester</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                </SelectContent>
              </Select>
              {formik.touched.role && formik.errors.role ? (
                <div className="text-sm text-red-500 dark:text-red-400">
                  {formik.errors.role}
                </div>
              ) : null}
            </div>

            <div className="text-sm text-slate-500 dark:text-slate-400">
              <p>A temporary password will be sent to this email address.</p>
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            onClick={() => formik.resetForm()}
            type="button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => formik.handleSubmit()}
            className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? "Adding..." : "Add User"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
