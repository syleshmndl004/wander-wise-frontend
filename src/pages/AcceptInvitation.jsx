import React, { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import api from '../api/axios'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

const AcceptInvitation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isAccepting, setIsAccepting] = useState(false);
  const token = searchParams.get("token");

  const accept = async () => {
    if (!token) {
      toast.error("Invitation token is missing");
      return;
    }

    setIsAccepting(true);

    try {
      const response = await api.post(`/trips/${id}/invite/accept?token=${token}`);

      if (response.status === 200) {
        toast.success("Invitation accepted successfully");
        navigate("/trips");
      } else {
        toast.error("Error while accepting invitation");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Error while accepting invitation");
      console.log(error);
    } finally {
      setIsAccepting(false);
    }
  }

  return (
    <div className="px-20 py-24">
      <Card className="mx-auto max-w-md">
        <CardHeader className="border-b">
          <CardTitle>Accept Trip Invitation</CardTitle>
          <CardDescription>
            Accept this invite to add the shared trip to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={accept} disabled={isAccepting}>
            {isAccepting ? "Accepting..." : "Accept Invitation"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default AcceptInvitation
