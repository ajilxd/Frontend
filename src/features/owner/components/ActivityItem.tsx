const ActivityItem = ({ icon, title, description }: any) => (
  <div className="flex gap-3 items-start text-gray-300">
    <div className="mt-1 text-purple-400">{icon}</div>
    <div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </div>
);

export default ActivityItem;
