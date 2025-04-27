import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { EditCompanyDetailsModal } from "./EditCompanyDetails";

interface CompanyDetailsProps {
  companyData: {
    companyName: string;
    websiteURL: string;
    description: string;
    industry: string[];
    ownerId: string;
  };
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ companyData }) => {
  return (
    <Card className="w-full max-w-2xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between">
        <CardTitle className="text-2xl font-semibold text-blue-800 dark:text-blue-200">
          {companyData.companyName}
        </CardTitle>
        <EditCompanyDetailsModal />
      </CardHeader>

      <CardContent className="p-6 space-y-6 bg-white dark:bg-slate-900">
        {/* Website Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Website
          </h3>
          <a
            href={companyData.websiteURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 dark:text-blue-300 hover:underline"
          >
            {companyData.websiteURL}
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>

        {/* Industry Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Industries
          </h3>
          <div className="flex flex-wrap gap-2">
            {companyData.industry.map((industry, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
              >
                {industry}
              </Badge>
            ))}
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Description
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {companyData.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyDetails;
