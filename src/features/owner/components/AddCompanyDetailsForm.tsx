import { useFormik } from "formik";
import { Check, Plus } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useOwnerSubscriptionQuery } from "@/queries/owners/subscriptions/useOwnerSubscriptionQuery";
import { RootState } from "@/redux/store/appStore";

import { ownerAddCompanyDetails } from "../api/owner.api";
import companyDetailsSchema from "../validation/owner.validation";

interface Industry {
  value: string;
  label: string;
}

const defaultIndustries: Industry[] = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
];

export function AddCompanyDetailsForm() {
  const [industries, setIndustries] = useState<Industry[]>(defaultIndustries);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [newIndustry, setNewIndustry] = useState("");
  const owner = useSelector((state: RootState) => state.owner);
  const { data: OwnerSubscription } = useOwnerSubscriptionQuery("" + owner._id);

  const formik = useFormik({
    initialValues: {
      companyName: "",
      websiteURL: "",
      description: "",
      industry: [],
    },
    validationSchema: companyDetailsSchema,
    onSubmit: async (values) => {
      const res = await ownerAddCompanyDetails({
        ownerId: "" + owner._id,
        ...values,
        industry: selectedIndustries,
      });
      if (res.success) {
        enqueueSnackbar("Company details added succesfully", {
          variant: "success",
        });

        formik.resetForm();
      } else {
        enqueueSnackbar(res.message, {
          variant: "error",
        });
      }
    },
  });

  const addNewIndustry = () => {
    if (
      newIndustry &&
      !industries.find((i) => i.value === newIndustry.toLowerCase())
    ) {
      const newInd = { value: newIndustry.toLowerCase(), label: newIndustry };
      setIndustries([...industries, newInd]);
      setSelectedIndustries([...selectedIndustries, newInd.value]);
      setNewIndustry("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-2xl mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Company Registration
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Fill in the details below to register your company
        </p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-950/10 p-6 space-y-5"
      >
        <div className="border-b border-gray-100 dark:border-gray-700 pb-2">
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">
            Company Details
          </h2>
        </div>

        {/* Company Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="companyName"
            className="text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Company Name
          </label>
          <Input
            id="companyName"
            name="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter company name"
            className="h-9 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-md focus:border-blue-400 focus:ring-0 dark:focus:border-blue-500"
          />
          {formik.touched.companyName && formik.errors.companyName && (
            <p className="text-red-500 dark:text-red-400 text-xs">
              {formik.errors.companyName}
            </p>
          )}
        </div>

        {/* Industry Select */}
        <div className="space-y-1.5">
          <label
            htmlFor="industries"
            className="text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Industry
          </label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-9 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-750"
              >
                {selectedIndustries.length > 0
                  ? selectedIndustries
                      .map(
                        (value) =>
                          industries.find((i) => i.value === value)?.label
                      )
                      .join(", ")
                  : "Select industries"}
                <Plus className="ml-2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 rounded-md shadow-md dark:shadow-gray-950/10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <Command className="rounded-md">
                <CommandInput
                  placeholder="Search or add industry..."
                  value={newIndustry}
                  onValueChange={setNewIndustry}
                  className="h-9 text-sm"
                />
                <CommandList>
                  <CommandEmpty>
                    No industries found.{" "}
                    {newIndustry && (
                      <Button
                        variant="ghost"
                        onClick={addNewIndustry}
                        className="text-xs text-blue-500 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-750"
                      >
                        Add "{newIndustry}"
                      </Button>
                    )}
                  </CommandEmpty>
                  <CommandGroup>
                    {industries.map((industry) => (
                      <CommandItem
                        key={industry.value}
                        value={industry.value}
                        onSelect={(currentValue) => {
                          setSelectedIndustries(
                            selectedIndustries.includes(currentValue)
                              ? selectedIndustries.filter(
                                  (i) => i !== currentValue
                                )
                              : [...selectedIndustries, currentValue]
                          );
                        }}
                        className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750"
                      >
                        {industry.label}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4 text-blue-500 dark:text-blue-400",
                            selectedIndustries.includes(industry.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Website URL */}
        <div className="space-y-1.5">
          <label
            htmlFor="website"
            className="text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Website
          </label>
          <Input
            id="websiteURL"
            name="websiteURL"
            type="url"
            value={formik.values.websiteURL}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="https://example.com"
            className="h-9 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-md focus:border-blue-400 focus:ring-0 dark:focus:border-blue-500"
          />
          {formik.touched.websiteURL && formik.errors.websiteURL && (
            <p className="text-red-500 dark:text-red-400 text-xs">
              {formik.errors.websiteURL}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Describe your company"
            rows={4}
            className="px-3 py-2 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-md focus:border-blue-400 focus:ring-0 dark:focus:border-blue-500"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 dark:text-red-400 text-xs">
              {formik.errors.description}
            </p>
          )}
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={!OwnerSubscription}
            className="w-full h-9 text-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-md"
          >
            Register Company
          </Button>
        </div>
      </form>
    </div>
  );
}
