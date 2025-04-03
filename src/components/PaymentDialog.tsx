import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import toast from "react-hot-toast";

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
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

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
            Total: ₹{totalPrice.toFixed(2)}
          </div>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => {
                  setCardNumber(e.target.value);
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => {
                    setExpiry(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  type="password"
                  value={cvv}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "");
                    if (digits.length <= 3) {
                      setCvv(digits);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (
                  cardNumber.length === 0 ||
                  cvv.length === 0 ||
                  expiry.length === 0
                ) {
                  toast("Please fill in all fields");
                } else handlePaid();
              }}
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
