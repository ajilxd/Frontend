import { useSelector } from "react-redux";

import { useOwnerCompanyQuery } from "@/queries/owners/company/useOwnerCompanyQuery";
import { RootState } from "@/redux/store/appStore";

import { AddCompanyDetailsForm } from "../../components/AddCompanyDetailsForm";
import CompanyDetails from "../../components/CompanyDetails";

export default function Company() {
  const owner = useSelector((state: RootState) => state.owner);

  const { data: Company, isLoading } = useOwnerCompanyQuery("" + owner._id);

  if (isLoading)
    return (
      <div className="text-center mt-10 text-muted-foreground">Loading...</div>
    );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {Company && Company.companyName ? (
        <CompanyDetails companyData={Company} />
      ) : (
        <AddCompanyDetailsForm />
      )}
    </div>
  );
}
