import { useEffect, useState } from "react";

const OwnerCard = (prop) => {
    console.log(prop)
    const [ownerDetails, setOwnerDetails]=useState()

   
    

    useEffect(()=>{
        setOwnerDetails(prop.prop)

    },[])
    return ( 
        <>
        <h3>Owner Card</h3>
        <div>
            <ul>
                <li>ID: {ownerDetails && ownerDetails.id}</li>
                <li>First Name: {ownerDetails && ownerDetails.first_name}</li>
                <li>Last Name: {ownerDetails && ownerDetails.last_name}</li>
                <li>Phone: {ownerDetails && ownerDetails.phone}</li>
                <li>Email: {ownerDetails && ownerDetails.email}</li>
                <li>JMBG: {ownerDetails && ownerDetails.jmbg}</li>
            </ul>
           
        </div>
        </>
     );
}
 
export default OwnerCard;