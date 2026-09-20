import { useEffect, useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { urlLocal, urlDeploy } from "../script/script1.js";
import axios from "axios";
import AppointmentList from "../components/AppointmentList.jsx";
import OwnerDetails from "../components/OwnerDetails.jsx";
import { Link } from "react-router-dom"
import "../styles/Appointment.scss"
//
import { useOwnerDetails } from "../contexts/OwnerDetailsContext.jsx";

const Appointment = () => {
    const { jwt } = useJwt()
    const [appointments, setAppointments] = useState([])
    const [item, setItem] = useState(null)
    const [appointmentDetailVisible, setAppointmentDetailVisible] = useState(false)

    //
    const [chkBoxPetId, setChkBoxPetId] = useState()
    const [chkBoxVetId, setChkBoxVetId] = useState()
    const [isCompleted, setIsCompleted] = useState()
    const [prop3, setProp3] = useState()
    const [prop4, setProp4] = useState()
    const [filterByCompleted, setFilterByCompleted] = useState()
    //
    const [pleaseWait, setPleaseWait]=useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
        const submitterId = e.nativeEvent.submitter.id
        console.log(submitterId)


        if (submitterId == "btnGetAllAppts") {
            setPleaseWait(true)
            console.log("get all appts...")
            const url = `${urlLocal}/clinic/appt/`
            const response = await axios.get(url, {
                headers: {
                    'Authorization': jwt,
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                console.log(response)
                const response_data = response.data
                console.log(response_data)
                const isArray = Array.isArray(response_data)
                console.log(isArray)
                let array1 = Object.entries(response_data)
                console.log(array1)
                setAppointments(response_data)
                setPleaseWait(false)
                

            }).catch((error) => {
                console.log(error)
                window.alert(error)
            })


        }

        if (submitterId == "btnGetAppointment") {
            console.log(submitterId)
            const appointmentAttribute = document.getElementById("select1").value
            const inputAppointmentAttribValue = document.getElementById("inputAppointmentAttribValue").value
            const appointmentAttribute2 = document.getElementById("select2").value
            const inputAppointmentAttribValue2 = document.getElementById("inputAppointmentAttribValue2").value

            let url = `${urlDeploy}/clinic/appt?${appointmentAttribute}=${inputAppointmentAttribValue}`
            if (appointmentAttribute2 != "none") {
                url += `&${appointmentAttribute2}=${inputAppointmentAttribValue2}`
            }

            // proba
            console.log(chkBoxPetId)

            const response = await axios.get(url, {
                headers: {
                    'Authorization': jwt,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                console.log(response)
                const response_data = response.data
                console.log(response_data)
                console.log(Array.isArray(response_data))
                const array1 = Object.entries(response_data)
                setAppointments(response_data)
                if (array1.length==0){
                    window.alert("No records found.")
                }

            }).catch((error) => {
                console.log(error)
                window.alert(error)
            })

        }

    }

    const handleRadioChange = (e) => {
        console.log("handle radio change..")
        console.log(e.nativeEvent.target.value)
    }

    useEffect(() => {
        console.log("appointment use effect...")
    })
    return (
        <div className="page-appointment">

            <h3>Schedule or find appointments:</h3>
            <form action="submit" onSubmit={handleSubmit} className="form-appointment">

                <div className="form-div-1">
                    <div>
                        <Link to="add" className="linkTo" id="lnkAddNewAppointment"><button type="button" id="btnAddNewAppointment">Add New </button></Link>
                        <select id="select1" className="select1">
                            <option value="pet_id">Pet ID: </option>
                            <option value="vet_id">Vet ID: </option>
                            <option value="sch_date">Sched. date: </option>
                            <option value="sch_time">Sched. time: </option>
                            <option value="owner_id">Owner ID: </option>
                        </select>
                        <select id="select2" className="select1">
                            <option value="none"></option>
                            <option value="pet_id">Pet ID: </option>
                            <option value="vet_id">Vet ID: </option>
                            <option value="sch_date">Sched. date: </option>
                            <option value="sch_time">Sched. time: </option>
                            <option value="owner_id">Owner ID: </option>
                        </select>
                        <input type="text" placeholder="Enter attributue value:" id="inputAppointmentAttribValue" onChange={e => {
                            setProp4(e.target.value)
                        }} />
                        <input type="text" placeholder="Enter attributue value:" id="inputAppointmentAttribValue2" />


                        <button type="submit" id="btnGetAppointment">Get Appoint.</button>
                        <button type="submit" id="btnGetAllAppts">Get All</button>
                    </div>
                </div>
                <div className="form-div-2">





                </div>



                <div className="options-filter-by-completed">
                    <label>All: </label><input type="radio" name="optionGroup1" value="all" defaultChecked onChange={e => {
                        setFilterByCompleted(null)
                    }} />
                    <label>Completed: </label><input type="radio" name="optionGroup1" value="completed" onChange={e => {
                        setFilterByCompleted(true)
                    }} />
                    <label>Not completed: </label><input type="radio" name="optionGroup1" value="notCompleted" onChange={e => {
                        setFilterByCompleted(false)
                    }} />



                </div>

            </form>
            {pleaseWait==true ? <p>Please wait...</p>:<p>Search completed.</p>}
            {appointments && <AppointmentList prop={appointments} prop2={isCompleted} prop3={filterByCompleted}/>}

        </div>
    );

}

export default Appointment;