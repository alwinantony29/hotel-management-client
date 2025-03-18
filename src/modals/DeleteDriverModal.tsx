import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDriverMutations } from "@/hooks/useDriverMutation";

type DeleteDriverModalProps = {
  driverId: string | null;
  setDriverId: (v: string | null) => void;
};

const DeleteDriverModal: React.FC<DeleteDriverModalProps> = ({ driverId, setDriverId }) => {
  const { deleteDriverMutation } = useDriverMutations();

  const handleDelete = () => {
    if (!driverId) return;
    deleteDriverMutation.mutateAsync(driverId).then(() => {
      setDriverId(null);
    });
  };

  return (
    <Dialog open={!!driverId} onOpenChange={() => setDriverId(null)}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Driver</DialogTitle>
        </DialogHeader>
        <div className="p-4 text-center">
          <p>Are you sure you want to delete this driver?</p>
          <p className="text-red-500 font-semibold mt-2">
            This action cannot be undone.
          </p>
        </div>
        <DialogFooter className="border-t p-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setDriverId(null)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteDriverMutation.isPending}
          >
            {deleteDriverMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDriverModal;
