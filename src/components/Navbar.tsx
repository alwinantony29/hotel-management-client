import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser } from "@/store/useUser";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { useLocation, useNavigate } from "react-router";

export default function Navbar() {
  const { user, logout } = useUser();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight || 0;
      setScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateAndScrollIntoView = (link: string) => {
    if (!isHomePage) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(link.toLowerCase())?.scrollIntoView();
      }, 200);
      return;
    }
    document.getElementById(link.toLowerCase())?.scrollIntoView();
  };

  return (
    <nav className={"fixed top-0 left-0 right-0 w-full z-50 p-3"}>
      <div
        className={cn(
          "p-4 rounded-xl flex justify-between items-center transition-all duration-300  w-full",
          scrolled || !isHomePage ? "bg-white shadow-md" : "bg-transparent"
        )}
      >
        <h1
          className={cn(
            "text-xl font-bold",
            scrolled || !isHomePage ? "text-black" : "text-white"
          )}
        ></h1>
        <ul className="flex space-x-6">
          {["Home", "About", "Services"].map((item) => (
            <li key={item}>
              <a
                onClick={() => navigateAndScrollIntoView(item)}
                className={cn(
                  "text-lg font-medium transition-colors",
                  scrolled || !isHomePage
                    ? "text-black hover:text-gray-600"
                    : "text-white hover:text-gray-300"
                )}
              >
                {item}
              </a>
            </li>
          ))}
          <Popover>
            <PopoverTrigger>
              {user ? (
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-30 p-2 relative right-7 top-2">
              <ul className="flex flex-col space-y-2">
                {user ? (
                  <>
                    <li>
                      <Button
                        variant="ghost"
                        className="w-full text-left"
                        onClick={() => navigate("/history")}
                      >
                        Bookings
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="ghost"
                        className="w-full text-left"
                        onClick={logout}
                      >
                        Logout
                      </Button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full text-left"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                  </li>
                )}
              </ul>
            </PopoverContent>
          </Popover>
        </ul>
      </div>
    </nav>
  );
}
