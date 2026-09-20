import { useEffect, useState } from "react";
import { useOwnerDetails } from "../contexts/OwnerDetailsContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useJwt } from "../contexts/JwtContext";
import axios from "axios";
import { urlDeploy, urlLocal } from "../script/script1";
import "../styles/UpdateOwner.scss"

const handleSubmit = (e) => {
    console.log("handle submit..")
    console.log(e)
}


const UpdateOwner = () => {
    let { id } = useParams()

    const { jwt } = useJwt()
    const { ownerDetails, changeOwnerDetails } = useOwnerDetails()
    console.log(ownerDetails)

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [address, setAddress] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
        const submitterId = e.nativeEvent.submitter.id

        const updatedOwner = {
            "id": ownerDetails.id,
            "first_name": firstName,
            "last_name": lastName,
            "phone": phone,
            "email": email,
            "home_address": address,
            "postal_code": "11000",
            "city": "city 10",
            "jmbg": "1234567890"
        }

        // using PUT
        if (submitterId === "btnSave") {
            console.log("handle save..")




            const url = `${urlLocal}/clinic/owner/${ownerDetails.id}`
            //const url = `${urlDeploy}/clinic/owner/${ownerDetails.id}`
            const response = await axios(url, {
                method: "PUT",
                mode: "cors",
                headers: {
                    'Authorization': jwt,
                    'Content-Type': 'application/json'
                },
                data: updatedOwner
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        }

        // using PATCH
        if (submitterId === "btnUpdate") {
            console.log("using patch..")

            const url = `${urlLocal}/clinic/owner/${ownerDetails.id}`
            //const url = `${urlDeploy}/clinic/owner/${ownerDetails.id}`

            const response = await axios.patch(
                url,
                updatedOwner, {
                headers: {
                    'Authorization': jwt,
                    'Content-Type': 'application/json'
                }
            }

            ).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })





        }
        if (submitterId == "btnCancel") {
            navigate("/owner/")
        }

        if (submitterId === "btnDelete") {
            console.log(submitterId)
            navigate("/owner/delete")
        }




    }

    useEffect(() => {
        setFirstName(ownerDetails.first_name)
        setLastName(ownerDetails.last_name)
        setPhone(ownerDetails.phone)
        setEmail(ownerDetails.email)
        setAddress(ownerDetails.home_address)

    }, [])   // ovde mora, [] inace nece text boxovi nece hteti da ti primaju inpute.
    return (



        <div className="updateOwnerPage">

            <form action="submit" onSubmit={handleSubmit} className="updateOwnerForm">
                <table>

                    <thead>
                        <tr>
                            <th colSpan="2" className="ownerTh">

                                Update Details For Owner ID: {ownerDetails.id}

                            </th>
                        </tr>

                    </thead>


                    <tbody>


                        <tr>
                            <td className="left">First Name: </td>
                            <td><input type="text" placeholder="First Name " value={firstName} onChange={e => {
                                console.log(e.target.value)
                                setFirstName(e.target.value)
                            }} /></td>
                        </tr>

                        <tr>
                            <td className="left">Last Name: </td>
                            <td><input type="text" placeholder="Last Name " value={lastName} onChange={e => {
                                console.log(e.target.value)
                                setLastName(e.target.value)
                            }} /></td>
                        </tr>

                        <tr>
                            <td className="left">Phone </td>
                            <td><input type="text" placeholder="Phone " value={phone} onChange={e => {
                                console.log(e.target.value)
                                setPhone(e.target.value)
                            }} /></td>
                        </tr>


                        <tr>
                            <td className="left">Email: </td>
                            <td><input type="text" placeholder="Email " value={email} onChange={e => {
                                console.log(e.target.value)
                                setEmail(e.target.value)
                            }} /></td>
                        </tr>
                        <tr>
                            <td className="left">Home Address:</td>
                            <td>
                                <input type="text" placeholder="Home Address" value={address} onChange={e => {
                                    console.log(e.target.value)
                                    setAddress(e.target.value)
                                }} />
                            </td>
                        </tr>



                    </tbody>
                </table>
                <div className="updateOwnerButtons">
                    <button type="submit" id="btnSave">Save</button>
                    <button type="submit" id="btnCancel">Cancel</button>
                    <button type="submit" id="btnDelete">Delete</button>
                </div>

            </form>
        </div>

    );
}

export default UpdateOwner;