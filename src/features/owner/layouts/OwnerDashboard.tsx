import { User, LayoutDashboard, Building2, Wallet, Text } from "lucide-react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { SignOutModal } from "@/shared/components/signoutModal";

import SidebarItem from "../components/SIdebarItem";

const sidebarsArray: { icon: React.ElementType; label: string }[] = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: User, label: "Managers" },
  { icon: Wallet, label: "Subscriptions" },
  { icon: Building2, label: "Company" },
  { icon: Text, label: "Invoices" },
];

export default function OwnerDashboard() {
  const [activeItem, setActiveItem] = useState<string>("Dashboard");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-6 flex flex-col justify-between border-r border-gray-800">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-purple-400">
            Fluentawork
          </h2>
          <nav className="flex flex-col gap-2">
            {sidebarsArray.map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                isActive={activeItem === item.label}
                onClick={() => {
                  setActiveItem(item.label);
                  if (item.label === "Dashboard") {
                    navigate("/owner/dashboard/");
                  } else {
                    navigate("/owner/dashboard/" + item.label.toLowerCase());
                  }
                }}
              />
            ))}
          </nav>
        </div>

        <SignOutModal user="owner" />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 space-y-6">
        <Outlet />
      </main>
    </div>
  );
}
