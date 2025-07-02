import { useSelector } from "react-redux";

import { useOwnerCompanyQuery } from "@/queries/owners/company/useOwnerCompanyQuery";
import { RootState } from "@/redux/store/appStore";

import { AddCompanyDetailsForm } from "../../components/AddCompanyDetailsForm";
import CompanyDetails from "../../components/CompanyDetails";

export default function Company() {
  const owner = useSelector((state: RootState) => state.owner);

  const { data: Company } = useOwnerCompanyQuery("" + owner._id);

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
