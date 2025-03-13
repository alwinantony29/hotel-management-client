import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/axios";
import { Room } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type AddEditRoomModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  roomData?: Room | undefined;
};

const AddEditRoomModal: React.FC<AddEditRoomModalProps> = ({
  open,
  setOpen,
  roomData,
}) => {
  const queryClient = useQueryClient();

  const [roomNo, setRoomNo] = useState<string>("");
  const [type, setType] = useState<string>("deluxe");
  const [capacity, setCapacity] = useState<number | "">("");
  const [status, setStatus] = useState<string>("available");
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState<string[]>([]);
  const [price, setPrice] = useState<number | "">("");

  // Populate states when roomData is available
  useEffect(() => {
    if (roomData) {
      setRoomNo(roomData.roomNo);
      setType(roomData.type);
      setCapacity(roomData.capacity);
      setStatus(roomData.status);
      setImages(roomData.images);
      setDescription(roomData.description);
      setPrice(roomData.price);
    } else {
      setRoomNo("");
      setType("deluxe");
      setCapacity("");
      setStatus("available");
      setImages([]);
      setDescription([]);
      setPrice("");
    }
  }, [roomData, open]);

  // Mutation for adding a room
  const addRoomMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/rooms", {
        roomNo,
        type,
        capacity,
        status,
        images,
        description,
        price,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error adding room:", error);
    },
  });

  // Mutation for updating a room
  const editRoomMutation = useMutation({
    mutationFn: async () => {
      const res = await api.put(`/rooms/${roomData?._id}`, {
        roomNo,
        type,
        capacity,
        status,
        images,
        description,
        price,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error editing room:", error);
    },
  });

  const handleSaveRoom = () => {
    addRoomMutation.mutate();
  };

  const handleEditRoom = () => {
    editRoomMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-lg h-[80vh] flex flex-col">
        <DialogDescription></DialogDescription>
        <DialogHeader>
          <DialogTitle>{roomData ? "Edit" : "Add"} Room</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <Label className="my-1 block">Room No</Label>
            <Input value={roomNo} onChange={(e) => setRoomNo(e.target.value)} />
          </div>
          <div>
            <Label className="my-1 block">Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deluxe">Deluxe</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="ultra luxury">Ultra Luxury</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="my-1 block">Capacity</Label>
            <Input
              type="number"
              value={capacity}
              onChange={(e) =>
                setCapacity(e.target.value ? parseInt(e.target.value, 10) : "")
              }
            />
          </div>
          <div>
            <Label className="my-1 block">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="my-1 block">Images (comma-separated URLs)</Label>
            <Textarea
              value={images.join(", ")}
              onChange={(e) =>
                setImages(e.target.value.split(",").map((img) => img.trim()))
              }
            />
          </div>
          <div>
            <Label className="my-1 block">Description (comma-separated)</Label>
            <Textarea
              value={description.join(", ")}
              onChange={(e) =>
                setDescription(
                  e.target.value.split(",").map((desc) => desc.trim())
                )
              }
            />
          </div>
          <div>
            <Label className="my-1 block">Price</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value ? parseFloat(e.target.value) : "")
              }
            />
          </div>
        </div>
        <DialogFooter className="border-t p-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          {roomData ? (
            <Button
              onClick={handleEditRoom}
              disabled={editRoomMutation.isPending}
            >
              {editRoomMutation.isPending ? "Saving..." : "Save"}
            </Button>
          ) : (
            <Button
              onClick={handleSaveRoom}
              disabled={addRoomMutation.isPending}
            >
              {addRoomMutation.isPending ? "Saving..." : "Save"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditRoomModal;
