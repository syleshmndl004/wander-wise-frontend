import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const AcceptInvitation = () => {

    const {id} = useParams();
    const Navigate = useNavigate();
    const[searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const accept = async()=>{
        try{
            const response = await api.post(`/trips/${id}/invite/accept?token=${token}`);

            if(response.status===200){
                toast.success("Invitation accepted successfully");
                Navigate("/trips");
            }else{
                toast.error("Error while accepting invitation");
            }
        }catch(error){
            toast.error(error.message || "Error while accepting invitation");
            console.log(error);

        }

    return(
        <div>
            <Button onClick={accept}>Accept</Button>
        </div>
    )
}}

export default AcceptInvitation