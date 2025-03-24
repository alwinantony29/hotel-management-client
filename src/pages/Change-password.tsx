import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useUser } from "@/store/useUser";
import { AxiosError } from "axios";
import { isAuthenticated } from "@/lib/utils";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";

interface FormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: React.FC = () => {
  const { changePassword } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (!isAuthenticated()) navigate("/");
  }, [navigate]);

  const toggleShowPassword = (field: keyof FormState) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.currentPassword === form.newPassword) {
      setError("Passwords may not be same");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.error) {
        setError("Failed to change password. " + error.response.data.error);
      } else {
        setError("Failed to change password.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-6 bg-gray-100">
      <Card className="w-full max-w-lg shadow-xl rounded-lg p-8 bg-white">
        <CardHeader className="mb-6">
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
              <div key={field} className="space-y-2 relative">
                <Label htmlFor={field} className="text-lg font-medium">
                  {field === "currentPassword" ? "Current Password" : field === "newPassword" ? "New Password" : "Confirm Password"}
                </Label>
                <div className="relative">
                  <Input
                    id={field}
                    name={field}
                    type={showPassword[field as keyof FormState] ? "text" : "password"}
                    placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                    value={form[field as keyof FormState]}
                    onChange={handleChange}
                    required
                    className="p-3 text-lg pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                    onClick={() => toggleShowPassword(field as keyof FormState)}
                  >
                    {showPassword[field as keyof FormState] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            ))}

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button type="submit" className="w-full text-lg py-3">
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;
