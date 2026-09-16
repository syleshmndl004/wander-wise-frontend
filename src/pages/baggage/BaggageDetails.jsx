import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/axios';
import { toast } from 'sonner';
import { Card, CardAction, CardContent, CardDescription, CardTitle,CardHeader,CardFooter } from '../../components/ui/card';
import {  SquarePen,Trash2 } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '../../components/ui/button';
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
    const [dependancy, setDependency] = useState(0);

    useEffect( ()=>{
        const fetchBaggages = async ()=>{
            try{
                const response = await api.get(`/trips/${id}/baggages`);
                setBaggages(response.data);
            }catch(error){
                toast.error( error.message || "Error while adding trips");
            }
        }
        fetchBaggages();
    }, [dependancy] )

    const addBaggage = async ()=>{
      const name = document.getElementById("baggageInput");
      try{
        const response = await api.post(`/trips/${id}/baggages`, {name: name.value});
        if(response.status === 201){
          toast.success("Baggage added successfully!!");
          name.value = "";
          setDependency(dependancy + 1);
        }else{
          toast.error("Error while adding baggage.");
        }

      }catch(error){
        toast.error( error.message || "Error while adding baggage");
      } 
    }

  return (
    <div className="px-20 py-24 bg-purple-100">
      <Card>
        <CardHeader className="border-b">
          <CardTitle> See baggage details for this trip </CardTitle>
          <CardDescription>View and manage the baggages </CardDescription>
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
                
                <div>
                  <Label htmlFor="baggageInput" className="mb-2">Name of item </Label>
                  <Input type="text" placeholder="Medicine" id ="baggageInput" />
                </div>

                <Button onClick={(addBaggage) => {}} className="w-full">Submit</Button>
              </DialogContent>
            </Dialog>
            
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-3 gap-6 ">
            <div className="border rounded p-4 flex items-center justify-between">
              <div className="flex items-center justify-between">
                <Checkbox />
                <p className="text">Medicines</p>
              </div>

              <div>
                <Button variant="outline" size="icon">
                  <SquarePen />
                </Button>

                <Button variant="outline" size="icon">
                  <Trash2 />{" "}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p>Total Baggages: {baggages.length}</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default BaggageDetails