import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

const PaymentDialog = ({
  open,
  setOpen,
  totalPrice,
  handlePaid,
}: {
  totalPrice: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  handlePaid: () => void;
}) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-6 w-96">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Confirm Payment
            </DialogTitle>
          </DialogHeader>
          <div className="text-center text-xl font-bold py-4">
            ₹{totalPrice.toFixed(2)}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handlePaid}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Pay Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentDialog;
