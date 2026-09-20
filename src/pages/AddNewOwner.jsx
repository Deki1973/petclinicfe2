import { useState } from "react"
import { useJwt } from "../contexts/JwtContext"
import axios from "axios"
import { Navigate, useNavigate, Link } from "react-router-dom"
import { urlDeploy, urlLocal } from "../script/script1"
import "../styles/AddNewOwner.scss"

const AddNewOwner = () => {
    const {jwt}=useJwt()
    const [firstName, setFirstName]=useState()
    const [lastName,setLastName]=useState()
    const [phone,setPhone]=useState()
    const [email, setEmail]=useState()
    const [ownerId, setOwnerId]=useState()
    const [homeAddress, setHomeAddress]=useState()
    const [postalCode, setPostalCode]=useState()
    const [city, setCity]=useState()
    const [jmbg, setJmbg]=useState()
    const navigate = useNavigate()

    //
    const [message, setMessage]=useState()
    

    const handleSubmit=async (e)=>{
        e.preventDefault()
        console.log(e)
        console.log(firstName)
        console.log(lastName)
        console.log(email)
        console.log(phone)

        const submitterId=e.nativeEvent.submitter.id
        
        if (submitterId==="btnSave"){
            const newOwner={
                "id":ownerId,
                "first_name":firstName,
                "last_name":lastName,
                "phone":phone,
                "email":email,
                "home_address":homeAddress,
                "postal_code":postalCode,
                "city":city,
                "jmbg":jmbg
            }

            
            //const response=await axios(`${urlLocal}/clinic/owner/`,{
            const response=await axios(`${urlLocal}/clinic/owner/`,{
                method: "POST",
                mode: "cors",
                headers: {
                    'Authorization': jwt,
                    'Content-Type': 'application/json'
                },
                data: newOwner
            }).then((response)=>{
                console.log(response)
                if(response.status=201){
                    setMessage("New owner successfully added. His ID is: "+response.data.id.toString())
                    setOwnerId(response.data.id)
                }
            }).catch((error)=>{
                window.alert(error)
                setMessage(null)
                window.alert(error)
            })
        }

        if (submitterId==="btnBack"){
            navigate("/owner")
        }
    }
    return ( 
        <div className="page-add-new-owner">
        {message && <h4 className="message">{message}</h4>}
        <form action="submit" onSubmit={handleSubmit}>
        

                <table>
                    <thead>
                        <tr>
                            <th>Add New Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="left"><input type="text" id="inputId"
                                placeholder="ID: (Automatiaccly added) " value={ownerId}
                               readOnly={true}
                                onChange={e => {
                                    setOwnerId(e.target.value)
                                }} />
                            </td>    
                            
                        </tr>
                        <tr>
                            <td className="left"><input type="text" id="inputFullName"
                                placeholder="First Name: " value={firstName}
                                required
                                onChange={e => {
                                    setFirstName(e.target.value)
                                }} /></td>
                        </tr>
                        <tr>
                            <td className="right"><input type="text" id="inputFullName"
                                placeholder="Last Name: " value={lastName}
                                required
                                onChange={e => {
                                    setLastName(e.target.value)
                                }} /></td>
                        </tr>


                        <tr>
                            

                            <td className="right"> <input type="text" id="inputPhone"
                                placeholder="Phone: "
                                value={phone}
                                required
                                onChange={e => {
                                    setPhone(e.target.value)
                                }} /></td>
                        </tr>
                        <tr>
                            <td className="left"> <input type="email" id="inputEmail"
                                placeholder="Email: "
                                value={email}
                                required
                                onChange={e => {
                                    setEmail(e.target.value)
                                }} /></td>
                            
                        </tr>
                        <tr>
                            <td className="left"> <input type="text" id="homeAddress"
                                placeholder="Home Address: "
                                value={homeAddress}
                                required
                                onChange={e => {
                                    setHomeAddress(e.target.value)
                                }} /></td>
                            
                        </tr>
                        <tr>
                            <td className="left"> <input type="text" id="postalCode"
                                placeholder="Postal Code: "
                                value={postalCode}
                                required
                                onChange={e => {
                                    setPostalCode(e.target.value)
                                }} /></td>
                            
                        </tr>
                        <tr>
                            <td className="left"> <input type="text" id="city"
                                placeholder="City: "
                                value={city}
                                required
                                onChange={e => {
                                    setCity(e.target.value)
                                }} /></td>
                            
                        </tr>
                         <tr>
                            <td className="left"> <input type="text" id="jmbg"
                                placeholder="JMBG: "
                                value={jmbg}
                                required
                                onChange={e => {
                                    setJmbg(e.target.value)
                                }} /></td>
                            
                        </tr>
                    </tbody>
                </table>


                <div className="buttons-add-new-owner">
                <button type="submit" id="btnSave">Save</button>
                <button type="submit" id="btnBack">Back</button>
                
                </div>
                

        
            
            
        
        
        </form>
        </div>
     );
}
 
export default AddNewOwner;