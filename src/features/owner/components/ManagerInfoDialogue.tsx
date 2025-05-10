import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  name: string;
  email: string;
  open: boolean;
  onClose: (open: boolean) => void;
};

export function ManagerInfoDialog({ name, email, open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>User Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Name:</span> {name}
          </div>
          <div>
            <span className="font-medium">Email:</span> {email}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
