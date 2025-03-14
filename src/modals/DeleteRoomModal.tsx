import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRoomMutations } from "@/hooks/useRoomMutation";

type DeleteRoomModalProps = {
  roomId: string;
  setRoomId: (v: string | null) => void;
};

const DeleteRoomModal: React.FC<DeleteRoomModalProps> = ({
  roomId,
  setRoomId,
}) => {
  const { deleteRoomMutation } = useRoomMutations();
  const handleDelete = () => {
    deleteRoomMutation.mutateAsync(roomId).then(() => {
      setRoomId(null);
    });
  };

  return (
    <Dialog open={!!roomId} onOpenChange={() => setRoomId(null)}>
      <DialogContent className="w-full max-w-md">
        <DialogDescription></DialogDescription>
        <DialogHeader>
          <DialogTitle>Delete Room</DialogTitle>
        </DialogHeader>
        <div className="p-4 text-center">
          <p>Are you sure you want to delete this room?</p>
          <p className="text-red-500 font-semibold mt-2">
            This action cannot be undone.
          </p>
        </div>
        <DialogFooter className="border-t p-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setRoomId(null)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteRoomMutation.isPending}
          >
            {deleteRoomMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRoomModal;
