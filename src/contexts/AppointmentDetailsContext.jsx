import { createContext,useContext,useEffect,useState } from "react";

const AppointmentDetailsContext=createContext(null)

export const useAppointmentDetails =()=>{
    return useContext(AppointmentDetailsContext)
}

export const AppointmentDetailsProvider=({children})=>{

    const [appointmentDetails,setAppointmentDetails]=useState(null)
    

    const changeAppointmentDetails=(appointmentDetailsData)=>{
        setAppointmentDetails(appointmentDetailsData)
        console.log("context...")
        console.log(appointmentDetailsData)
        localStorage.setItem("appointmentDetails",appointmentDetailsData)
        


    }
    useEffect(()=>{
        const currentAppointment=localStorage.getItem("appointmentDetails")
    },[]);
    return(
        <AppointmentDetailsContext.Provider value={{appointmentDetails,changeAppointmentDetails}}>
            {children}
        </AppointmentDetailsContext.Provider>
    );



}

