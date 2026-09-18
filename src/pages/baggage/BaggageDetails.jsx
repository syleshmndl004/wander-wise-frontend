import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/axios';
import { toast } from 'sonner';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { SquarePen, Trash2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';

const BaggageDetails = () => {
    const { id } = useParams();

    const [baggages, setBaggages] = useState([]);
    const [dependency, setDependency] = useState(0);

    useEffect(() => {
        const fetchBaggages = async () => {
            try {
                const response = await api.get(`/trips/${id}/baggages`);
                setBaggages(response.data);
            } catch (error) {
                toast.error(error.message || "Error while fetching baggages");
            }
        };

        fetchBaggages();
    }, [dependency])

    const addBaggage = async () => {
        const nameInput = document.getElementById("baggageInput");

        try {
            const response = await api.post(`/trips/${id}/baggages`, { name: nameInput.value });

            if (response.status === 201) {
                toast.success("Baggage added successfully!!");
                nameInput.value = "";
                setDependency((currentDependency) => currentDependency + 1);
            } else {
                toast.error("Error while adding baggage.");
            }
        } catch (error) {
            toast.error(error.message || "Error while adding baggage");
            console.log(error);
        }
    };

    const onDelete = async (baggageId) => {
        try {
            const response = await api.delete(`/trips/${id}/baggages/${baggageId}`);

            if (response.status === 200) {
                toast.success("Baggage deleted successfully!!");
                setDependency((currentDependency) => currentDependency + 1);
            } else {
                toast.error("Error while deleting baggage.");
            }
        } catch (error) {
            toast.error(error.message || "Error deleting baggage");
            console.log(error);
        }
    };

    const onCheck = async (baggageId, completed) => {
        try {
            const response = await api.patch(`/trips/${id}/baggages/${baggageId}`, { completed: !completed });

            if (response.status === 200) {
                toast.success("Baggage status updated successfully!!");
                setDependency((currentDependency) => currentDependency + 1);
            } else {
                toast.error("Error while updating baggage.");
            }
        } catch (error) {
            toast.error(error.message || "Error updating baggage");
            console.log(error);
        }
    };

    return (
        <div className="px-20 py-24 bg-purple-100 min-h-screen">
            <Card>
                <CardHeader className="border-b flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>See Baggages for this trip</CardTitle>
                        <CardDescription>View and manage baggages.</CardDescription>
                    </div>
                    <CardAction>
                        <Dialog>
                            <DialogTrigger render={<Button>Add Baggage</Button>} />
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Baggage</DialogTitle>
                                    <DialogDescription>
                                        Provide the name of the item you want to pack for this trip.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-2 py-2">
                                    <Label htmlFor="baggageInput">Name of item</Label>
                                    <Input type="text" placeholder="Medicine" id="baggageInput" />
                                </div>

                                <Button onClick={addBaggage} className="w-full">Submit</Button>
                            </DialogContent>
                        </Dialog>
                    </CardAction>
                </CardHeader>

                <CardContent className="py-6">
                    <div className="grid grid-cols-3 gap-6">
                        {baggages.length === 0 ? (
                            <div className="text-xl font-semibold col-span-3">
                                No baggages to show, create one first.
                            </div>
                        ) : (
                            baggages.map((item) => (
                                <div 
                                    key={item._id} 
                                    className={`border rounded p-4 flex items-center justify-between ${item.completed ? "bg-green-100" : "bg-gray-100"}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Checkbox 
                                            onCheckedChange={() => onCheck(item._id, item.completed)} 
                                            checked={item.completed} 
                                        />
                                        <p className="text-lg font-medium">{item.name}</p>
                                    </div>

                                    <div className="space-x-1">
                                        <Button variant="outline" size="icon">
                                            <SquarePen />
                                        </Button>
                                        <Button onClick={() => onDelete(item._id)} variant="outline" size="icon">
                                            <Trash2 className="text-red-700" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>

                <CardFooter>
                    <p>Total Baggages: {baggages.length}</p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default BaggageDetails;