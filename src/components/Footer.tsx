import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-16">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Hotel Info */}
        <div>
          <h2 className="text-2xl font-bold">Grand Azure</h2>
          <p className="mt-2 text-gray-400">Luxury & Comfort Redefined</p>
          <p className="mt-2 text-gray-400">123 Ocean Drive, Miami, FL</p>
          <p className="mt-1 text-gray-400">Email: contact@grandazure.com</p>
          <p className="mt-1 text-gray-400">Phone: +1 (123) 456-7890</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            {["Home", "Rooms", "Gallery", "Reviews", "Booking"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-400 hover:text-white transition"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="mt-4 flex justify-center md:justify-start space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-2xl transition"
            >
              <Facebook />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-2xl transition"
            >
              <Instagram />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-2xl transition"
            >
              <Twitter />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-4">
        <p>
          &copy; {new Date().getFullYear()} Grand Azure. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
