import {
  X,
  Users,
  ShoppingBag,
  UserSearch,
  Receipt,
  DiamondPlus,
  icons,
  FileChartColumnIncreasingIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SignOutModal } from "@/shared/components/SignoutModal";

import SidebarLink from "./Sidebarlink";

enum AdminSidebarType {
  Dashboard = "Dashboard",
  Subscriptions = "Subscriptions",
  AllUsers = "AllUsers",
  Transactions = "Transactions",
  Add_Subscripition = "Add Subscription",
  Sales_Report = "Sales Report",
}

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const navigate = useNavigate();
  const [active, setActive] = useState<string>("");
  const AdminSidebarMap = {
    [AdminSidebarType.Dashboard]: {
      onClick: () => {
        setActive(AdminSidebarType.Dashboard);
        navigate("/admin/dashboard");
      },
      icon: <Users size={18} />,
      label: "Dashboard",
    },
    [AdminSidebarType.Subscriptions]: {
      onClick: () => {
        setActive(AdminSidebarType.Subscriptions);
        navigate("/admin/dashboard/subscriptions");
      },
      icon: <ShoppingBag size={18} />,
      label: "Subscriptions",
    },
    [AdminSidebarType.Add_Subscripition]: {
      onClick: () => {
        setActive(AdminSidebarType.Add_Subscripition);
        navigate("/admin/dashboard/new-subscription");
      },
      icon: <DiamondPlus size={18} />,
      label: "Add Subscription",
    },
    [AdminSidebarType.AllUsers]: {
      onClick: () => {
        setActive(AdminSidebarType.AllUsers);
        navigate("/admin/dashboard/users");
      },
      icon: <UserSearch size={18} />,
      label: "All Users",
    },
    [AdminSidebarType.Transactions]: {
      onClick: () => {
        setActive(AdminSidebarType.Transactions);
        navigate("/admin/dashboard/transactions");
      },
      icon: <Receipt size={18} />,
      label: "Transactions",
    },
    [AdminSidebarType.Sales_Report]: {
      onClick: () => {
        setActive(AdminSidebarType.Sales_Report);
        navigate("/admin/dashboard/sales-report");
      },
      icon: <FileChartColumnIncreasingIcon size={18} />,
      label: "Sales report",
    },
  };
  return (
    <div
      className={`bg-gray-50 text-gray-700 fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-300 transform dark:bg-gray-800 dark:text-gray-100 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          Admin
        </span>
        <button className="lg:hidden" onClick={toggleSidebar}>
          <X size={20} />
        </button>
      </div>
      <nav className="mt-5 px-4">
        {Object.entries(AdminSidebarMap).map(
          ([Key, { icon, label, onClick }]) => (
            <SidebarLink
              key={Key}
              icon={icon}
              label={label}
              onClick={onClick}
              isActive={active === label}
            />
          )
        )}

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          <SignOutModal user="admin" />
        </div>
      </nav>
    </div>
  );
}
