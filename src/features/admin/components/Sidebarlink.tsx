type SidebarLinkProps = {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
};

export default function SidebarLink({
  icon,
  label,
  isActive = false,
  onClick,
}: SidebarLinkProps) {
  const baseClass = "flex items-center px-4 py-3 my-1 rounded-md text-sm";

  const activeClass = isActive
    ? "bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400"
    : "hover:bg-gray-100 dark:hover:bg-gray-700";

  return (
    <div className={`${baseClass} ${activeClass}`} onClick={onClick}>
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
