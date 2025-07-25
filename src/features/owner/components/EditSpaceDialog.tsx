import { Formik, Form } from "formik";
import { enqueueSnackbar } from "notistack";
import { FC } from "react";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useManagersQuery } from "@/queries/owners/managers/useManagersQuery";
import { useOwnerSpaceBySpaceIdQuery } from "@/queries/owners/spaces/useOwnerSpaceBySpaceIdQuery";
import { RootState } from "@/redux/store/appStore";

import { ownerUpdateSpace } from "../api/owner.api";
import { editSpaceValidationSchema } from "../validation/owner.validation";
import { useQueryClient } from "@tanstack/react-query";

type EditSpaceDialogProps = {
  ownerId: string;
  canOpen: boolean;
  spaceId: string;
  closeHandler: () => void;
};

export const EditSpaceDialog: FC<EditSpaceDialogProps> = ({
  canOpen,
  spaceId,
  closeHandler,
  ownerId,
}) => {
  const owner = useSelector((state: RootState) => state.owner);
  const queryClient = useQueryClient();
  const {
    data: managers,
    isError: hasLoadingManagerError,
    error: loadingManagerError,
  } = useManagersQuery(ownerId);
  const {
    data: space,
    isError: isSpaceError,
    error: spaceError,
  } = useOwnerSpaceBySpaceIdQuery(spaceId);

  const ManagerIds = space?.managers?.map((item) => item.managerId);

  const initialValues = {
    name: space?.name ?? "",
    description: space?.description ?? "",
    visibility: space?.visibility ?? "public",
    status: space?.status ?? "active",
    managers: ManagerIds ?? [],
  };

  return (
    <Dialog open={canOpen} onOpenChange={closeHandler}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Space</DialogTitle>
        </DialogHeader>
        {isSpaceError && <p className="text-red-500">{spaceError?.message}</p>}
        {!isSpaceError && space && (
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={editSpaceValidationSchema}
            onSubmit={async (values) => {
              const validManagers = values.managers.map((id) => ({
                managerId: id,
              }));
              const response = await ownerUpdateSpace(
                String(owner._id),
                spaceId,
                {
                  ...values,
                  managers: validManagers,
                }
              );

              if (response.success) {
                enqueueSnackbar("Space updated successfully", {
                  variant: "success",
                });
                queryClient.invalidateQueries({
                  queryKey: ["owner", "spaces", ownerId],
                });
                queryClient.invalidateQueries({
                  queryKey: ["owner", "spaces", spaceId],
                });
              } else {
                enqueueSnackbar("Something went wrong, try again", {
                  variant: "error",
                });
                console.warn(response.message);
              }

              closeHandler();
            }}
          >
            {({
              values,
              handleChange,
              setFieldValue,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                  {touched.name && errors.name && (
                    <p className="col-start-2 col-span-3 text-sm text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="visibility" className="text-right">
                    Visibility
                  </Label>
                  <Select
                    value={values.visibility}
                    onValueChange={(val) => setFieldValue("visibility", val)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select
                    value={values.status}
                    onValueChange={(val) => setFieldValue("status", val)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Manager</Label>
                  {hasLoadingManagerError ? (
                    <div className="col-span-3 text-sm text-red-500">
                      {loadingManagerError.message}
                    </div>
                  ) : (
                    <Select
                      onValueChange={(managerId) => {
                        if (!values.managers.includes(managerId)) {
                          setFieldValue("managers", [
                            ...values.managers,
                            managerId,
                          ]);
                        }
                      }}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a manager" />
                      </SelectTrigger>
                      <SelectContent>
                        {managers?.map((manager) => (
                          <SelectItem
                            key={manager._id}
                            value={manager._id}
                            disabled={values.managers.includes(manager._id)}
                          >
                            {manager.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {touched.managers && errors.managers && (
                    <p className="col-start-2 col-span-3 text-sm text-red-500">
                      {errors.managers}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <div></div>
                  <div className="col-span-3 flex flex-wrap gap-2">
                    {values.managers.map((id) => {
                      const manager = managers?.find((m) => m._id === id);
                      if (!manager) return null;
                      return (
                        <div
                          key={manager._id}
                          className="bg-gray-100 rounded-md px-2 py-1 flex items-center"
                        >
                          <span className="dark:text-slate-900">
                            {manager.name}
                          </span>
                          <button
                            type="button"
                            className="ml-2 text-gray-500 hover:text-red-500"
                            onClick={() =>
                              setFieldValue(
                                "managers",
                                values.managers.filter(
                                  (mId) => mId != manager._id
                                )
                              )
                            }
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <DialogFooter className="mt-4">
                  <Button type="submit" disabled={isSubmitting}>
                    Save Changes
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        )}
      </DialogContent>
    </Dialog>
  );
};
