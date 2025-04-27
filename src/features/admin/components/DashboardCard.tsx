interface DashboardCardProps {
  title: string;
  value: string;
  change: string;
  isNegative?: boolean;
}

export default function DashboardCard({
  title,
  value,
  change,
  isNegative = false,
}: DashboardCardProps) {
  const changeColor = isNegative ? "text-red-500" : "text-green-500";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <div className="flex items-center justify-between mt-2">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {value}
        </h3>
        <span className={`text-sm ${changeColor}`}>{change}</span>
      </div>
    </div>
  );
}
