import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type AddEditRoomModalProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    editRoomId?: string;
};

const AddEditRoomModal: React.FC<AddEditRoomModalProps> = ({ open, setOpen, editRoomId }) => {
    const queryClient = useQueryClient();

    const [roomNo, setRoomNo] = useState<string>("");
    const [type, setType] = useState<string>("deluxe");
    const [capacity, setCapacity] = useState<number | "">("");
    const [status, setStatus] = useState<string>("available");
    const [images, setImages] = useState<string[]>([]);
    const [description, setDescription] = useState<string[]>([]);
    const [price, setPrice] = useState<number | "">("");

    // Fetch room details when editing
    const { data: roomData, isLoading } = useQuery({
        queryKey: ["room", editRoomId],
        queryFn: async () => {
            if (!editRoomId) return null;
            const res = await api.get(`/rooms/${editRoomId}`);
            return res.data;
        },
        enabled: !!editRoomId, // Only fetch if editRoomId is present
    });

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
        }
    }, [roomData]);

    // Mutation for adding a room
    const addRoomMutation = useMutation({
        mutationFn: async () => {
            const res = await api.post("/rooms", {
                roomNo, type, capacity, status, images, description, price
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["rooms"]); // Refetch room list
            setOpen(false);
        },
        onError: (error) => {
            console.error("Error adding room:", error);
        }
    });

    // Mutation for updating a room
    const editRoomMutation = useMutation({
        mutationFn: async () => {
            const res = await api.put(`/rooms/${editRoomId}`, {
                roomNo, type, capacity, status, images, description, price
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["rooms"]); // Refetch room list
            setOpen(false);
        },
        onError: (error) => {
            console.error("Error editing room:", error);
        }
    });

    const handleSaveRoom = () => {
        addRoomMutation.mutate();
    };

    const handleEditRoom = () => {
        editRoomMutation.mutate();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent aria-describedby="room-description" className="w-full max-w-lg h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>{editRoomId ? "Edit" : "Add"} Room</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div>
                        <Label>Room No</Label>
                        <Input value={roomNo} onChange={(e) => setRoomNo(e.target.value)} disabled={isLoading} />
                    </div>
                    <div>
                        <Label>Type</Label>
                        <Select value={type} onValueChange={setType} disabled={isLoading}>
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
                        <Label>Capacity</Label>
                        <Input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value ? parseInt(e.target.value, 10) : "")} disabled={isLoading} />
                    </div>
                    <div>
                        <Label>Status</Label>
                        <Select value={status} onValueChange={setStatus} disabled={isLoading}>
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
                        <Label>Images (comma-separated URLs)</Label>
                        <Textarea value={images.join(", ")} onChange={(e) => setImages(e.target.value.split(",").map((img) => img.trim()))} disabled={isLoading} />
                    </div>
                    <div>
                        <Label>Description (comma-separated)</Label>
                        <Textarea value={description.join(", ")} onChange={(e) => setDescription(e.target.value.split(",").map((desc) => desc.trim()))} disabled={isLoading} />
                    </div>
                    <div>
                        <Label>Price</Label>
                        <Input type="number" value={price} onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : "")} disabled={isLoading} />
                    </div>
                </div>
                <DialogFooter className="border-t p-4 flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    {editRoomId
                        ? <Button onClick={handleEditRoom} disabled={editRoomMutation.isPending || isLoading}>
                            {editRoomMutation.isPending ? "Saving..." : "Edit"}
                        </Button>
                        : <Button onClick={handleSaveRoom} disabled={addRoomMutation.isPending}>
                            {addRoomMutation.isPending ? "Saving..." : "Save"}
                        </Button>
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddEditRoomModal;
