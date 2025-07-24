import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { SubscriptionType } from "@/types";
import { Edit } from "lucide-react";
import { adminEditSubscription } from "../api/admin.api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function EditSubscriptionModal({
  subscription,
  closePopOverFn,
}: {
  subscription: SubscriptionType;
  closePopOverFn: () => void;
}) {
  const queryClient = useQueryClient();
  const [name, setName] = React.useState(subscription.name);
  const [description, setDescription] = React.useState(
    subscription.description
  );
  const [users, setUsers] = React.useState(subscription.features.userCount);
  const [spaces, setSpaces] = React.useState(subscription.features.spaces);
  const [managers, setManagers] = React.useState(
    subscription.features.managerCount
  );
  const [chat, setChat] = React.useState(subscription.features.chat);
  const [meeting, setMeeting] = React.useState(subscription.features.meeting);

  const handleSave = async () => {
    const data = { name, description, users, spaces, managers, chat, meeting };
    const response = await adminEditSubscription(subscription._id, data);
    if (response.success) {
      toast.success("subscription went succesful");
      queryClient.invalidateQueries({
        queryKey: [
          "admin",
          "subscriptions",
          { page: 1, search: "", billingCycle: "", status: "" },
        ],
      });
      closePopOverFn();
    } else {
      toast.error("something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full flex items-center justify-start text-sm h-8 px-2 rounded hover:bg-accent hover:text-accent-foreground text-left">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="dark:bg-gray-900 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle>Edit Plan</DialogTitle>
          <DialogDescription>
            Update the plan details and its features.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Features</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="users">Number of Users</Label>
                <Input
                  id="users"
                  type="number"
                  value={users}
                  onChange={(e) => setUsers(Number(e.target.value))}
                  className="dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="spaces">Number of Spaces</Label>
                <Input
                  id="spaces"
                  type="number"
                  value={spaces}
                  onChange={(e) => setSpaces(Number(e.target.value))}
                  className="dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="managers">Number of Managers</Label>
                <Input
                  id="managers"
                  type="number"
                  value={managers}
                  onChange={(e) => setManagers(Number(e.target.value))}
                  className="dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="chat"
                  checked={chat}
                  onCheckedChange={(checked) => setChat(!!checked)}
                />
                <Label htmlFor="chat">Chat for Groups Allowed</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="meeting"
                  checked={meeting}
                  onCheckedChange={(checked) => setMeeting(!!checked)}
                />
                <Label htmlFor="meeting">Meeting for Groups Allowed</Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
