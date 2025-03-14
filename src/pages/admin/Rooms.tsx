import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminLayout from "@/layouts/AdminLayout";
import { api } from "@/lib/axios";
import AddEditRoomModal from "@/modals/AddEditRoomModal";
import DeleteRoomModal from "@/modals/DeleteRoomModal";
import { Room } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Edit, Image, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const fetchRooms = async () => {
  const res = await api.get("/rooms");
  return res?.data || [];
};

const RoomsPage = () => {
  const [open, setOpen] = useState(false);
  const [editRoomData, setEditRoomData] = useState<Room | undefined>(undefined);
  const [deleteRoomId, setDeleteRoomId] = useState<string | null>(null);

  const {
    data: rooms = [],
    isLoading,
    isError,
  } = useQuery<Room[]>({
    queryKey: ["rooms"],
    queryFn: fetchRooms,
  });

  if (isLoading) return <p>Loading rooms...</p>;
  if (isError) return <p>Failed to load rooms.</p>;

  const handleAddRoom = () => {
    setEditRoomData(undefined);
    setOpen(true); // Open the modal
  };

  const handleEditRoom = (data: Room) => {
    setEditRoomData(data);
    setOpen(true);
  };

  const handleDeleteRoom = (id: string) => {
    setDeleteRoomId(id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "booked":
        return "bg-red-100 text-red-800";
      case "cleaning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoomTypeLabel = (type: string) => {
    switch (type) {
      case "deluxe":
        return "Deluxe";
      case "premium":
        return "Premium";
      case "ultra luxury":
        return "Ultra Luxury";
      default:
        return type;
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Rooms Management
            </CardTitle>
            <Button
              onClick={handleAddRoom}
              className="bg-gray-800 hover:bg-gray-900 cursor-pointer"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room No</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Images</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room._id}>
                    <TableCell className="font-medium">{room.roomNo}</TableCell>
                    <TableCell>{getRoomTypeLabel(room.type)}</TableCell>
                    <TableCell>{room.capacity} Person(s)</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(room.status)}>
                        {room.status.charAt(0).toUpperCase() +
                          room.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Image size={16} className="mr-1" />
                        <span>{room.images.length}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate">
                        {room.description.join(", ")}
                      </div>
                    </TableCell>
                    <TableCell>${room.price}/night</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditRoom(room)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteRoom(room._id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {/* Add Room Modal */}
      <AddEditRoomModal open={open} setOpen={setOpen} roomData={editRoomData} />

      {/* Delete Room Modal */}
      {deleteRoomId && (
        <DeleteRoomModal roomId={deleteRoomId} setRoomId={setDeleteRoomId} />
      )}
    </AdminLayout>
  );
};

export default RoomsPage;
