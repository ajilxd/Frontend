import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { OwnerContext } from "@/context/OwnerContext";
import { RootState } from "@/redux/store/appStore";

import { ownerFetchCompanyDetails } from "../../api/owner.api";
import { AddCompanyDetailsForm } from "../../components/AddCompanyDetailsForm";
import CompanyDetails from "../../components/CompanyDetails";

export default function Company() {
  const [isLoading, setIsLoading] = useState(true);
  const owner = useSelector((state: RootState) => state.owner);
  const { updateCompany, company } = useContext(OwnerContext);

  useEffect(() => {
    const fetchCompany = async () => {
      setIsLoading(true);
      const res = await ownerFetchCompanyDetails(owner._id!);
      if (res.success) {
        updateCompany(res.data.data);
      } else {
        console.error("Failed to fetch company:", res.message);
      }
      setIsLoading(false);
    };

    fetchCompany();
  }, []);

  if (isLoading)
    return (
      <div className="text-center mt-10 text-muted-foreground">Loading...</div>
    );
  console.log("data", company);
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {company && company.companyName ? (
        <CompanyDetails companyData={company} />
      ) : (
        <AddCompanyDetailsForm />
      )}
    </div>
  );
}
