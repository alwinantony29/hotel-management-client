import React from "react";
import { Users, Maximize2, Wifi } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { useUser } from "@/store/useUser";

const rooms = [
  {
    name: "Deluxe Suite",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    price: 299,
    capacity: "2-3 Guests",
    type: "deluxe",
    size: "45 m²",
    description: "Luxurious suite with city views and premium amenities.",
  },
  {
    name: "Premium Room",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    price: 199,
    capacity: "2 Guests",
    type: "premium",
    size: "35 m²",
    description:
      "Modern comfort with a perfect blend of style and functionality.",
  },
  {
    name: "Presidential Suite",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    price: 499,
    capacity: "4 Guests",
    type: "presidential",
    size: "75 m²",
    description: "Ultimate luxury with panoramic views and exclusive services.",
  },
];

export const RoomDetails: React.FC = () => {
  const [, setSearchParams] = useSearchParams();
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-gray-50" id="services">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Our Rooms</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-64">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{room.name}</h3>
                  <span className="text-2xl font-bold text-blue-600">
                  ₹{room.price}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{room.description}</p>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <Users size={16} className="mr-2" />
                    {room.capacity}
                  </div>
                  <div className="flex items-center">
                    <Maximize2 size={16} className="mr-2" />
                    {room.size}
                  </div>
                  <div className="flex items-center">
                    <Wifi size={16} className="mr-2" />
                    Wi-Fi
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (user) {
                      setSearchParams((prev) => {
                        prev.set("type", room.type);
                        return prev;
                      });
                      document.getElementById("book")?.scrollIntoView();
                    } else {
                      navigate("/login");
                    }
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {user ? "Book Now" : "Get started"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
