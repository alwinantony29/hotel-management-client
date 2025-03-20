import { DriverBookingTable } from "@/components/driver/DriverBookingTable";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCabBookings } from "@/hooks/useCabBookingQuery";
import DriverLayout from "@/layouts/DriverLayout";

const Driver = () => {
  const { data: bookings = [], isLoading, isError } = useCabBookings();

  if (isLoading) return <p>Loading bookings...</p>;
  if (isError) return <p>Error fetching bookings.</p>;

  return (
    <DriverLayout>
      <div className="p-6">
        <Tabs defaultValue="pending">
          <TabsList className="mb-4">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="passive">Passive</TabsTrigger>
          </TabsList>
          <Card>
            <CardContent className="p-4">
              <TabsContent value="pending">
                <DriverBookingTable status="pending" bookings={bookings} />
              </TabsContent>
              <TabsContent value="active">
                <DriverBookingTable status="active" bookings={bookings} />
              </TabsContent>
              <TabsContent value="passive">
                <DriverBookingTable status="passive" bookings={bookings} />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </DriverLayout>
  );
};

export default Driver;
