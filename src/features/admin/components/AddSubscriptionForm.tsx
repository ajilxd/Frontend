import { useFormik } from "formik";
import { useSnackbar } from "notistack";

type AddSubscriptionFormPropsType = {
  setShowAddForm: (arg: boolean) => void;
  showAddForm: boolean;
};

import { adminAddSubscriptionService } from "../api/admin.api";
import {
  addSubscriptionFormInitialValues,
  subscripitonFeatures,
} from "../constants/subscription.constants";
import { SubscriptionType } from "../types/admin.model";
import { addSubscriptionValidationSchema } from "../validation/subscription.validation";

export const AddSubscriptionForm = function ({
  setShowAddForm,
  showAddForm,
}: AddSubscriptionFormPropsType) {
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: addSubscriptionFormInitialValues as SubscriptionType,
    validationSchema: addSubscriptionValidationSchema,
    onSubmit: async (values: SubscriptionType) => {
      const response = await adminAddSubscriptionService(values);
      if (response.success) {
        setShowAddForm(false);
        formik.resetForm({
          values: addSubscriptionFormInitialValues as SubscriptionType,
        });
        enqueueSnackbar("Subscription added successfully!", {
          variant: "success",
        });
      } else {
        if ("status" in response) {
          console.error(response.status + " : " + response.message);
        }
        enqueueSnackbar("failed submitting subscription", {
          variant: "error",
        });
      }
    },
  });

  const hasError = (fieldName: string) => {
    return (
      formik.touched[fieldName as keyof typeof formik.touched] &&
      Boolean(formik.errors[fieldName as keyof typeof formik.errors])
    );
  };

  const getErrorMessage = (fieldName: string) => {
    return formik.touched[fieldName as keyof typeof formik.touched]
      ? formik.errors[fieldName as keyof typeof formik.errors]
      : "";
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">
        Add New Subscription
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Plan name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`w-full p-2.5 border ${
              hasError("name")
                ? "border-red-500 dark:border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } 
              rounded-lg bg-white dark:bg-gray-700 
              text-gray-900 dark:text-gray-100 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
            placeholder="Enterprise Plan"
          />
          {hasError("name") && (
            <p className="mt-1 text-sm text-red-500">
              {getErrorMessage("name")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Amount
          </label>
          <div className="flex items-center">
            <span className="p-2.5 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
              $
            </span>
            <input
              id="amount"
              name="amount"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
              className={`w-full p-2.5 border ${
                hasError("amount")
                  ? "border-red-500 dark:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } 
                rounded-r-lg bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              placeholder="0.00"
            />
          </div>
          {hasError("amount") && (
            <p className="mt-1 text-sm text-red-500">
              {getErrorMessage("amount")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Billing Cycle
          </label>
          <div className="flex flex-wrap gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="billingCycle"
                value="monthly"
                onChange={formik.handleChange}
                checked={formik.values.billingCycle === "month"}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                Monthly
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="billingCycle"
                value="yearly"
                onChange={formik.handleChange}
                checked={formik.values.billingCycle === "year"}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                Yearly
              </span>
            </label>
          </div>
          {hasError("billingCycle") && (
            <p className="mt-1 text-sm text-red-500">
              {getErrorMessage("billingCycle")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <div className="flex flex-wrap gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="isActive"
                value="true"
                onChange={(e) =>
                  formik.setFieldValue("isActive", e.target.value === "true")
                }
                checked={formik.values.isActive === true}
              />

              <span className="ml-2 text-gray-700 dark:text-gray-300">
                Active
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="isActive"
                value="false"
                onChange={(e) =>
                  formik.setFieldValue("isActive", e.target.value === "true")
                }
                checked={formik.values.isActive === false}
              />

              <span className="ml-2 text-gray-700 dark:text-gray-300">
                Inactive
              </span>
            </label>
          </div>
          {hasError("isActive") && (
            <p className="mt-1 text-sm text-red-500">
              {getErrorMessage("isActive")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="features"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Features
          </label>
          <div
            className={`p-3 border ${
              hasError("features")
                ? "border-red-500 dark:border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } 
            rounded-lg bg-white dark:bg-gray-700`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {subscripitonFeatures.map((feature) => (
                <label
                  key={feature.id}
                  className="inline-flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-600 rounded cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    name="features"
                    value={feature.id}
                    onChange={formik.handleChange}
                    checked={formik.values.features.includes(feature.id)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-200">
                    {feature.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
          {hasError("features") && (
            <p className="mt-1 text-sm text-red-500">
              {getErrorMessage("features")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className={`w-full p-2.5 border ${
              hasError("description")
                ? "border-red-500 dark:border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } 
              rounded-lg bg-white dark:bg-gray-700 
              text-gray-900 dark:text-gray-100 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
            rows={3}
            placeholder="Describe the subscription plan..."
          />
          {hasError("description") && (
            <p className="mt-1 text-sm text-red-500">
              {getErrorMessage("description")}
            </p>
          )}
        </div>
        {formik.isSubmitting && <p>Submitting...</p>}
        {formik.isValid === false && formik.submitCount > 0 && (
          <p className="text-red-500">Form has validation errors.</p>
        )}

        <div className="flex justify-end space-x-3 mt-8">
          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Subscription
          </button>
        </div>
      </form>
    </div>
  );
};
