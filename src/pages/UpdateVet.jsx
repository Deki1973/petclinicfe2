import { use, useEffect, useState } from "react";
import { useVetDetails } from "../contexts/VetDetailsContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useJwt } from "../contexts/JwtContext";
import axios from "axios";
import { urlLocal, urlDeploy } from "../script/script1";
import "../styles/UpdateVet.scss"


const UpdateVet = () => {
    let { id } = useParams()
    
    const { jwt } = useJwt()
    const { vetDetails, changeVetDetails } = useVetDetails()
    const [vetId, setVetId]=useState()
    const [firstName, setFirstName]=useState()
    const [lastName,setLastName]=useState()
    const [phone, setPhone]=useState()
    const [email,setEmail]=useState()
    const [licenceNo, setLicenceNo]=useState()
    const [homeAddress, setHomeAddress]=useState()
    const navigate=useNavigate()
    const [message, setMessage]=useState()

    const handleSubmit=async (e)=>{
        e.preventDefault()
        console.log(e)
        const submitterId=e.nativeEvent.submitter.id
        if (submitterId=="btnCancel"){
            navigate("/vet/")
        }

        const updatedVet={
            "id":vetDetails.id,
            "first_name":firstName,
            "last_name":lastName,
            "phone":phone,
            "email":email,
            "licence_no":licenceNo,
            "home_address":homeAddress
        }

        if (submitterId=="btnSave"){
            const url=`${urlLocal}/clinic/vet/${vetDetails.id}`
            console.log(url)
            console.log(updatedVet)
            const response=await axios.put(url,
                updatedVet,
                {
                    headers:{
                        'Authorization': jwt,
                        'Content-Type': 'application/json',
                    },
                },
            ).then((response)=>{
                console.log(response)
                console.log(response.data)
                setMessage(response.data)
                
            }).catch((error)=>{
                console.log(error)
                setMessage(error.message)
            })
        }

        if (submitterId=="btnCancel"){
            console.log("cancel..")
        }
        if(submitterId=="btnDelete"){
            console.log("delete..")
             navigate("/vet/delete")
        }
    }
    

    useEffect(()=>{
        setVetId(vetDetails.id)
        setFirstName(vetDetails.first_name)
        setLastName(vetDetails.last_name)
        setPhone(vetDetails.phone)
        setEmail(vetDetails.email)
        setLicenceNo(vetDetails.licence_no)
        setHomeAddress(vetDetails.home_address)

    },[])
    return ( 
        <div className="page-update-vet">
        
        {message && <h3>{message}</h3>}
        <form action="submit" onSubmit={handleSubmit} className="form-update-vet">
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Update Vet Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ID: </td><td>{vetDetails.id}</td>
                    </tr>
                    <tr>
                        <td>First Name: </td>
                        <td><input type="text" placeholder="First Name " value={firstName} onChange={e =>{
                            console.log(e.target.value)
                            setFirstName(e.target.value)
                            }}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Last Name: </td>
                        <td><input type="text" placeholder="Last Name" value={lastName} onChange={e=>{
                            console.log(e.target.value)
                            setLastName(e.target.value)
                        }}/></td>

                    </tr>
                    <tr>
                        <td>Phone: </td>
                        <td><input type="text" placeholder="Phone " value={phone} onChange={e=>{
                            console.log(e.target.value)
                            setPhone(e.target.value)

                        }}/></td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td><input type="text" placeholder="Email " value={email} onChange={e=>{
                            console.log(e.target.value)
                            setEmail(e.target.value)
                        }}/></td>
                    </tr>
                    <tr>
                        <td>Licence No.:</td>
                        <td><input type="text" placeholder="Licence No. " value={licenceNo} onChange={e=>{
                            console.log(e.target.value)
                            setLicenceNo(e.target.value)
                        }}/></td>
                    </tr>
                    <tr>
                        <td>Home Address: </td>
                        <td><input type="text" placeholder="Home Address" value={homeAddress} onChange={e=>{
                            console.log(e.target.value)
                            setHomeAddress(e.target.value)
                        }}/></td>
                    </tr>
                </tbody>
            </table>
            <div className="buttons-update-vet">
            <button type="submit" id="btnSave">Save</button>
            <button type="submit" id="btnCancel">Back</button>
            <button type="submit" id="btnDelete">Delete</button>
            </div>
        </form>
        </div>
     );
}
 
export default UpdateVet;