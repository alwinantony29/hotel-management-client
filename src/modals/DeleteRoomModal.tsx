import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

type DeleteRoomModalProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    roomId?: string;
};

const DeleteRoomModal: React.FC<DeleteRoomModalProps> = ({ open, setOpen, roomId }) => {
    const queryClient = useQueryClient();

    const deleteRoomMutation = useMutation({
        mutationFn: async () => {
            if (!roomId) return;
            await api.delete(`/rooms/${roomId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["rooms"]);
            setOpen(false);
        },
        onError: (error) => {
            console.error("Error deleting room:", error);
        }
    });

    const handleDelete = () => {
        deleteRoomMutation.mutate();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-full max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Room</DialogTitle>
                </DialogHeader>
                <div className="p-4 text-center">
                    <p>Are you sure you want to delete this room?</p>
                    <p className="text-red-500 font-semibold mt-2">This action cannot be undone.</p>
                </div>
                <DialogFooter className="border-t p-4 flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={deleteRoomMutation.isPending}>
                        {deleteRoomMutation.isPending ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteRoomModal;
