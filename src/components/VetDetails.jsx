import { useContext, useEffect, useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { Navigate, useNavigate, Link } from "react-router-dom"
import { useVetDetails } from "../contexts/VetDetailsContext"
import "../styles/VetDetails.scss"



const VetDetails = (prop) => {
    const {jwt}=useJwt()
    const [vetId, setVetId]=useState()
    const [firstName,setFirstName]=useState()
    const [lastName,setLastName]=useState()
    const [phone,setPhone]=useState()
    const [email, setEmail]=useState()
    const [licenceNo,setLicenceNo]=useState()
    const [vet,setVet]=useState()
    const [homeAddress, setHomeAddress]=useState()
    const navigate=useNavigate()
    
    const {vetDetails,changeVetDetails}=useVetDetails()

    const handleButtonEditClick=(e)=>{
        e.preventDefault()
        console.log("button edit vet clicked...")
        console.log("vet id")
        console.log(vetId)
        navigate('/vet/update')
     }
    
  

    


    useEffect(()=>{
        console.log("use effect vet details..")
        console.log(prop)
        console.log(prop.item)
        let vet=prop.item
        changeVetDetails(vet)
        
        if (vet==null){
            console.log("vet is null..")
            setVetId(null)
            setFirstName(null)
            setLastName(null)
            setPhone(null)
            setEmail(null)
            setLicenceNo(null)
            setHomeAddress(null)
            changeVetDetails(null)
            return
        }
        setVet(vet)
        setVetId(vet.id)
        setFirstName(vet.first_name)
        setLastName(vet.last_name)
        setPhone(vet.phone)
        setEmail(vet.email)
        setLicenceNo(vet.licence_no)
        setHomeAddress(vet.home_address)
 

        /*
        console.log(prop)
        console.log(prop.item)
        console.log(prop.item)
        console.log(prop.item.id)
        console.log(prop.item.first_name)
        console.log(prop.item.last_name)
        console.log(prop.item.phone)
        console.log(prop.item.email)
        console.log(prop.item.licence_no)
        setVet(prop.item)
        changeVetDetails(prop.item)
       */
        
    })
    return ( 
        <div className="vet-details">
       

       
            <div>
                <table>
                    <thead>
                        <tr>
                        <th colSpan="2">Vet Details</th>
                        </tr>
                    </thead>

                    <tbody className="table-body">
                        <tr><td className="left-side">Vet ID: </td><td className="right-side">{vetId}</td></tr>
                        <tr><td className="left-side">Full Name: </td><td className="right-side">{firstName} {lastName}</td></tr>
                        <tr><td className="left-side">Phone: </td><td className="right-side">{phone}</td></tr>
                        <tr><td className="left-side">Email: </td><td className="right-side">{email}</td></tr>
                        <tr><td className="left-side">Home Address: </td><td className="right-side">{homeAddress}</td></tr>
                        <tr><td className="left-side">Licence No.: </td><td className="right-side">{licenceNo}</td></tr>

                    </tbody>
                </table>
                
            </div>
        <button type="button" id="btnEditVet"onClick={handleButtonEditClick}>Update</button>
        
        </div>
     );
}
 
export default VetDetails;