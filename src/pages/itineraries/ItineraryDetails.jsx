import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { CalendarDays, Clock3, Plus, SquarePen, Trash2 } from "lucide-react";
import api from "../../api/axios";
import { toast } from "sonner";
import { formatDate } from "../../lib/utils";

const emptyActivity = { name: "", time: "", notes: "" };

const ItineraryDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    activities: [{ ...emptyActivity }],
  });

  const loadData = useCallback(async () => {
    try {
      const [tripResponse, itineraryResponse] = await Promise.all([
        api.get(`/trips/${id}`),
        api.get(`/trips/${id}/itineraries`),
      ]);
      setTrip(tripResponse.data);
      setItineraries(itineraryResponse.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to fetch itinerary");
    }
  }, [id]);

  useEffect(() => {
    // Loading remote itinerary data is the synchronization this effect owns.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);

  const updateActivity = (index, field, value) => {
    setForm((current) => ({
      ...current,
      activities: current.activities.map((activity, activityIndex) =>
        activityIndex === index ? { ...activity, [field]: value } : activity,
      ),
    }));
  };

  const addActivity = () => {
    setForm((current) => ({
      ...current,
      activities: [...current.activities, { ...emptyActivity }],
    }));
  };

  const removeActivity = (index) => {
    setForm((current) => ({
      ...current,
      activities: current.activities.filter((_, activityIndex) => activityIndex !== index),
    }));
  };

  const resetForm = () => {
    setForm({ title: "", description: "", date: "", activities: [{ ...emptyActivity }] });
    setEditingId(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setOpen(true);
  };

  const openEditDialog = (itinerary) => {
    setEditingId(itinerary._id);
    setForm({
      title: itinerary.title,
      description: itinerary.description || "",
      date: new Date(itinerary.date).toISOString().slice(0, 10),
      activities: itinerary.activities?.length
        ? itinerary.activities.map((activity) => ({
            name: activity.name,
            time: new Date(activity.time).toISOString().slice(0, 16),
            notes: activity.notes?.join("\n") || "",
          }))
        : [{ ...emptyActivity }],
    });
    setOpen(true);
  };

  const addItinerary = async (event) => {
    event.preventDefault();
    const activities = form.activities
      .filter((activity) => activity.name.trim() && activity.time)
      .map((activity) => ({
        name: activity.name.trim(),
        time: new Date(activity.time).toISOString(),
        notes: activity.notes
          .split("\n")
          .map((note) => note.trim())
          .filter(Boolean),
      }));

    try {
      const payload = { ...form, activities };
      if (editingId) {
        await api.patch(`/trips/${id}/itineraries/${editingId}`, payload);
        toast.success("Itinerary day updated successfully");
      } else {
        await api.post(`/trips/${id}/itineraries`, payload);
        toast.success("Itinerary day added successfully");
      }
      setOpen(false);
      resetForm();
      await loadData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to add itinerary");
    }
  };

  const deleteItinerary = async (itineraryId) => {
    try {
      await api.delete(`/trips/${id}/itineraries/${itineraryId}`);
      toast.success("Itinerary day deleted successfully");
      await loadData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete itinerary");
    }
  };

  if (!trip) {
    return <div className="px-6 py-20 text-center md:px-20">Loading itinerary...</div>;
  }

  return (
    <div className="min-h-screen bg-purple-100 px-6 py-12 md:px-20 md:py-16">
      <Card className="bg-white">
        <CardHeader className="border-b border-border md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>{trip.title} itinerary</CardTitle>
            <CardDescription>
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)} · {trip.destinations.join(", ")}
            </CardDescription>
          </div>
          <CardAction>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger render={<Button onClick={openCreateDialog}><Plus /> Add day</Button>} />
              <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingId ? "Edit itinerary day" : "Add itinerary day"}</DialogTitle>
                  <DialogDescription>Add activities and notes for a day of your trip.</DialogDescription>
                </DialogHeader>
                <form onSubmit={addItinerary} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="itinerary-title">Title</Label>
                    <Input id="itinerary-title" required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Day 1 in Paris" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="itinerary-date">Date</Label>
                    <Input id="itinerary-date" type="date" required value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="itinerary-description">Description</Label>
                    <Textarea id="itinerary-description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Arrival and sightseeing" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Activities</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addActivity}><Plus /> Add activity</Button>
                    </div>
                    {form.activities.map((activity, index) => (
                      <div key={index} className="space-y-3 rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Activity {index + 1}</p>
                          {form.activities.length > 1 && (
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeActivity(index)} aria-label="Remove activity"><Trash2 className="text-red-600" /></Button>
                          )}
                        </div>
                        <Input required value={activity.name} onChange={(event) => updateActivity(index, "name", event.target.value)} placeholder="Visit the Eiffel Tower" />
                        <Input required type="datetime-local" value={activity.time} onChange={(event) => updateActivity(index, "time", event.target.value)} />
                        <Textarea value={activity.notes} onChange={(event) => updateActivity(index, "notes", event.target.value)} placeholder="One note per line" />
                      </div>
                    ))}
                  </div>
                  <Button type="submit" className="w-full">{editingId ? "Update itinerary day" : "Save itinerary day"}</Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-5 py-6">
          {itineraries.length === 0 ? (
            <div className="py-16 text-center text-xl font-semibold">No itinerary days yet. Add the first day to start planning.</div>
          ) : (
            itineraries.map((itinerary) => (
              <Card key={itinerary._id} className="overflow-hidden bg-white">
                <CardHeader className="border-b border-border bg-white">
                  <CardTitle className="flex items-center gap-2"><CalendarDays className="text-purple-600" />{itinerary.title}</CardTitle>
                  <CardDescription>{formatDate(itinerary.date)}{itinerary.description ? ` · ${itinerary.description}` : ""}</CardDescription>
                  <CardAction>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(itinerary)} aria-label={`Edit ${itinerary.title}`}><SquarePen /></Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteItinerary(itinerary._id)} aria-label={`Delete ${itinerary.title}`}><Trash2 className="text-red-600" /></Button>
                    </div>
                  </CardAction>
                </CardHeader>
                <CardContent className="space-y-3 pt-5">
                  {itinerary.activities?.length ? itinerary.activities.map((activity) => (
                    <div key={activity._id || `${activity.name}-${activity.time}`} className="rounded-lg border border-purple-100 bg-purple-50/50 p-4">
                      <div className="flex items-start gap-3">
                        <Clock3 className="mt-1 size-4 text-purple-600" />
                        <div>
                          <p className="font-medium">{activity.name}</p>
                          <p className="text-sm text-muted-foreground">{new Date(activity.time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</p>
                          {activity.notes?.length > 0 && <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">{activity.notes.map((note, index) => <li key={`${note}-${index}`}>{note}</li>)}</ul>}
                        </div>
                      </div>
                    </div>
                  )) : <p className="text-muted-foreground">No activities planned for this day.</p>}
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
        <CardFooter><p className="text-gray-500">Total itinerary days: {itineraries.length}</p></CardFooter>
      </Card>
    </div>
  );
};

export default ItineraryDetails;
