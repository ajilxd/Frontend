import { useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOwnerCompanyQuery } from "@/queries/owners/company/useOwnerCompanyQuery";
import { RootState } from "@/redux/store/appStore";

import { ownerEditCompanyDetails } from "../api/owner.api";
import companyDetailsSchema from "../validation/owner.validation";

export const EditCompanyDetailsModal = () => {
  const owner = useSelector((state: RootState) => state.owner);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { data: Company } = useOwnerCompanyQuery("" + owner._id);
  const handleSubmit = async (
    values: typeof Company,
    { setSubmitting }: { setSubmitting: (data: boolean) => void }
  ) => {
    const response = await ownerEditCompanyDetails({
      ...values,
      ownerId: "" + owner._id,
    });

    if (response.success) {
      queryClient.invalidateQueries({
        queryKey: ["owner", "company", "" + owner._id],
      });
      enqueueSnackbar("Successfully edited company details");
      setOpen(false);
    } else {
      enqueueSnackbar("Something went wrong. Try again.", { variant: "error" });
    }
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Company Details</DialogTitle>
          <DialogDescription>
            Update the company info below. Don't forget to hit save!
          </DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={Company!}
          validationSchema={companyDetailsSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="companyName" className="text-right">
                  Name
                </Label>
                <div className="col-span-3">
                  <Field as={Input} id="companyName" name="companyName" />
                  <ErrorMessage
                    name="companyName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="websiteURL" className="text-right">
                  Website
                </Label>
                <div className="col-span-3">
                  <Field as={Input} id="websiteURL" name="websiteURL" />
                  <ErrorMessage
                    name="websiteURL"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <div className="col-span-3">
                  <Field as={Input} id="description" name="description" />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <DialogFooter className="pt-2">
                <Button type="submit" disabled={isSubmitting}>
                  Save changes
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
