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
import { useDriverMutations } from "@/hooks/useDriverMutation";
import { User, UserRole } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type AddEditDriverModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  driverData?: User;
};

const AddEditDriverModal: React.FC<AddEditDriverModalProps> = ({
  open,
  setOpen,
  driverData,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  useEffect(() => {
    if (driverData) {
      setName(driverData.name);
      setEmail(driverData.email);
      setPhoneNo(driverData.phoneNo);
    } else {
      setName("");
      setEmail("");
      setPhoneNo("");
    }
  }, [driverData, open]);

  const { addDriverMutation, editDriverMutation } = useDriverMutations();

  const newDriverData = {
    name,
    email,
    phoneNo,
    role: "driver" as UserRole,
  };

  const handleSubmit = async () => {
    try {
      if (driverData) {
        await editDriverMutation.mutateAsync({
          _id: driverData._id,
          ...newDriverData,
        });
      } else {
        await addDriverMutation.mutateAsync(newDriverData);
      }
      setOpen(false);
    } catch (error) {
      console.error("Error saving driver:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-lg h-[60vh] flex flex-col">
        <DialogDescription></DialogDescription>
        <DialogHeader>
          <DialogTitle>{driverData ? "Edit" : "Add"} Driver</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <Label className="my-1 block">Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label className="my-1 block">Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label className="my-1 block">Phone Number</Label>
            <Input
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="border-t p-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              addDriverMutation.isPending || editDriverMutation.isPending
            }
          >
            {addDriverMutation.isPending || editDriverMutation.isPending
              ? "Saving..."
              : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditDriverModal;
