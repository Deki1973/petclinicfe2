import { use, useEffect, useState } from "react";
import { useAppointmentDetails } from "../contexts/AppointmentDetailsContext";
import { Navigate, UNSAFE_shouldHydrateRouteLoader, useNavigate, useParams } from "react-router-dom";
import { useJwt } from "../contexts/JwtContext";
import axios from "axios";
import { urlLocal, urlDeploy } from "../script/script1";
import { useLocation } from "react-router-dom";
import "../styles/UpdateAppointment.scss"



const UpdateAppointment = (prop) => {
    const { appointmentDetails, changeAppointmentDetails } = useAppointmentDetails()
    const { jwt } = useJwt()

    const location = useLocation()
    const data = location.state

    const [appointmentDescription, setAppointmentDescription] = useState()
    const [appointmentDescription2, setAppointmentDescription2]=useState()
    const [isCompleted, setIsCompleted] = useState()
    const [price, setPrice] = useState()
    const navigate = useNavigate()
    
    //
    const [message, setMessage]=useState()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const submitterId = e.nativeEvent.submitter.id
        console.log(submitterId)
        const updatedAppointment = {
            "id": appointmentDetails.id,
            "description": appointmentDescription,
            "completed": isCompleted,
            "price": parseFloat(price).toFixed(2),
            "scheduled_date": appointmentDetails.scheduled_date,
            "scheduled_time": appointmentDetails.scheduled_time,
            "vet_id": appointmentDetails.vet.id



        }
        if (submitterId == "btnSubmit") {
            console.log("btnSubmit")



            console.log(updatedAppointment)

            const url = `${urlLocal}/clinic/appt/${appointmentDetails.id}`
            const response = await axios.put(
                url,
                updatedAppointment, {
                headers: {
                    'Authorization': jwt,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                console.log(response)
                console.log(response.data)
                if (response.status==200){
                    setMessage("Appointment data updated successfully.")
                }
            }).catch((error) => {
                console.log(error)
                window.alert(error)
            })
        }
        if (submitterId == "btnPatch") {
            console.log("btnPatch")
            const url = `${urlLocal}/clinic/appt/${appointmentDetails.id}`
            const response = await axios.patch(
                url,
                updatedAppointment, {
                headers: {
                    'Authorization': jwt,
                    'Content-Type': 'application/json'
                }
            }

            ).then((response) => {
                console.log(response)
                console.log(response.data)
                if (response.status==200){
                    setMessage("Appointment data updated successfully.")
                }
            }).catch((error) => {
                console.log(error)
                setMessage(null)
                window.alert(error)
                
            })
        }

        if(submitterId=="btnCancel"){
            navigate("/appt/")
        }

        if(submitterId=="btnDelete"){
            navigate("/appt/delete")
        }

        if(submitterId=="btnSendEmail"){
            console.log("send email to owner")
            const url=`${urlLocal}/clinic/appt/print/`
            const requestData={
                "appt_id":appointmentDetails.id
            }
            const response=await axios.post(url,
                requestData,{
                    headers:{
                        'Authorization': jwt,
                        'Content-Type': 'application/json'
            }
        }).then((response)=>{
            console.log(response)
        }).catch((error)=>{
            console.log(error)
        })

            
        }
    }



    useEffect(() => {
        console.log("update appointment page")
        console.log(appointmentDetails)
        console.log(location.state)
        changeAppointmentDetails(location.state)
        setAppointmentDescription(location.state.description)
        setIsCompleted(location.state.completed)
        setPrice(location.state.price)
        console.log(location.state.completed)
        

    }, [])
    return (
        <div className="page-update-appointment">
            {message && <h4 className="message">{message}</h4>}
            <table>
                <thead>
                    <tr>
                    <th colSpan="2">Appointment Details</th>
                    </tr>
                </thead>

                <tbody className="tableBody">
                    <tr><td className="leftSide">Appt. ID: </td><td className="rightSide">{appointmentDetails && appointmentDetails.id}</td></tr>
                    <tr><td className="leftSide">Owner: </td><td className="rightSide">{appointmentDetails && appointmentDetails.owner.first_name} {appointmentDetails && appointmentDetails.owner.last_name}</td></tr>
                    <tr><td className="leftSide">Date and Time: </td><td className="rightSide">{appointmentDetails && appointmentDetails.scheduled_date}, {appointmentDetails && appointmentDetails.scheduled_time.substring(0, 5)}</td></tr>

                    <tr><td className="leftSide">Pet: </td><td className="rightSide">{appointmentDetails && appointmentDetails.pet.pet_name}</td></tr>
                    <tr><td className="leftSide">Vet: </td><td className="rightSide">{appointmentDetails && appointmentDetails.vet.first_name} {appointmentDetails && appointmentDetails.vet.last_name}</td></tr>
                    <tr><td className="leftSide">Description: </td><td className="rightSide">{appointmentDetails && appointmentDetails.description.substring(0,50)}</td></tr>
                    <tr><td className="leftSide">Completed: </td><td className="rightSide">{appointmentDetails && appointmentDetails.completed ? <p>Yes</p>:<p>No</p>}</td></tr>






                </tbody>
            </table>


            <form action="submit" onSubmit={handleSubmit} className="form-update-appointment">
                <label>Description: </label><textarea name="textAreaDescription" id="textAreaDescription" value={appointmentDescription} className="textarea-description" onChange={e => {
                    console.log(e.target.value)
                    setAppointmentDescription(e.target.value)
                }}></textarea>
                <div className="div-completed-price">
                <label className="label-completed">Completed: <input type="checkbox" id="chkCompleted" checked={isCompleted} className="checkbox-completed" onChange={e => {
                    console.log(e.target.checked)
                    setIsCompleted(e.target.checked)
                }} /></label>
                <label className="label-price">Price: <input type="text" id="inputPrice" value={price} className="input-price" onChange={e => {
                    setPrice(e.target.value)
                }} /></label>
                </div>
                <div className="div-form-buttons">
                    <button type="submit" id="btnSubmit">Submit</button>
                    <button type="submit" id="btnCancel">Back</button>
                    <button type="submit" id="btnSendEmail">Email</button>
                    <button type="submit" id="btnDelete">Delete</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateAppointment;