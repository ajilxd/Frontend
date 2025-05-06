import { Search, Users } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useManagerUsersQuery } from "@/queries/managers/users/useManagerUsersQuery";
import { RootState } from "@/redux/store/appStore";

import { AddUserstoSpaceDialogue } from "../../components/AddUserstoSpaceDialogue";
import { MembersTable } from "../../components/MembersTable";

export default function Members() {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const manager = useSelector((state: RootState) => state.manager);
  const [showAddToProjectDialog, setShowAddToProjectDialog] =
    useState<boolean>(false);
  const { spaceid } = useParams();

  const { data: users } = useManagerUsersQuery(manager.id);

  const members = users?.filter((item) => item.spaces?.includes("" + spaceid));

  const toggleMemberSelection = (memberId: string) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
      console.log(selectedMembers);
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  const resetSelectedMembers = () => {
    setSelectedMembers([]);
  };

  const closeAddtoUserDialogueHandler = () => {
    setShowAddToProjectDialog(false);
    resetSelectedMembers();
  };

  return (
    <>
      <AddUserstoSpaceDialogue
        open={showAddToProjectDialog}
        selectedMembers={selectedMembers}
        closeHandler={closeAddtoUserDialogueHandler}
        spaceId={spaceid!}
        resetSelectedMembers={resetSelectedMembers}
      />
      <div className="flex flex-col h-screen bg-gray-950 text-gray-200">
        <header className="border-b border-gray-800 p-4">
          <div className="container mx-auto">
            <h1 className="text-xl font-semibold text-white">
              Member Management
            </h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search members..."
                  className="pl-10 bg-gray-900 border-gray-800 text-gray-200 w-full"
                />
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800 flex-1 sm:flex-none"
                  disabled={selectedMembers.length === 0}
                  onClick={() => setShowAddToProjectDialog(true)}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Add to Project
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all-users" className="w-full">
              <TabsList className="bg-gray-900 border-b border-gray-800">
                <TabsTrigger
                  value="members"
                  className="data-[state=active]:bg-gray-800"
                >
                  Members
                </TabsTrigger>
                <TabsTrigger
                  value="all-users"
                  className="data-[state=active]:bg-gray-800"
                >
                  Add Members
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all-users" className="mt-4">
                <MembersTable
                  members={users!}
                  selectedMembers={selectedMembers}
                  toggleMemberSelection={toggleMemberSelection}
                  hasTeamMembers={false}
                />
              </TabsContent>

              <TabsContent value="members" className="mt-4">
                <MembersTable
                  members={members!}
                  selectedMembers={selectedMembers}
                  toggleMemberSelection={toggleMemberSelection}
                  hasTeamMembers={true}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
}
