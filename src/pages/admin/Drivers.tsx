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
import { useDrivers } from "@/hooks/useDriverQuery";
import AdminLayout from "@/layouts/AdminLayout";
import AddEditDriverModal from "@/modals/AddEditDriverModal";
import DeleteDriverModal from "@/modals/DeleteDriverModal";
import { User } from "@/types";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const DriversPage = () => {
  const [addEdit, setAddEdit] = useState(false);
  const [editDriverData, setEditDriverData] = useState<User | undefined>(undefined);
  const [deleteDriverId, setDeleteDriverId] = useState<string | null>(null);

  // Fetch drivers using react-query
  const { data: drivers = [], isLoading, isError } = useDrivers();

  const handleAddDriver = () => {
    setEditDriverData(undefined);
    setAddEdit(true);
  };

  const handleEditDriver = (driver: User) => {
    setEditDriverData(driver);
    setAddEdit(true);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">Drivers Management</CardTitle>
            <Button
              onClick={handleAddDriver}
              className="bg-gray-800 hover:bg-gray-900 cursor-pointer"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Driver
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading drivers...</p>
            ) : isError ? (
              <p className="text-red-500">Failed to load drivers.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone No</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.map((driver) => (
                    <TableRow key={driver._id}>
                      <TableCell className="font-medium">{driver.name}</TableCell>
                      <TableCell>{driver.email}</TableCell>
                      <TableCell>{driver.phoneNo}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditDriver(driver)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setDeleteDriverId(driver._id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Driver Modal */}
      <AddEditDriverModal open={addEdit} setOpen={setAddEdit} driverData={editDriverData} />

      {/* Delete Driver Modal */}
      {deleteDriverId && (
        <DeleteDriverModal driverId={deleteDriverId} setDriverId={setDeleteDriverId} />
      )}
    </AdminLayout>
  );
};

export default DriversPage;
