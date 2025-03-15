import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight || 0;
      setScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={"fixed top-0 left-0 right-0 w-full z-50 p-3"}>
      <div
        className={cn(
          "p-4 rounded-xl flex justify-between items-center transition-all duration-300  w-full",
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        )}
      >
        <h1
          className={cn(
            "text-xl font-bold",
            scrolled ? "text-black" : "text-white"
          )}
        >
          Grand Azure
        </h1>
        <ul className="flex space-x-6">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className={cn(
                  "text-lg font-medium transition-colors",
                  scrolled
                    ? "text-black hover:text-gray-600"
                    : "text-white hover:text-gray-300"
                )}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <Button
          className={cn(
            scrolled ? "bg-black text-white" : "bg-white text-black"
          )}
        >
          Get Started
        </Button>
      </div>
    </nav>
  );
}
