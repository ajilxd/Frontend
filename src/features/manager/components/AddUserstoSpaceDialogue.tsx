import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useManagerUsersQuery } from "@/queries/managers/users/useManagerUsersQuery";
import { RootState } from "@/redux/store/appStore";

import { managerUpdateSpace } from "../api/manager.api";
import { TeamMemberType } from "../types";
import { useQueryClient } from "@tanstack/react-query";

export function AddUserstoSpaceDialogue({
  open,
  selectedMembers,
  closeHandler,
  spaceId,
  resetSelectedMembers,
}: {
  open: boolean;
  selectedMembers: string[];
  closeHandler: () => void;
  spaceId: string;
  resetSelectedMembers: () => void;
}) {
  const manager = useSelector((state: RootState) => state.manager);
  const { data: users } = useManagerUsersQuery(manager.id);
  const queryClient = useQueryClient();

  if (!open) return null;

  const selectedUsers =
    users?.filter((user) => selectedMembers.includes(user._id)) ?? [];

  const AdduserHandler = async () => {
    const members: TeamMemberType[] = selectedUsers.map((user) => ({
      userId: user._id!,
      designation: user.role!,
      joinedAt: new Date(),
      invitedBy: manager.id,
      status: "active",
      memberName: user.name!,
    }));

    const team = { members };

    const response = await managerUpdateSpace(
      "" + manager.owner.ownerId,
      spaceId,
      {
        team,
      }
    );
    if (response.success) {
      enqueueSnackbar("Members added succesfully", { variant: "success" });
      queryClient.invalidateQueries({
        queryKey: ["manager", "users", manager.id],
      });
      resetSelectedMembers();
      closeHandler();
    } else {
      enqueueSnackbar("something went wrong,try again later");
    }
  };

  return (
    <Dialog open={open} onOpenChange={closeHandler}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Users to Space</DialogTitle>
          <DialogDescription>
            By clicking add, selected users will be added to the space.
          </DialogDescription>
        </DialogHeader>

        <div className=" flex flex-col gap-4">
          {selectedUsers.map((user) => (
            <div key={user._id} className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{user.name}</span>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={AdduserHandler}>
            Add
          </Button>
          <Button variant="destructive" onClick={() => closeHandler()}>
            cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
