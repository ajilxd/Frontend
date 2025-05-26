import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { X } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { OwnerContext } from "@/context/OwnerContext";
import { useManagersQuery } from "@/queries/owners/managers/useManagersQuery";
import { RootState } from "@/redux/store/appStore";

import { ownerAddSpace } from "../api/owner.api";
import { SpaceVisibility, SpaceStatus } from "../constants";
import { SpaceVisibilityType, SpaceStatusType } from "../types";
import { SpacevalidationSchema } from "../validation/owner.validation";

interface SpaceFormValues {
  name: string;
  description: string;
  visibility: SpaceVisibilityType;
  status: SpaceStatusType;
  managers: string[];
}

type Prop = {
  ownerId: string;
};

const initialValues: SpaceFormValues = {
  name: "",
  description: "",
  visibility: SpaceVisibility[0],
  status: SpaceStatus[0],
  managers: [],
};

export const AddSpaceForm: React.FC<Prop> = ({ ownerId }) => {
  const queryClient = useQueryClient();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const owner = useSelector((state: RootState) => state.owner);

  const { company } = useContext(OwnerContext);
  const { data: managers } = useManagersQuery(ownerId);

  // if (isError) {
  //   if (axios.isAxiosError(error)) {
  //     setLoadingManagerError(error?.response?.data?.message);
  //   } else {
  //     setLoadingManagerError(error.message);
  //   }
  // }

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (
    values: SpaceFormValues,
    { setSubmitting, resetForm }: FormikHelpers<SpaceFormValues>
  ) => {
    if (!company || !owner) {
      return console.error(
        "Couldnt fetch company details for the owner,Try login again or refresh"
      );
    }
    const formData = {
      ...values,
      tags,
      createdBy: owner._id,
      owner: owner._id,
      companyId: company.id,
      companyName: company.companyName,
      managers: values.managers,
      team: { members: [] },
    };
    const res = await ownerAddSpace("" + owner._id, formData);
    if (res.success) {
      queryClient.invalidateQueries({
        queryKey: ["owner", "spaces", "" + owner._id],
      });
      enqueueSnackbar("Space added succesfully", { variant: "success" });
    } else {
      console.error(res.message);
      enqueueSnackbar("Something went wrong,try again", { variant: "error" });
    }

    setTimeout(() => {
      console.log("Form data submitted:", formData);
      resetForm();
      setTags([]);
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-950 p-4 transition-colors">
      <Card className="w-full max-w-2xl bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-lg transition-colors">
        <CardHeader className="border-b border-gray-200 dark:border-gray-800 pb-6">
          <CardTitle className="text-xl font-bold">Add New Space</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Create a collaborative workspace for your team
          </CardDescription>
        </CardHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={SpacevalidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, setFieldValue, values }) => (
            <Form>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className={
                      errors.name && touched.name
                        ? "text-red-500 dark:text-red-400"
                        : ""
                    }
                  >
                    Space Name
                  </Label>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    placeholder="Enter space name"
                    className={`bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-blue-600 dark:focus:border-blue-600 text-black dark:text-white transition-colors ${
                      errors.name && touched.name
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-sm text-red-500 dark:text-red-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className={
                      errors.description && touched.description
                        ? "text-red-500 dark:text-red-400"
                        : ""
                    }
                  >
                    Description
                  </Label>
                  <Field
                    as={Textarea}
                    id="description"
                    name="description"
                    placeholder="Describe the purpose of this space"
                    className={`bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-blue-600 dark:focus:border-blue-600 text-black dark:text-white min-h-24 transition-colors ${
                      errors.description && touched.description
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-sm text-red-500 dark:text-red-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibility</Label>
                  <Field name="visibility">
                    {({ field }: { field: { value: string } }) => (
                      <Select
                        defaultValue={field.value}
                        onValueChange={(value) =>
                          setFieldValue("visibility", value)
                        }
                      >
                        <SelectTrigger className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-black dark:text-white focus:border-blue-600 dark:focus:border-blue-600 transition-colors">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          {SpaceVisibility.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option.charAt(0) + option.slice(1).toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage
                    name="visibility"
                    component="div"
                    className="text-sm text-red-500 dark:text-red-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Field name="status">
                    {({ field }: { field: { value: string } }) => (
                      <Select
                        defaultValue={field.value}
                        onValueChange={(value) =>
                          setFieldValue("status", value)
                        }
                      >
                        <SelectTrigger className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-black dark:text-white focus:border-blue-600 dark:focus:border-blue-600 transition-colors">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {SpaceStatus.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option.charAt(0) + option.slice(1).toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-sm text-red-500 dark:text-red-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInput}
                    placeholder="Add tags (press Enter to add)"
                    className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-blue-600 dark:focus:border-blue-600 text-black dark:text-white transition-colors"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 flex items-center gap-1"
                      >
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-blue-600 dark:hover:text-blue-300"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="managers">Managers</Label>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
                      {managers &&
                        managers?.map((manager) => (
                          <div
                            key={manager?._id}
                            className="flex items-center space-x-2 rounded-md"
                          >
                            <Checkbox
                              id={`manager-${manager._id}`}
                              checked={values.managers.includes(manager._id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFieldValue("managers", [
                                    ...values.managers,
                                    manager._id,
                                  ]);
                                } else {
                                  setFieldValue(
                                    "managers",
                                    values.managers.filter(
                                      (id) => id !== manager._id
                                    )
                                  );
                                }
                              }}
                              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                            <Label
                              htmlFor={`manager-${manager._id}`}
                              className="text-sm font-medium text-gray-800 dark:text-gray-200 cursor-pointer"
                            >
                              {manager.name}
                            </Label>
                          </div>
                        ))}
                    </div>
                    <ErrorMessage
                      name="managers"
                      component="div"
                      className="text-sm text-red-500 dark:text-red-400 mt-2"
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-4 pt-2 border-t border-gray-200 dark:border-gray-800 transition-colors">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setTags([]);
                    setTagInput("");
                  }}
                  className="bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  {isSubmitting ? "Creating..." : "Create Space"}
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};
