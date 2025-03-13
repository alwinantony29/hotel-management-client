import { Coffee, Dumbbell, MapPin, Wifi, School as Pool } from "lucide-react";

const HotelDetails = () => {
  const amenities = [
    { icon: <Wifi className="w-6 h-6" />, name: "Free Wi-Fi" },
    { icon: <Coffee className="w-6 h-6" />, name: "Restaurant" },
    { icon: <Dumbbell className="w-6 h-6" />, name: "Fitness Center" },
    { icon: <Pool className="w-6 h-6" />, name: "Swimming Pool" },
  ];
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Experience Luxury at Its Finest
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Your Perfect Stay Awaits
            </h3>
            <p className="text-muted-foreground mb-6">
              Located in the prestigious downtown area, our hotel offers the
              perfect blend of luxury, comfort, and convenience. With stunning
              city views, world-class amenities, and exceptional service, we
              ensure your stay is nothing short of extraordinary.
            </p>
            <div className="flex items-center text-primary mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span>123 Luxury Avenue, Downtown, City</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-muted rounded-lg"
                >
                  {amenity.icon}
                  <span className="ml-3">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-video rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
              alt="Hotel Lobby"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelDetails;
