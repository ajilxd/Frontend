import { CheckIcon } from "lucide-react";

interface FeatureItemProps {
  children: React.ReactNode;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ children }) => (
  <div className="flex items-center gap-2">
    <CheckIcon className="w-5 h-5 text-green-500" />
    <span>{children}</span>
  </div>
);
