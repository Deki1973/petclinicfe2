import { useEffect, useState } from "react"
import { useJwt } from "../contexts/JwtContext"
import axios from "axios"
import { Navigate, useNavigate, Link } from "react-router-dom"
import { urlLocal, urlDeploy } from "../script/script1"
import "../styles/AddNewVet.scss"

const AddNewVet = () => {
    const {jwt}=useJwt()
    const [vetId, setVetId]=useState()
    const [firstName, setFirstName]=useState()
    const [lastName, setLastName]=useState()
    const [phone, setPhone]=useState()
    const [email, setEmail]=useState()
    const [licenceNo, setLicenceNo]=useState()
    const [homeAddress, setHomeAddress]=useState()
    const navigate = useNavigate()
    const [message, setMessage]=useState()

    const handleSubmit=async (e)=>{
        e.preventDefault()
        console.log(e)
        const submitterId=e.nativeEvent.submitter.id
        if (submitterId=='btnSave'){
            console.log("saving..")
            const newVet={
                "id":vetId,
                "first_name":firstName,
                "last_name":lastName,
                "phone":phone,
                "email":email,
                "licence_no":licenceNo,
                "home_address":homeAddress
            }

            const url=`${urlLocal}/clinic/vet/`
            const response=await axios.post(
                url,
                newVet,{
                    headers:{
                        'Authorization': jwt,
                        'Content-Type': 'application/json'
                    }
                }
            ).then((response)=>{
                console.log(response)
                const response_data=response.data
                console.log(response_data)
                setMessage(`Successfuly added a new vet ${response_data.first_name} ${response_data.last_name}, licence No. ${response_data.licence_no}, ID:${response_data.id}`)
                
            }).catch((error)=>{
                console.log(error)
                setMessage(`Oops! Somethin went wrong: \n${error}`)
            })
        }
    }

    useEffect(()=>{
        console.log("use effect add new vet..")
    })
    return (
        <div className="page-add-new-vet">
            {message && <div className="message">{message}</div>}
            
            <form action="submit" onSubmit={handleSubmit} className="form-add-new-vet">
                <table>
                    <thead>
                        <tr>
                        <th colSpan="2">
                           Add New Vet
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Vet ID:</td>
                            <td><input type="text" placeholder="Vet ID " onChange={e=>{
                                console.log(e.target.value)
                                setVetId(e.target.value)
                            }}/></td>
                        </tr>
                        <tr>
                            <td>First Name: </td>
                            <td><input type="text" placeholder="First Name " onChange={e=>{
                                console.log(e.target.value)
                                setFirstName(e.target.value)
                            }}/></td>
                        </tr>
                        <tr>
                            <td>Last Name: </td>
                            <td><input type="text" placeholder="Last Name " onChange={e=>{
                                setLastName(e.target.value)
                            }}/></td>
                        </tr>
                        <tr>
                            <td>Phone:</td>
                            <td><input type="text" placeholder="Phone " onChange={e=>{
                                setPhone(e.target.value)
                            }}/></td>
                        </tr>
                        <tr>
                            <td>Email: </td>
                            <td><input type="email" placeholder="Email " onChange={e=>{
                                setEmail(e.target.value)
                            }}/></td>
                        </tr>
                        <tr>
                            <td>Licence No.: </td>
                            <td><input type="text" placeholder="Licence No. " onChange={e=>{
                                setLicenceNo(e.target.value)
                            }}/></td>
                        </tr>
                        <tr>
                            <td>Home Address: </td>
                            <td><input type="text" placeholder="Home Address " onChange={e=>{
                                setHomeAddress(e.target.value)
                            }}/></td>
                        </tr>
                    </tbody>
                </table>
                <div className="buttons-form">
                <button type="submit" id="btnSave">Save</button>
                <button type="submit" id="btnCancel">Cancel</button>
                </div>
            </form>
        </div>
      );
}
 
export default AddNewVet;