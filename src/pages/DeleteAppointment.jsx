import { useEffect, useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { Navigate, useNavigate, Link } from "react-router-dom"
//import { useAppointmentDetails } from "../contexts/OwnerDetailsContext";
import { useAppointmentDetails } from "../contexts/AppointmentDetailsContext";
import axios from "axios";
import { urlLocal, urlDeploy } from "../script/script1";
//import "../styles/DeleteAppointment.scss"


const DeleteAppointment = () => {
    const {jwt}=useJwt()
    const navigate = useNavigate()
    const [appointmentId, setAppointmentId]=useState()
    const [inputAppointmentId, setInputAppointmentId]=useState()
    const [message, setMessage]=useState()
    const{appointmentDetails,changeAppointmentDetails}=useAppointmentDetails()
    
    const handleSubmit=async (e)=>{
      e.preventDefault()
      console.log(e)
      const submitterId=e.nativeEvent.submitter.id
      if (submitterId=="btnDelete"){
         console.log("delete...")
         console.log(appointmentId)
         console.log(inputAppointmentId)
         if(appointmentId==inputAppointmentId){
            console.log("deleteing....")

            //const url=`${urlDeploy}/clinic/appt/${appointmentId}`
            const url=`${urlLocal}/clinic/appt/${appointmentId}`
            console.log(url)

            const response=await axios.delete(
               url,{
                  headers:{
                     'Authorization':jwt,
                     'Content-Type':'application/json'
                  }
               }
               
            ).then((response)=>{
               console.log(response)
               if (response.status==204){
                  console.log("record deleted")
                  setMessage("Appointment deleted.")
               }
            }).catch((error)=>{
               console.log(error)
               if (error.status==404){
                  console.log("there is no such resource")
                  if(axios.isAxiosError(error)){
                     console.log(error.response?.data)
                     console.log(error.response.status)
                     if(error.response?.status==404){
                        setMessage("Error 404: There is no such appointment.")
                     }else{
                        setMessage(error.message)
                     }
                  }
                  
               }
            })

         }else{
            console.log("Oops! The input value mismatch!")
            setMessage("Oops! The input values mismatch.")
         }
      }
      if (submitterId=="btnCancel"){
         console.log("btnCancel")
         navigate("/appt/")
         
      }
    }
     useEffect(() => {
          
       setAppointmentId(appointmentDetails.id)
    },[])   // ovde mora ,[] 
    return ( 
        <>
        <h1>Delete Appointment Page</h1>
        <h3>You are trying to delete appoitnment ID: {appointmentDetails.id}</h3>
        <form action="submit" onSubmit={handleSubmit} className="form-delete-appointment">
         <h3>WARNING: This action cannot be undone!</h3>
         <h3>If you want to delete the appointment, type it's id in the textbox:</h3>
         <h3>Appointment ID: {appointmentDetails.id}</h3>
         {message && <h3>{message}</h3>}
         <input type="text" placeholder="Enter appointment ID here: " className="input-appointment-id" onChange={e=>{
            console.log(e.nativeEvent.target.value)
            setInputAppointmentId(e.nativeEvent.target.value)
            
         }}/>
         <div>
            <button type="submit" id="btnDelete" className="button-delete">DELETE</button>
            <button type="submit" id="btnCancel" className="button-cancel">Cancel</button>
         </div>
         

        </form>
        </>
     );
}
 
export default DeleteAppointment;