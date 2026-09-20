import { useEffect, useState } from "react";

const VetCard = (prop) => {
    console.log(prop)
    const [vetDetails, setVetDetails]=useState()

    useEffect(()=>{
        console.log("use effect vet card..")
        setVetDetails(prop.prop)
        console.log(setVetDetails)  
    },[])// izvrsi samo jednom
    return ( 
        <>
        <h3>Vet Card</h3>
        <ul>
            <li>{vetDetails && vetDetails.id}</li>
            <li>{vetDetails && vetDetails.first_name} {vetDetails && vetDetails.last_name}</li>
            <li>{vetDetails && vetDetails.phone}</li>
            <li>{vetDetails && vetDetails.email}</li>
            <li>{vetDetails && vetDetails.licence_no}</li>
        </ul>
        </>
     );
}
 
export default VetCard;