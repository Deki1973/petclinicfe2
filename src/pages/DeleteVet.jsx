import { useEffect, useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { Navigate, useNavigate, Link } from "react-router-dom"
import { useVetDetails } from "../contexts/VetDetailsContext";
import axios from "axios";
import { urlLocal, urlDeploy } from "../script/script1";
import "../styles/DeleteVet.scss"



const DeleteVet = () => {

    const { jwt } = useJwt()
    const [vetId, setVetId] = useState()
    const [firstName, setFirstName] = useState()
    const [licenceNo, setLicenceNo] = useState()

    const { vetDetails, changeVetDetails } = useVetDetails()

    const [message, setMessage]=useState()

    const navigate=useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
        const submitterId = e.nativeEvent.submitter.id
        console.log(submitterId)

        if (submitterId == "btnDelete") {
            console.log("delete..")

            const url = `${urlLocal}/clinic/vet/${vetDetails.id}`
            //const url = `${urlDeploy}/clinic/vet/${vetDetails.id}`
            console.log(url)

            const inputVetId = e.nativeEvent.target[0].value
            const inputVetFirstName = e.nativeEvent.target[1].value
            const inputLicenceNo = e.nativeEvent.target[2].value

            console.log(inputVetId)
            console.log(inputVetFirstName)
            console.log(inputLicenceNo)

            if (vetId == inputVetId &&
                firstName == inputVetFirstName &&
                licenceNo == inputLicenceNo
            ) {
                console.log("correct data")
                console.log("deleting..")

                const url = `${urlLocal}/clinic/vet/${vetDetails.id}`
                //const url = `${urlDeploy}/clinic/vet/${vetDetails.id}`

                const response = await axios.delete(url, {
                    headers: {
                        'Authorization': jwt,
                        'Content-Type': 'application/json'
                    }
                }

                ).then((response) => {
                    console.log(response)
                    if(response.status==204 && response.statusText=='No Content'){
                        setMessage(`Vet ID ${inputVetId} successfully deleted.`)
                    }
                    if(response.status==404){
                        setMessage(`Vet ID ${inputVetId} deleted or not found.`)
                    }
                }).catch((error) => {
                    console.log(error)
                    if (error.response.status==404){
                        setMessage(`The given record deleted or not found.`)
                    }else{
                    setMessage(`Oops! Somethin went wrong: ${error}`)
                    }
                })
            }else{
                setMessage(`You have entered wrong details.`)
            }

        }
        if (submitterId == "btnCancel") {
            console.log("cancel")
            navigate("/vet/")
        }
    }

    useEffect(() => {
        setVetId(vetDetails.id)
        setFirstName(vetDetails.first_name)
        setLicenceNo(vetDetails.licence_no)
    }, [])   // ovde mora ,[] 
    return (
        <div className="page-delete-vet">
            
            
            <h2 className="h2-delete-vet">WARNING!!! This operation cannot be undone! Are you sure?</h2>
            <h3>You are trying to delete vet ID:{vetId}, {firstName}, licence number {licenceNo}.</h3>
            {message && <div className="message">{message}</div>}
            <form action="submit" onSubmit={handleSubmit} className="form-delete-vet">
                <h3>If you want to continue, retype vet's ID, first name and licence number in the form:</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><input type="text" placeholder="Vet ID " id="inputVetId" /></td>
                        </tr>
                        <tr>
                            <td><input type="text" placeholder="First Name " id="inputVetFirstName" /></td>
                        </tr>
                        <tr>
                            <td><input type="text" placeholder="Licence Nuber " id="inputLicenceNumber" /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="buttons-form">
                    <button type="submit" id="btnDelete">Delete</button>
                    <button type="submit" id="btnCancel">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default DeleteVet;