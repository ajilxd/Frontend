import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: number;
  icon: any;
  additionalInfo: string;
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,

  additionalInfo,
}) => (
  <Card className="hover:shadow-md dark:hover:shadow-lg transition-all duration-200 border-slate-200 dark:border-slate-800">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
        {title}
      </CardTitle>
      <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg">
        <Icon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </div>
      {additionalInfo && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          {additionalInfo}
        </p>
      )}
    </CardContent>
  </Card>
);
