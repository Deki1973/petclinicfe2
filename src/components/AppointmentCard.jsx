import { useEffect, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom"
import { useAppointmentDetails } from "../contexts/AppointmentDetailsContext";
import { useJwt } from "../contexts/JwtContext";
import { urlLocal } from "../script/script1.js";
import axios from "axios";
import "../styles/AppointmentCard.scss"


const AppointmentCard = (prop) => {
    console.log(prop)
    const [appointmentDetails, setAppointmentDetails] = useState()

    const { jwt } = useJwt()

    const navigate = useNavigate()
    const { appointmentDetailsDetails, changeAppointmentDetails } = useAppointmentDetails()


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
        const submitterId = e.nativeEvent.submitter.id
        console.log(submitterId)


        if (submitterId == "btnUpdate") {
            navigate("/appt/update", { state: appointmentDetails })

        }

    }


    useEffect(() => {
        console.log(prop)
        console.log(prop.prop)
        setAppointmentDetails(prop.prop)
        console.log(appointmentDetails)
    })
    return (
        <div className="div-appointment-card">



            <form action="submit" onSubmit={handleSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">Appointment Details</th>
                        </tr>

                    </thead>

                    <tbody className="tableBody">
                        <tr><td className="leftSide">Appt. ID: </td><td className="rightSide">{appointmentDetails && appointmentDetails.id}</td></tr>
                        <tr><td className="leftSide">Owner: </td><td className="rightSide">{appointmentDetails && appointmentDetails.owner.first_name} {appointmentDetails && appointmentDetails.owner.last_name}</td></tr>
                        <tr><td className="leftSide">Date ant Time: </td><td className="rightSide">{appointmentDetails && appointmentDetails.scheduled_date}, {appointmentDetails && appointmentDetails.scheduled_time.substring(0, 5)}</td></tr>
                        <tr><td className="leftSide">Description: </td><td className="rightSide">{appointmentDetails && appointmentDetails.description.substring(0, 50)}</td></tr>
                        <tr><td className="leftSide">Pet: </td><td className="rightSide">{appointmentDetails && appointmentDetails.pet.pet_name}</td></tr>
                        <tr><td className="leftSide">Completed: </td><td className="rightSide">{appointmentDetails && appointmentDetails.completed ? <p>Yes</p> : <p>No</p>}</td></tr>
                        <tr><td className="leftSide">Price: </td><td className="rightSide">{appointmentDetails && appointmentDetails.price}</td></tr>




                    </tbody>
                </table>

                <button type="submit" id="btnUpdate">Update</button>

            </form>







        </div>
    );
}

export default AppointmentCard;