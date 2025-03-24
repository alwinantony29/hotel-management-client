import { DriverBookingTable } from "@/components/driver/DriverBookingTable";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCabBookings } from "@/hooks/useCabBookingQuery";
import DriverLayout from "@/layouts/DriverLayout";

const Driver = () => {
  const { data: bookings = [], isLoading, isError } = useCabBookings();

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
              {isLoading ? (
                <p>Loading bookings...</p>
              ) : isError ? (
                <p className="text-red-500">Error fetching bookings.</p>
              ) : (
                <>
                  <TabsContent value="pending">
                    <DriverBookingTable status="pending" bookings={bookings} />
                  </TabsContent>
                  <TabsContent value="active">
                    <DriverBookingTable status="active" bookings={bookings} />
                  </TabsContent>
                  <TabsContent value="passive">
                    <DriverBookingTable status="passive" bookings={bookings} />
                  </TabsContent>
                </>
              )}
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </DriverLayout>
  );
};

export default Driver;
