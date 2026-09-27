import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import api from "../../api/axios";
import { toast } from "sonner";
import { formatDate } from "../../lib/utils";

const Itineraries = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get("/trips");
        setTrips(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Unable to fetch trips");
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="min-h-screen bg-purple-100 px-6 py-12 md:px-20 md:py-24">
      <Card className="bg-white">
        <CardHeader className="border-b border-border">
          <CardTitle>Plan your itineraries</CardTitle>
          <CardDescription>Select a trip to view and manage its day-by-day plan.</CardDescription>
        </CardHeader>
        <CardContent>
          {trips.length === 0 ? (
            <div className="py-20 text-center text-xl font-semibold">
              You do not have any trips yet. Create a trip first.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trips.map((trip) => (
                <Card key={trip._id} className="bg-white">
                  <CardHeader className="border-b border-border">
                    <CardTitle>{trip.title}</CardTitle>
                    <CardDescription>
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-foreground">Destinations: {trip.destinations.join(", ")}</p>
                    <p className="text-foreground">Budget: Rs. {trip.budget?.total ?? 0}</p>
                  </CardContent>
                  <CardFooter>
                    <a className="w-full" href={`/itineraries/${trip._id}`}>
                      <Button className="w-full">
                        <Plus />
                        View itinerary
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-gray-500">Total trips: {trips.length}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Itineraries;
