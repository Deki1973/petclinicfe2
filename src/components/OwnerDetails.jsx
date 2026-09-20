import { useDebugValue, useEffect, useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { Navigate, useNavigate, Link } from "react-router-dom"
import { useOwnerDetails } from "../contexts/OwnerDetailsContext";
import "../styles/OwnerDetails.scss"

const OwnerDetails = (prop) => {
    const { jwt } = useJwt()
    const [ownerId, setOwnerId] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [petsCount, setPetsCount] = useState()
    const [homeAddress, setHomeAddress]=useState()
    const [postalCode, setPostalCode]=useState()
    const [city, setCity]=useState()
    const [jmbg, setJmbg]=useState()
    const navigate = useNavigate()
    const { ownerDetails, changeOwnerDetails } = useOwnerDetails()



   
    const handleButtonEditClick = (e) => {
        e.preventDefault()
        console.log("button edit owner clicked...")
        console.log("owner id")
        console.log(ownerId)
        navigate("/update")

    }

    const handleCreateNewAppointment = (e) => {
        e.preventDefault()
        console.log(e)
        navigate("/appt/add", { state: { ownerDetails } })
    }

    useEffect(() => {
        console.log("Owner details: ")
        console.log(prop)
        // Code here will run after *every* render
        /*
        setFullName(client.fullName)
        setContact(client.contact)
        setNote(client.note)
        */
        let item = prop.item;
        console.log("item")
        console.log(item)
        let owner = item[0]

        console.log(owner)
        if (owner == null) {
            console.log("Resource not found.")
            setOwnerId(null)
            setFirstName(null)
            setLastName(null)
            setEmail(null)
            setPhone(null)
            setHomeAddress(null)
            setPostalCode(null)
            setCity(null)
            setJmbg(null)
            return
        }
        console.log(owner.id)
        setOwnerId(owner.id)
        setFirstName(owner.first_name)
        setLastName(owner.last_name)
        setPhone(owner.phone)
        setEmail(owner.email)
        setPetsCount(owner.pets_count)
        setHomeAddress(owner.home_address)
        setPostalCode(owner.postal_code)
        setCity(owner.city)
        setJmbg(owner.jmbg)

        changeOwnerDetails(owner)



    }
    )
    if(firstName==null){
        return(
            <>
            <h3>Nothing found for given parameter.</h3>
            </>
        )
    }
    return (
        <div className="ownerDetails">

            <div>
                <table>
                    <thead>
                        <tr><th colSpan="2">Owner Details</th></tr>
                        
                    </thead>

                    <tbody className="tableBody">
                        <tr><td className="leftSide">Owner ID:</td><td className="rightSide">{ownerId}</td></tr>
                        <tr><td className="leftSide">Full Name:</td><td className="rightSide">{firstName} {lastName}</td></tr>
                        <tr><td className="leftSide">Phone:</td><td className="rightSide">{phone}</td></tr>
                        <tr><td className="leftSide">Email:</td><td className="rightSide">{email}</td></tr>
                        <tr><td className="leftSide">Address: </td><td className="rightSide">{homeAddress}</td></tr>
                        <tr><td className="leftSide">Postal Code: </td><td className="rightSide">{postalCode}</td></tr>
                        <tr><td className="leftSide">City: </td><td className="rightSide">{city}</td></tr>
                        <tr><td className="leftSide">JMBG: </td><td className="rightSide">{jmbg}</td></tr>

                    </tbody>
                </table>
                
            </div>
            <div className="ownerDetailsButtons">
                <button type="button" id="btnEditOwner" onClick={handleButtonEditClick}>Update</button>
                <button type="button" id="btnCreateNewAppointment" onClick={handleCreateNewAppointment}>New Appointment</button>
    
            </div>
            
        </div>
    );
}

export default OwnerDetails;