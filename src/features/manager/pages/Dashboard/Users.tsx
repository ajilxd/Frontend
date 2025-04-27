import { Users, UserPlus } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ManagerAddUsers } from "../../components/ManagerAddUsers";
import { ManagerViewUsers } from "../../components/ManagerViewUser";

export default function UsersDashboard() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-full">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-100">
            Users Management
          </h1>
        </div>

        <div className="w-full">
          <Tabs defaultValue="view_users" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <TabsTrigger
                value="view_users"
                className="flex items-center justify-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">All </span>
                <span className="sm:hidden">Users</span>
              </TabsTrigger>
              <TabsTrigger
                value="add_user"
                className="flex items-center justify-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
              >
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Add User</span>
                <span className="sm:hidden">Add</span>
              </TabsTrigger>
            </TabsList>

            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
              <TabsContent value="view_users" className="mt-0">
                <ManagerViewUsers />
              </TabsContent>
              <TabsContent value="add_user" className="mt-0 p-4 sm:p-6">
                <ManagerAddUsers />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
