interface ActivityItemProps {
  title: string;
  time: string;
}

export default function ActivityItem({ title, time }: ActivityItemProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-800 dark:text-gray-100">{title}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
    </div>
  );
}
