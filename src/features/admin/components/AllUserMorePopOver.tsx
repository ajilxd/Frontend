import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import { adminBlockUser } from "../api/admin.api";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  role: "user" | "manager" | "owner";
  id: string;
  block: boolean;
  page: number;
  search: string;
  status: string;
  filteredRole: string;
};

const AllUserMorePopOver: React.FC<Props> = ({
  role,
  id,
  block,
  page,
  search,
  status,
  filteredRole,
}) => {
  const queryClient = useQueryClient();
  const handleBlockToggle = async () => {
    console.log(
      `${block ? "Unblocking" : "Blocking"} user ${id} of ${role} role`
    );
    const res = await adminBlockUser(role, id, !block);
    if (res.success) {
      toast.success("status updated", { position: "top-center" });
      queryClient.invalidateQueries({
        queryKey: [
          "admin",
          "allusers",
          { page, search, role: filteredRole, status },
        ],
      });
    } else {
      alert("something went wrong");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        <div className="space-y-1">
          <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
            Manage User
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBlockToggle}
            className="w-full justify-start text-sm font-normal"
          >
            {block ? "Unblock" : "Block"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AllUserMorePopOver;
