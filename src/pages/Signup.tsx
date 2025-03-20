import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserLayout from "@/layouts/UserLayout";
import { toast } from "react-hot-toast";
import { useCustomerMutations } from "@/hooks/useCustomerMutation";
import { AxiosError } from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const { createCustomer } = useCustomerMutations();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCustomer.mutate(form, {
      onSuccess: () => {
        toast.success("Account created successfully! Redirecting to home...");
        setTimeout(() => navigate("/"), 2000);
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data?.message || "Login failed. Please try again.";
          toast.error(errorMessage);
        } else {
          toast.error("An unexpected error occurred.");
        }
      },
    });
  };

  return (
    <UserLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Card className="w-full max-w-md p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={createCustomer.isPending}
              >
                {createCustomer.isPending ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default Signup;
