import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";
import "@/css/custom-scroolbar.css";
import { addSubscriptionValidationSchema } from "../validation/subscription.validation";
import { addSubscriptionFormInitialValues } from "../constants/subscription.constants";
import { adminAddSubscriptionService } from "../api/admin.api";
import { toast } from "sonner";

export default function AddSubscriptionPage() {
  const [yearlyDiscountPercentage, setYearlyDiscountPercentage] = useState(20);

  const calculateYearlyAmount = (monthly: number) => {
    const yearlyBeforeDiscount = monthly * 12;
    const discount = (yearlyBeforeDiscount * yearlyDiscountPercentage) / 100;
    return (yearlyBeforeDiscount - discount).toFixed(2);
  };

  const formik = useFormik({
    initialValues: addSubscriptionFormInitialValues,
    validationSchema: addSubscriptionValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { resetForm }) => {
      const response = await adminAddSubscriptionService({
        ...values,
        yearlyDiscountPercentage,
      });
      if (response.success) {
        toast.success("subscription added succesfully");
        resetForm();
      } else {
        if ("status" in response) {
          if (response.status === 409) {
            toast.warning("Existing subscripton name");
            return;
          }
        }
        toast.error("Try again later");
      }
    },
  });

  const handleMonthlyAmountChange = (e) => {
    const val = parseFloat(e.target.value);
    formik.setFieldValue("monthlyAmount", isNaN(val) ? "" : val);
    if (formik.values.billingCycleType === "both") {
      const calculatedYearly = calculateYearlyAmount(val || 0);
      formik.setFieldValue("yearlyAmount", calculatedYearly);
    }
  };

  const handleDiscountPercentageChange = (e) => {
    const val = parseFloat(e.target.value);
    setYearlyDiscountPercentage(isNaN(val) ? 0 : val);
    if (
      formik.values.billingCycleType === "both" &&
      formik.values.monthlyAmount
    ) {
      const calculatedYearly = calculateYearlyAmount(
        parseFloat(formik.values.monthlyAmount) || 0
      );
      formik.setFieldValue("yearlyAmount", calculatedYearly);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 text-lg">
      <Card>
        <CardHeader>
          <CardTitle>Add New Subscription Plan</CardTitle>
          <CardDescription>
            Create subscription pricing, cycle, and features.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="name">Plan Name *</Label>
              <Input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g., Premium Plan"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} /> {formik.errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Billing Cycle *</Label>
              <RadioGroup
                value={formik.values.billingCycleType}
                onValueChange={(val) =>
                  formik.setFieldValue("billingCycleType", val)
                }
                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="month" id="month" />
                  <Label htmlFor="month">Monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="year" id="year" />
                  <Label htmlFor="year">Yearly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both">Both</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="font-semibold">Pricing</Label>

              {formik.values.billingCycleType === "month" && (
                <div className="space-y-2">
                  <Label htmlFor="monthlyAmount">Monthly Amount *</Label>
                  <Input
                    id="monthlyAmount"
                    name="monthlyAmount"
                    type="number"
                    step="1"
                    value={formik.values.monthlyAmount}
                    onChange={handleMonthlyAmountChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.monthlyAmount &&
                    formik.errors.monthlyAmount && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={14} /> {formik.errors.monthlyAmount}
                      </p>
                    )}
                </div>
              )}

              {formik.values.billingCycleType === "year" && (
                <div className="space-y-2">
                  <Label htmlFor="yearlyAmount">Yearly Amount *</Label>
                  <Input
                    id="yearlyAmount"
                    name="yearlyAmount"
                    type="number"
                    step="1"
                    value={formik.values.yearlyAmount}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "yearlyAmount",
                        parseFloat(e.target.value) || ""
                      )
                    }
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.yearlyAmount &&
                    formik.errors.yearlyAmount && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={14} /> {formik.errors.yearlyAmount}
                      </p>
                    )}
                </div>
              )}

              {formik.values.billingCycleType === "both" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyAmount">Monthly Amount *</Label>
                    <Input
                      id="monthlyAmount"
                      name="monthlyAmount"
                      type="number"
                      step="1"
                      value={formik.values.monthlyAmount}
                      onChange={handleMonthlyAmountChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.monthlyAmount &&
                      formik.errors.monthlyAmount && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle size={14} />{" "}
                          {formik.errors.monthlyAmount}
                        </p>
                      )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearlyDiscountPercentage">
                      Yearly Discount %
                    </Label>
                    <Input
                      id="yearlyDiscountPercentage"
                      type="number"
                      min="0"
                      max="100"
                      value={yearlyDiscountPercentage}
                      onChange={handleDiscountPercentageChange}
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label>Yearly Amount (Auto)</Label>
                    <Input
                      type="text"
                      readOnly
                      value={`$${formik.values.yearlyAmount || "0.00"}`}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <Label className="font-semibold">Features</Label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numberOfSpaces">Spaces *</Label>
                  <Input
                    id="numberOfSpaces"
                    name="numberOfSpaces"
                    type="number"
                    value={formik.values.numberOfSpaces}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "numberOfSpaces",
                        parseInt(e.target.value) || ""
                      )
                    }
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.numberOfSpaces &&
                    formik.errors.numberOfSpaces && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={14} /> {formik.errors.numberOfSpaces}
                      </p>
                    )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberOfManagers">Managers *</Label>
                  <Input
                    id="numberOfManagers"
                    name="numberOfManagers"
                    type="number"
                    value={formik.values.numberOfManagers}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "numberOfManagers",
                        parseInt(e.target.value) || ""
                      )
                    }
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.numberOfManagers &&
                    formik.errors.numberOfManagers && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={14} />{" "}
                        {formik.errors.numberOfManagers}
                      </p>
                    )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberOfUsers">Users *</Label>
                  <Input
                    id="numberOfUsers"
                    name="numberOfUsers"
                    type="number"
                    value={formik.values.numberOfUsers}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "numberOfUsers",
                        parseInt(e.target.value) || ""
                      )
                    }
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.numberOfUsers &&
                    formik.errors.numberOfUsers && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={14} /> {formik.errors.numberOfUsers}
                      </p>
                    )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowChatWithSpace"
                    checked={formik.values.allowChatWithSpace}
                    onCheckedChange={(val) =>
                      formik.setFieldValue("allowChatWithSpace", val)
                    }
                  />
                  <Label htmlFor="allowChatWithSpace">
                    Allow Chat with Space
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowMeetingWithSpace"
                    checked={formik.values.allowMeetingWithSpace}
                    onCheckedChange={(val) =>
                      formik.setFieldValue("allowMeetingWithSpace", val)
                    }
                  />
                  <Label htmlFor="allowMeetingWithSpace">
                    Allow Meeting with Space
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} /> {formik.errors.description}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => formik.resetForm()}
              >
                Cancel
              </Button>
              <Button type="submit">Create Subscription Plan</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
