import { useFormik } from "formik";
import { UserPlus } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { useContext, useState } from "react";
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
import { OwnerContext } from "@/context/OwnerContext";
import { RootState } from "@/redux/store/appStore";

import { ownerCreateManager } from "../api/owner.api";

export function OwnerAddManagers() {
  const [loading, setLoading] = useState(false);
  const owner = useSelector((state: RootState) => state.owner);
  const { company } = useContext(OwnerContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    name: Yup.string().required("Name is required"),
  });

  const handleFormSubmit = async (values: { email: string; name: string }) => {
    try {
      console.log("company", !company, company);
      if (!company || !company.id) {
        enqueueSnackbar("Add company details before Adding Managers");
        console.warn("Add company details before adding users");
        return;
      }
      console.log("you lost");
      setLoading(true);
      const response = await ownerCreateManager({
        ...values,
        ownerId: "" + owner._id,
        companyId: company.id!,
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
      enqueueSnackbar("Failed to create manager", { variant: "error" });
      console.error("Error creating manager:", error);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
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
            Add New Manager
          </CardTitle>
        </div>
        <CardDescription className="text-slate-500 dark:text-slate-400">
          Create a new manager account that will have access to your property
          management system.
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
                  Manager Name
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
                  placeholder="manager@example.com"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-sm text-red-500 dark:text-red-400">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
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
            disabled={loading || !formik.isValid}
          >
            {loading ? "Adding..." : "Add Manager"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
