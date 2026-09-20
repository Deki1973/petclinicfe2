import { useEffect } from "react";

const AppointmentDetails = (prop) => {
    

    useEffect(()=>{
        console.log("use effect appt details")
        console.log(prop)
    })

    return ( 
        <>
        <h1>Appointment Details Page</h1>
        </>
     );
}
 
export default AppointmentDetails;