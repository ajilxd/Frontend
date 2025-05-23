import {
  User,
  LayoutDashboard,
  Building2,
  Wallet,
  Text,
  Plus,
  Edit,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useOwnerCompanyQuery } from "@/queries/owners/company/useOwnerCompanyQuery";
import { useOwnerSubscriptionQuery } from "@/queries/owners/subscriptions/useOwnerSubscriptionQuery";
import { RootState } from "@/redux/store/appStore";
import { SignOutModal } from "@/shared/components/signoutModal";
import { SubscriptionPaywall } from "@/shared/components/SubscriptionPaywall";

import { CompanyNotRegisteredAlert } from "../components/CompanyNotRegisteredAlert";
import SidebarItem from "../components/SIdebarItem";

const sidebarsArray: { icon: React.ElementType; label: string }[] = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Edit, label: "Profile" },
  { icon: User, label: "Managers" },
  { icon: Wallet, label: "Subscriptions" },
  { icon: Building2, label: "Company" },
  { icon: Text, label: "Invoices" },
  { icon: Plus, label: "Spaces" },
];

export default function OwnerDashboard() {
  const owner = useSelector((state: RootState) => state.owner);
  const [activeItem, setActiveItem] = useState<string>("Dashboard");
  const navigate = useNavigate();

  const { data: OwnerSubscription } = useOwnerSubscriptionQuery("" + owner._id);
  const { data: OwnerCompany } = useOwnerCompanyQuery("" + owner._id);

  const location = useLocation();
  const canShowCompanyRegistrationAlert =
    location.pathname !== "/owner/dashboard/company";
  const canShowSubscripitionPaywall =
    location.pathname !== "/owner/dashboard/subscriptions";
  // console.log(location.pathname);
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
        {!OwnerSubscription && canShowSubscripitionPaywall && (
          <SubscriptionPaywall />
        )}
        {!OwnerCompany && canShowCompanyRegistrationAlert && (
          <CompanyNotRegisteredAlert />
        )}
        <Outlet />
      </main>
    </div>
  );
}
