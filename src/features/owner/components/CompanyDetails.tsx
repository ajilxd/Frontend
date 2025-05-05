import { ExternalLink, Building2, Globe, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CompanyType } from "@/types";

import { EditCompanyDetailsModal } from "./EditCompanyDetails";

interface CompanyDetailsProps {
  companyData: CompanyType;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ companyData }) => {
  return (
    <Card className="w-full max-w-2xl bg-card border-border shadow-xl">
      <CardHeader className="pb-2 space-y-1">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            {companyData.companyName}
          </CardTitle>
          <EditCompanyDetailsModal />
        </div>
      </CardHeader>

      <Separator className="my-1" />

      <CardContent className="pt-4 pb-6 space-y-6">
        {/* Website Section */}
        <div className="flex items-start space-x-3">
          <Globe className="h-5 w-5 text-primary mt-0.5" />
          <div className="space-y-1.5">
            <h3 className="text-sm font-medium text-muted-foreground">
              Website
            </h3>
            <a
              href={companyData.websiteURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:text-primary/90 underline-offset-4 hover:underline transition-colors"
            >
              {companyData.websiteURL}
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Industry Section */}
        <div className="flex items-start space-x-3">
          <Building2 className="h-5 w-5 text-primary mt-0.5" />
          <div className="space-y-1.5">
            <h3 className="text-sm font-medium text-muted-foreground">
              Industries
            </h3>
            <div className="flex flex-wrap gap-2">
              {companyData.industry.map((industry, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs font-medium"
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="flex items-start space-x-3">
          <FileText className="h-5 w-5 text-primary mt-0.5" />
          <div className="space-y-1.5">
            <h3 className="text-sm font-medium text-muted-foreground">
              Description
            </h3>
            <p className="text-foreground leading-relaxed">
              {companyData.description}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-4 px-6">
        <Button variant="outline" className="w-full" asChild>
          <a
            href={companyData.websiteURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            Visit Website
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyDetails;
